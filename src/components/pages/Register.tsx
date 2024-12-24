import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import CenterCardTemplate from "../templates/CenterCardTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { registerUser } from "../../api/userApi";
import { selectUser, setUser } from "../../redux/userSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (passwordConfirm.length > 0) {
      if (password !== passwordConfirm) {
        const timeoutId = setTimeout(() => {
          setError("Les mots de passe ne correspondent pas.");
        }, 500);
        return () => clearTimeout(timeoutId);
      } else {
        setError("");
      }
    }
  }, [passwordConfirm, password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      registerUser({ email, password })
        .then((res) => {
          navigate("/connection");
        })
        .catch((error) => {
          setError("Une erreur est survenue");
          setIsSubmitting(false);
        });
    }
  }, [isSubmitting]);

  return (
    <CenterCardTemplate>
      <h1>Inscription</h1>
      <form className="card" onSubmit={handleSubmit}>
        <div className="flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex-col">
          <label htmlFor="password">Mot de passe</label>
          <div className="flex-row items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              autoComplete="new-password"
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
        <div className="flex-col">
          <label htmlFor="password">Répéter le mot de passe</label>
          <div className="flex-row items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
            S'inscrire
          </button>
        </div>
        <p className="flex-center">
          <small>
            Déja inscrit ? <Link to="/connection">Se connecter</Link>
          </small>
        </p>
      </form>
    </CenterCardTemplate>
  );
};
export default Register;
