import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import Practice from "../pages/Practice";
import TestDetail from "../pages/TestDetail";
import Vocabulary from "../pages/Vocabulary";
import Grammar from "../pages/Grammar";
import Admin from "../pages/Admin";

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/:id" element={<TestDetail />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/grammar" element={<Grammar />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  );
}
