import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const useNavigationVisibility = (adminPath = "/admin/users") => {
  const { pathname } = useLocation();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const isSpecialPage = pathname === adminPath;
  const isWide = width >= 1701;

  return {
    // Показываем sider, если не админ страница или очень широкое окно
    showSider: !isSpecialPage || isWide,
    // Показываем кнопку + модалку, только если админ страница и НЕшироко
    showModalButton: isSpecialPage && !isWide,
  };
};
