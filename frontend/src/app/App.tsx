import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Shell } from "../components/layout/Shell";
import { Home } from "../pages/Home";
import { SectionPage, NotFound } from "../pages/SectionPage";
import { destinations } from "./destinations";
export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const canonical = location.pathname.replace(/\/+$/, "") || "/";
    if (canonical !== location.pathname)
      navigate(
        { pathname: canonical, search: location.search, hash: location.hash },
        { replace: true },
      );
    const path = canonical.toLowerCase();
    const title =
      destinations.find((item) => item.path === path)?.label ??
      "Página não encontrada";
    document.title = `${title} | END ZONE`;
  }, [location, navigate]);
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        {destinations.slice(1).map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<SectionPage title={item.label} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Shell>
  );
}
