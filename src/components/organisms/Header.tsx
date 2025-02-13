import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faHouse,
  faDoorOpen,
  faUser,
  faList,
} from "@fortawesome/free-solid-svg-icons";

import MenuBurgerIcon from "../atoms/MenuBurgerIcon";
import Nav from "./Nav";
import { selectUser } from "../../redux/userSlice";
import "./Header.scss";
import useLogout from "../../hooks/useLogout";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const user = useSelector(selectUser);
  const logout = useLogout();

  return (
    <header>
      <nav>
        <MenuBurgerIcon
          isActive={isActive}
          toggle={() => setIsActive(!isActive)}
        />
        <Nav isActive={isActive} setIsActive={setIsActive} />
        <p>{user && user.company_name}</p>
        <div>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} className="icon" />
          </Link>
          {!user && (
            <Link to="/connection">
              <FontAwesomeIcon icon={faRightToBracket} className="icon" />
            </Link>
          )}
          {user && (
            <>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} className="icon" />
              </Link>
              <Link to="/quotes" className="item">
                <FontAwesomeIcon icon={faList} className="icon" />
              </Link>
            </>
          )}
          {user && (
            <Link to="" onClick={() => logout()}>
              <FontAwesomeIcon icon={faDoorOpen} className="icon" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
