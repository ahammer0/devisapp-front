import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { resetUser } from "../redux/userSlice";
import { resetWorks } from "../redux/worksSlice";
import { resetQuotes } from "../redux/quotesSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return () => {
    dispatch(resetWorks());
    dispatch(resetQuotes());
    dispatch(resetUser());
    localStorage.removeItem("token");
    navigate("/");
  };
};
export default useLogout;
