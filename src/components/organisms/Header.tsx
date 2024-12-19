import { useState } from "react";
import { Link } from "react-router-dom";

import "./organisms.scss";
import MenuBurgerIcon from "../atoms/MenuBurgerIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket,faHouse} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <header>
      <nav>
        <MenuBurgerIcon isActive={isActive} toggle={()=>setIsActive(!isActive)} />
        <p>header</p>
        <div>
          <Link to="/"><FontAwesomeIcon icon={faHouse} className="icon"/></Link>
          <Link to="/connection">
            <FontAwesomeIcon icon={faRightToBracket} className="icon"/>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;
