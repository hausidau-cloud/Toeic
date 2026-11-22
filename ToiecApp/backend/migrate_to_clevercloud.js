const mysql = require('mysql2/promise');

const localConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'toeic_db',
  port: 3306
};

const remoteConfig = {
  host: 'bcox5ftbn6sb5wcrh3n7-mysql.services.clever-cloud.com',
  user: 'ujakkv66mbiaemau',
  password: 'bNyvHyT7RWgLFcRLfJiU',
  database: 'bcox5ftbn6sb5wcrh3n7',
  port: 3306
};

const tables = [
  'users',
  'vocabularies',
  'grammar_topics',
  'grammar_questions',
  'tests',
  'test_parts',
  'questions',
  'user_results'
];

async function migrate() {
  console.log('Connecting to local and remote databases...');
  const localConn = await mysql.createConnection(localConfig);
  const remoteConn = await mysql.createConnection(remoteConfig);
  console.log('Both connections established successfully!');

  // Disable foreign key checks on remote
  await remoteConn.query('SET FOREIGN_KEY_CHECKS = 0');

  for (const table of tables) {
    console.log(`\n--- Migrating table: ${table} ---`);

    // 1. Get CREATE TABLE statement from local
    const [createResult] = await localConn.query(`SHOW CREATE TABLE \`${table}\``);
    const createTableSql = createResult[0]['Create Table'];

    // 2. Drop table if exists on remote, then create
    await remoteConn.query(`DROP TABLE IF EXISTS \`${table}\``);
    await remoteConn.query(createTableSql);
    console.log(`✓ Table \`${table}\` schema created on remote.`);

    // 3. Fetch all rows from local
    const [rows] = await localConn.query(`SELECT * FROM \`${table}\``);
    console.log(`Found ${rows.length} rows in local \`${table}\`.`);

    if (rows.length > 0) {
      // Insert in chunks of 100
      const chunkSize = 100;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const keys = Object.keys(chunk[0]);
        const cols = keys.map(k => `\`${k}\``).join(', ');
        const placeholders = chunk.map(() => `(${keys.map(() => '?').join(', ')})`).join(', ');
        
        const values = [];
        chunk.forEach(row => {
          keys.forEach(k => {
            values.push(row[k]);
          });
        });

        await remoteConn.query(`INSERT INTO \`${table}\` (${cols}) VALUES ${placeholders}`, values);
      }
      console.log(`✓ Inserted all ${rows.length} rows into remote \`${table}\`.`);
    }
  }

  // Re-enable foreign key checks on remote
  await remoteConn.query('SET FOREIGN_KEY_CHECKS = 1');

  // Verify remote counts
  console.log('\n=== VERIFICATION ON CLEVER CLOUD ===');
  for (const table of tables) {
    const [res] = await remoteConn.query(`SELECT COUNT(*) as count FROM \`${table}\``);
    console.log(`Table \`${table}\`: ${res[0].count} rows`);
  }

  await localConn.end();
  await remoteConn.end();
  console.log('\n🎉 ALL DATA MIGRATED TO CLEVER CLOUD SUCCESSFULLY!');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
