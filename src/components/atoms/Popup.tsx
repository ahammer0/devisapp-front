import React from "react";
import { createContext } from "react";

export const PopupContext = createContext((a: boolean) => {});

const Popup = ({
  children,
  isActive,
  setIsActive,
}: React.PropsWithChildren & {
  isActive: boolean;
  setIsActive: (a: boolean) => void;
}) => {
  const body = document.querySelector("body");
  const onClickOutside = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setIsActive(false);
  };
  const onClickInside = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
  };
  if (body) {
    body.style.overflow = isActive ? "hidden" : "";
  }
  return (
    <div
      className={isActive ? "popup-background active" : "popup-background"}
      onClick={onClickOutside}
    >
      <PopupContext.Provider value={setIsActive}>
        <div className="popup-card">
          <div
            className="popup-popup"
            onClick={onClickInside}
          >
            {children}
          </div>
        </div>
      </PopupContext.Provider>
    </div>
  );
};
export default Popup;
