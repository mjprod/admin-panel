import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext"; // Adjust this path based on your project
import TestPage from "./pages/TestPage";
import ModifyKnowledgePage from "./pages/modify/ModifyKnowledgePage";
import SuperAdmin from "./pages/superAdmin/SuperAdmin";
import NewManager from "./pages/newManager/NewManager";
import LoginPage from "./pages/login/Login";
import { ConversationsProvider } from "./context/ConversationProvider";
import PrivateRoute from "./PrivateRoute";

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
          path="/newManager"
          element={
            <PrivateRoute>
              <ConversationsProvider>
                <NewManager />
              </ConversationsProvider>
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
