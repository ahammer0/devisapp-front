import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CenterCardTemplate from "../templates/CenterCardTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { captchaResponse, registerUser, getCaptcha } from "../../api/userApi";
import {
  emailValidator,
  InputError,
  passwordValidator,
} from "../../helpers/inputValidators";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captcha, setCaptcha] = useState<captchaResponse | null>(null);
  const [captchaInput, setCaptchaInput] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    getCaptcha()
      .then((res) => {
        setCaptcha(res);
      })
      .catch(() =>
        setError("Une erreur a eu lieu lors de la récupération du captcha"),
      );
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      if (!captcha) return;
      //validating inputs
      try {
        emailValidator(email);
        passwordValidator(password);
      } catch (e) {
        if (e instanceof InputError) {
          setError(e.message);
        }
        setIsSubmitting(false);
        return;
      }
      registerUser({
        email,
        password,
        captcha: captchaInput,
        captchaToken: captcha.token,
      })
        .then(() => {
          navigate("/connection");
        })
        .catch((e) => {
          console.log(e);
          if (e instanceof InputError) {
            setError(e.message);
          } else {
            setError("Une erreur est survenue");
          }
          setIsSubmitting(false);
        });
    }
  }, [isSubmitting, email, password, navigate, captcha, captchaInput]);

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
              id="passwordConfirm"
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
        <div className="flex-row">
          <div dangerouslySetInnerHTML={{ __html: captcha?.captcha ?? "" }} />
          <input
            type="text"
            name="captcha"
            required
            onChange={(e) => setCaptchaInput(e.target.value)}
          />
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
