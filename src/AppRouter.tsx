import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context/AuthContext"; // Adjust this path based on your project
import { ConversationsProvider } from "./context/ConversationProvider";
import TestPage from "./pages/TestPage";
import LoginPage from "./pages/login/Login";
import NewManager from "./pages/newManager/NewManager";
import ChatbotPage from "./pages/chatbot/ChatbotPage";
import AdminPanel from "./pages/adminPanel/AdminPanel";

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
          path="/adminPanel"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/testPage"
          element={
            <PrivateRoute>
              <ConversationsProvider>
                <TestPage />
              </ConversationsProvider>
            </PrivateRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <PrivateRoute>
              <ChatbotPage />
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
