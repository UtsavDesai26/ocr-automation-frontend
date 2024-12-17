import Loader from "./components/UI/Loader/Loader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { LoaderWrapper } from "./App.styles";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

function App() {
  return (
    <Suspense
      fallback={
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      }
    >
      <Routes>
        <Route element={<ProtectedRoute />}>
          {ProtectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {PublicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
