import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context/AuthContext"; // Adjust this path based on your project
import ShortCutPage from "./pages/ShortCutPage";
import TestPage from "./pages/TestPage";
import LoginPage from "./pages/login/Login";
import ModifyKnowledgePage from "./pages/modify/ModifyKnowledgePage";
import NewManager from "./pages/newManager/NewManager";
import SuperAdmin from "./pages/superAdmin/SuperAdmin";

const AppRouter = () => {
  const { loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}
    >
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Private routes */}
        <Route
          path="/shortCutPage"
          element={
            <PrivateRoute>
              <ShortCutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/newManager"
          element={
            <PrivateRoute>
              <NewManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/superAdmin"
          element={
            <PrivateRoute>
              <SuperAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/testPage"
          element={
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/modifyKnowledge"
          element={
            <PrivateRoute>
              <ModifyKnowledgePage />
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
