import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setUser, selectUserRole } from "../redux/userSlice";
import { getToken } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../api/userApi";
import { useEffect } from "react";
import Loader from "../components/organisms/Loader";

const RequireAuth = (
  props: React.PropsWithChildren & { authLevel: "any" | "user" | "admin" },
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // reading redux store
  let role = useAppSelector(selectUserRole);
  const token = getToken();

  //check if we can login the user
  useEffect(() => {
    // check if user is logged in
    if (!role) {
      if (!token && props.authLevel !== "any") {
        navigate("/connection");
        return;
      }
      checkToken()
        .then((res) => {
          dispatch(setUser({ user: res.userInfos, role: res.role }));
        })
        .catch(() => {
          if (props.authLevel !== "any") {
            navigate("/connection");
          }
        });
    }
  }, [role]);

  if (role === props.authLevel || props.authLevel === "any") {
    return props.children;
  }
  return <Loader />;
};
export default RequireAuth;
