import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateBadgePage } from "./pages/CreateBadgePage";
import { ApproveBadgePage } from "./pages/ApproveBadgePage";
import { PublicProfilePage } from "./pages/PublicProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/badge/create" element={<CreateBadgePage />} />
        <Route path="/approve/:freelancer/:badgeIndex" element={<ApproveBadgePage />} />
        <Route path="/:username" element={<PublicProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}