import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../redux/hooks";

import CenterCardTemplate from "../templates/CenterCardTemplate";
import { setToken, setUser } from "../../redux/userSlice";
import { adminLogin } from "../../api/adminApi";

const AdminLogin = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
  };

  useEffect(() => {
    if (submitting) {
      adminLogin(password)
        .then((res) => {
          dispatch(setUser({ user: null, role: "admin" }));
          dispatch(setToken(res.token));
          navigate("/admin/dashboard");
        })
        .catch(() => {
          setError("Connection Impossible");
          setSubmitting(false);
        });
    }
  }, [submitting, password, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <CenterCardTemplate>
      <h1>Connection Admin</h1>
      <form className="card" onSubmit={handleSubmit}>
        <div className="flex-col">
          <label htmlFor="password">Password</label>
          <div className="flex-row items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="input-eye"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="flex-center">
          <button type="submit" className="btn btn-primary btn-cta">
            {submitting ? "Connexion en cours..." : "Se connecter"}
          </button>
        </div>
      </form>
    </CenterCardTemplate>
  );
};
export default AdminLogin;
