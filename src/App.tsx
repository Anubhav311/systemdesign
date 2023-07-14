import "./App.css";
import Playground from "./components/Playground";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/login" element={<AuthPage />} /> */}
      {/* <Route path="/signup" element={<SignUpPage />} /> */}
      {/* <Route path="/change-password" element={<ChangePassword />} /> */}
      <Route path="playground" element={<Playground />} />
      {/* <Route
      path="/problems"
      element={
        <ProtectedRoute>
          <ProblemsTable />
        </ProtectedRoute>
      }
    /> */}
      {/* <Route
      path="/problems/:problemId"
      element={
        <ProtectedRoute>
          <WorkSpace />
        </ProtectedRoute>
      }
    /> */}
    </Routes>
  );
}

export default App;
