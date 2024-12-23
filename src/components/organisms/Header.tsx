import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faHouse,
  faDoorOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import "./organisms.scss";
import MenuBurgerIcon from "../atoms/MenuBurgerIcon";
import Nav from "./Nav";
import { selectUser, resetUser } from "../../redux/userSlice";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(resetUser());
  };

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
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} className="icon" />
            </Link>
          )}
          {user && (
            <Link to="" onClick={handleLogout}>
              <FontAwesomeIcon icon={faDoorOpen} className="icon" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
