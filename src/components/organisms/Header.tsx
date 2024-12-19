import "./organisms.scss";
import { useState } from "react";
import MenuBurgerIcon from "../atoms/MenuBurgerIcon";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <header>
      <MenuBurgerIcon isActive={isActive} toggle={()=>setIsActive(!isActive)} />
      <p>header</p>
      <p>header</p>
    </header>
  );
};
export default Header;
