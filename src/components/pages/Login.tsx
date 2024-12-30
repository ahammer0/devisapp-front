import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../redux/hooks";

import CenterCardTemplate from "../templates/CenterCardTemplate";
import { loginUser } from "../../api/userApi";
import { setUser } from "../../redux/userSlice";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
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
      loginUser(email, password)
        .then((res) => {
          localStorage.setItem("token", res.token);
          dispatch(setUser({ user: res.user, role: "user" }));
          navigate("/");
        })
        .catch(() => {
          setError("Connection Impossible");
          setSubmitting(false);
        });
    }
  }, [submitting, email, password, navigate, dispatch]);

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
      <h1>Connection</h1>
      <form className="card" onSubmit={handleSubmit}>
        <div className="flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
        <p className="flex-center">
          <small>
            Pas encore inscrit ? <Link to="/inscription">S'inscrire</Link>
          </small>
        </p>
      </form>
    </CenterCardTemplate>
  );
};
export default Login;
