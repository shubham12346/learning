import { useEffect, useState } from "react";

export enum ScreenType {
  MOBILE = "moibile",
  DESKTOP = "desktop",
  TABLET = "table",
  LAPTOP = "laptop",
}
const useScreenType = () => {
  const [screenType, setScreenType] = useState<ScreenType>(ScreenType.DESKTOP);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setScreenType(ScreenType.MOBILE);
    } else if (width >= 768 && width < 1024) {
      setScreenType(ScreenType.TABLET);
    } else if (width >= 1024 && width < 1440) {
      setScreenType(ScreenType.LAPTOP);
    } else {
      setScreenType(ScreenType.DESKTOP);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenType };
};

export default useScreenType;
