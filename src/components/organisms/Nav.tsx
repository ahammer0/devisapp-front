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
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetUser, selectUser } from "../../redux/userSlice";

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
  return (
    <div
      className={isActive ? "nav " : "nav hide"}
      onClick={() => setIsActive(false)}
    >
      <h2>Nav</h2>
      <Link to="/" className="item">
        <FontAwesomeIcon icon={faHouse} className="icon" /> Accueil
      </Link>
      {!user && (
        <Link to="/connection" className="item">
          <FontAwesomeIcon icon={faRightToBracket} className="icon" />{" "}
          Connection
        </Link>
      )}
      {user && (
        <>
          <Link to="/profile" className="item">
            <FontAwesomeIcon icon={faUser} className="icon" /> Profile
          </Link>
          <Link to="/works" className="item">
            <FontAwesomeIcon icon={faHammer} className="icon" /> Éléments de
            devis
          </Link>
          <Link to="/" className="item">
            <FontAwesomeIcon icon={faNewspaper} className="icon" /> Liste des
            Devis
          </Link>
        </>
      )}
      {user && (
        <Link to="" onClick={handleLogout} className="item">
          <FontAwesomeIcon icon={faDoorOpen} className="icon" /> Deconnection
        </Link>
      )}
      <Link to="/palette" className="item">
        <FontAwesomeIcon icon={faPalette} className="icon" /> Palette
      </Link>
    </div>
  );
};
export default Nav;
