import { Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import PageNotFound from "./pages/404/PageNotFound";
import BookmarksPage from "./pages/Bookmarks/BookmarksPage";
import HomePage from "./pages/Home/HomePage";
import { useEffect } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import LoginCallBack from "./pages/LoginCallBack/LoginCallBack";
import { Auth } from "./utils/auth";
import { onSessionRestore } from "@inrupt/solid-client-authn-browser";

function App() {
  const navigate = useNavigate()
  
  useEffect(() => {
    onSessionRestore((url) => {
      console.log("onSessionRestore");
      
      navigate(url, { replace: true });
    });
    Auth.completeLogin();
  }, [navigate]);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* <Route path="/" element={<BookmarksPage />} /> */}

        <Route path="/callback" element={<LoginCallBack />} />
        <Route path="/" element={<HomePage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/bookmarks" element={<BookmarksPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
