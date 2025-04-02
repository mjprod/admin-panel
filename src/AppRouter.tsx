import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./pages/login/Login";
import NewManager from "./pages/newManager/NewManager";

const AppRouter = () => {

  return (
    <div
      style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}
    >
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Private routes */}
        <Route
          path="/newManager"
          element={
            <PrivateRoute>
              <NewManager />
            </PrivateRoute>
          }
        />

        {/* Default redirect route */}
        <Route path="*" element={<Navigate to="/newManager" />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
