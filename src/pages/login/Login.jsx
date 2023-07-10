import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../login/style.css";

import { useAuth } from "../../contexts/authContext";

export const Login = () => {
  const { loginData, setLoginData, loginHandler, guestLoginHandler } =
    useAuth();

  const navigate = useNavigate();

  return (
    <div className="login__container">
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>
        <div className="input__container">
          <input
            type="email"
            required
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <p>
            <FaEnvelope />
          </p>
          <span>Email address</span>
        </div>
        <div className="input__container">
          <input
            type="password"
            required
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <p>
            <FaLock />
          </p>
          <span>Enter password</span>
        </div>
        <button
          className="login__btn"
          onClick={() => {
            loginHandler();
          }}
        >
          Login
        </button>
        <button
          className="login__btn"
          onClick={() => {
            guestLoginHandler();

            navigate("/home");
          }}
        >
          Guest Login
        </button>
        {/* <p>
          Not Have Account <Link to="/signup">Signup</Link>
        </p> */}
      </form>
    </div>
  );
};
