import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import TestPage from "./pages/TestPage";
import ModifyKnowledgePage from "./pages/modify/ModifyKnowledgePage";
import SuperAdmin from "./pages/superAdmin/SuperAdmin";
import NewManager from "./pages/newManager/NewManager";
import LoginPage from "./pages/login/Login";
import { ConversationsProvider } from "./context/ConversationProvider";
// PrivateRoute component to handle protected routes
// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
//   const { isSignedIn } = useContext(AuthContext);
//   return isSignedIn ? element : <Navigate to="/login" />;
// };

// interface PrivateRouteProps {
//   element: React.ReactElement;
// }

const AppRouter = () => {
  const { loadingAuth } = useContext(AuthContext);

  // Show loading indicator while checking authentication status
  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}
    >
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated routes */}
        <Route path="/newManager" element={<ConversationsProvider><NewManager /></ConversationsProvider>} />

        <Route path="/superAdmin" element={<SuperAdmin />} />

        <Route path="/testPage" element={<TestPage />} />
        <Route path="/modifyKnowledge" element={<ModifyKnowledgePage />} />

        {/* Redirect to Main for invalid routes */}
        <Route path="*" element={<Navigate to="/newManager" />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
