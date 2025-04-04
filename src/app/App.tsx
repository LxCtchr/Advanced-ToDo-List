import { sessionService } from "@/entities/Session";
import { setIsAuth, useRefreshTokensMutation } from "@/features/Authorization";
import { useAppDispatch } from "@/shared";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const [refreshTokens] = useRefreshTokensMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const currentRefreshToken = localStorage.getItem("refreshToken");

      if (!currentRefreshToken) {
        sessionService.clearTokens();
        setIsAppInitialized(true);

        return;
      }

      try {
        const { accessToken, refreshToken } = await refreshTokens(currentRefreshToken).unwrap();
        sessionService.accessToken = accessToken;
        localStorage.setItem("refreshToken", refreshToken);

        await dispatch(setIsAuth(true));
      } catch {
        sessionService.clearTokens();
      }

      setIsAppInitialized(true);
    };

    checkAuth();
  }, [dispatch, refreshTokens]);

  if (!isAppInitialized) {
    return <Spin fullscreen />;
  }

  return <RouterProvider router={router} />;
}

export default App;
