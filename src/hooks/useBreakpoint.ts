import { useState, useEffect } from "react";

type breakpoint = "sm" | "md" | "lg";

function useBreakpoint(): breakpoint {
  const [breakpoint, setBreakpoint] = useState<breakpoint>("sm");

  useEffect(() => {
    function handleResize() {
      setBreakpoint(getSize());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function getSize(): breakpoint {
    if (typeof window === "undefined") return "sm";
    const width = window.innerWidth;
    if (width > 1200) return "lg";
    else if (width > 768) return "md";
    else return "sm";
  }
  return breakpoint;
}
export default useBreakpoint;
