import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WhereYouStandPage from "./pages/WhereYouStandPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/where-you-stand" element={<WhereYouStandPage />} />
      </Routes>
    </BrowserRouter>
  );
}
