import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectUser, setUser, selectUserRole } from "../redux/userSlice";
import { getToken } from "../api/userApi";
import { Navigate } from "react-router-dom";
import { checkToken } from "../api/userApi";
import { use } from "react";

const RequireAuth = (
  props: React.PropsWithChildren & { authLevel: "any" | "user" | "admin" },
) => {
  const dispatch = useAppDispatch();
  // reading redux store
  const role = useAppSelector(selectUserRole);
  
  //reading localstorage
  if(!role){
    const token = getToken();
    if (!token) {
      return <Navigate to="/login" />;
    }

    const checkTokenRes = use(checkToken())
    dispatch(setUser({ user: checkTokenRes.userInfos, role: checkTokenRes.role }));
  }
 


  if (role===props.authLevel||props.authLevel==="any") {
    return props.children;
  }

  return <Navigate to="/login" />;
};
export default RequireAuth;
