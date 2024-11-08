import { useCallback, useRef } from "react";

const useThrottle = () => {
  const isWaiting = useRef(false);

  /** 스크롤 위치를 기록하는 경우 delay 50이하일 때 가장 원활하여 50을 기본값으로 설정 */
  return useCallback(
    (callback: (...arg: any) => void, delay: number = 50) =>
      (...arg: any) => {
        if (!isWaiting.current) {
          callback(...arg);

          isWaiting.current = true;

          setTimeout(() => {
            isWaiting.current = false;
          }, delay);
        }
      },
    []
  );
};

export default useThrottle;
