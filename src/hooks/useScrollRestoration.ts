// useScrollRestoration.ts
import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const SESSION_STORAGE_KEY = "scrollPositions";

const saveScrollPosition = (path: string, position: number) => {
  const scrollPositions = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEY) || "{}"
  );
  scrollPositions[path] = position;
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(scrollPositions));
  console.log(`[Saved] Scroll position for ${path}:`, position);
};

const getScrollPosition = (path: string): number => {
  const scrollPositions = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEY) || "{}"
  );
  const position = scrollPositions[path] || 0;
  console.log(`[Fetched] Scroll position for ${path}:`, position);
  return position;
};

const useScrollRestoration = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const lastScrollY = useRef(0); // 현재 스크롤 위치를 추적하기 위한 useRef 추가

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY.current) {
        lastScrollY.current = currentScrollY;
        console.log(
          `[Scrolling] Current ScrollY for ${location.pathname}:`,
          currentScrollY
        );
        saveScrollPosition(location.pathname, currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    const savedScrollY = getScrollPosition(location.pathname);

    if (navigationType === "POP") {
      console.log(
        `[Restoring] Scroll position for ${location.pathname}:`,
        savedScrollY
      );
      window.scrollTo(0, savedScrollY);
    }
  }, [location.pathname, navigationType]);
};

export default useScrollRestoration;
