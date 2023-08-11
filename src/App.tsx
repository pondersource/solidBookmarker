import { Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import PageNotFound from "./pages/404/PageNotFound";
import BookmarksPage from "./pages/Bookmarks/BookmarksPage";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";

import {
  onSessionRestore
} from "@inrupt/solid-client-authn-browser";
import { useEffect } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import LoginCallBack from "./pages/LoginCallBack/LoginCallBack";
import { Auth } from "./utils/auth";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    onSessionRestore((url) => {
      // navigate(url, { replace: true });
    });
  }, [navigate]);

  useEffect(() => {
    Auth.completeLogin();
  }, []);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/callback" element={<LoginCallBack />} />
        <Route path="/" element={<HomePage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
