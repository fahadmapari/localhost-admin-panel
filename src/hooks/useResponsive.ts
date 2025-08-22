import { useMediaQuery } from "react-responsive";

export const useResponsive = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1536 });

  return { isDesktop, isBigScreen };
};
