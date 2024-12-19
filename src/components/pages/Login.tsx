import CenterCardTemplate from "../templates/CenterCardTemplate";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <CenterCardTemplate>
      <h1>Connection</h1>
      <form className="card" onSubmit={handleSubmit}>
        <div className="flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="flex-col">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="flex-center">
          <button type="submit" className="btn btn-primary btn-cta">
            Login
          </button>
        </div>
          <p className="flex-center">
            <small>
              Pas encore inscrit ? <Link to="/register">Register</Link>
            </small>
          </p>
      </form>
    </CenterCardTemplate>
  );
};
export default Login;
