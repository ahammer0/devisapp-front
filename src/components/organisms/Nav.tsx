import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightToBracket,
  faDoorOpen,
  faUser,
  faNewspaper,
  faHammer,
  faPalette,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetUser, selectUser } from "../../redux/userSlice";
import { useEffect } from "react";
import "./Nav.scss";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";

const Nav = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(resetUser());
  };

  //lock body scroll
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isActive]);
  useEffect(() => {
    function handleClickOutside() {
      setIsActive(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setIsActive]);
  return (
    <div
      className={isActive ? "nav " : "nav hide"}
      onClick={(e) => e.stopPropagation()}
    >
      <Link to="/" className="item">
        <FontAwesomeIcon icon={faHouse} className="icon" /> Accueil
      </Link>
      <Link to="/admin" className="item">
        <FontAwesomeIcon icon={faGears} className="icon" /> Admin
      </Link>
      {!user && (
        <Link to="/connection" className="item">
          <FontAwesomeIcon icon={faRightToBracket} className="icon" />
          Connection
        </Link>
      )}

      {/* User connected */}
      {user && (
        <>
          <Link to="/profile" className="item">
            <FontAwesomeIcon icon={faUser} className="icon" /> Profile
          </Link>
          <Link to="/works" className="item">
            <FontAwesomeIcon icon={faHammer} className="icon" /> Éléments de
            devis
          </Link>
          <Link to="/quotes" className="item">
            <FontAwesomeIcon icon={faList} className="icon" /> Liste des Devis
          </Link>
          <Link to="/change-plan" className="item">
            <FontAwesomeIcon icon={faNewspaper} className="icon" /> Changer
            d'abonnement
          </Link>
          <Link to="/tickets" className="item">
            <FontAwesomeIcon icon={faNewspaper} className="icon" /> Tickets/SAV
          </Link>
          <Link to="" onClick={handleLogout} className="item">
            <FontAwesomeIcon icon={faDoorOpen} className="icon" /> Deconnection
          </Link>
        </>
      )}
      <Link to="/palette" className="item">
        <FontAwesomeIcon icon={faPalette} className="icon" /> Palette
      </Link>
    </div>
  );
};
export default Nav;
