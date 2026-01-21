import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./app/layout/Layout";
import { GettingStarted } from "./docs/pages/GettingStarted";
import { Overview } from "./docs/pages/Overview";
import { Safety } from "./docs/pages/Safety";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/docs/get-started" replace />} />
        <Route path="docs/get-started" element={<GettingStarted />} />
        <Route path="docs/overview" element={<Overview />} />
        <Route path="docs/safety" element={<Safety />} />
      </Route>
    </Routes>
  );
}

export default App;
