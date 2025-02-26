import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Main from "./pages/Main.jsx";
import { AuthContext } from "./context/AuthContext.tsx";

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
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Authenticated routes */}
        <Route path="/main" element={<Main />} />

        {/* Redirect to Main for invalid routes */}
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
