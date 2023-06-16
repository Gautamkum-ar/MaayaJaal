import { Link } from "react-router-dom";

import { FaEnvelope, FaLock, FaMobile, FaUser } from "react-icons/fa";

import "../signup/style.css";
import { useAuth } from "../../contexts/authContext";

export const SingUp = () => {
  const { signupHandler, setSignupData, signupData } = useAuth();
  return (
    <div className="signup__container">
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <h2>Sign Up</h2>
        <div className="imput__container">
          <input
            type="text"
            required
            onChange={(e) =>
              setSignupData({ ...signupData, name: e.target.value })
            }
          />
          <p>
            <FaUser />
          </p>
          <span>full name</span>
        </div>
        <div className="imput__container">
          <input
            type="email"
            required
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          <p>
            <FaEnvelope />
          </p>
          <span>email address</span>
        </div>

        <div className="imput__container">
          <input
            type="password"
            required
            onChange={(e) =>
              setSignupData({ ...signupData, createPass: e.target.value })
            }
          />
          <p>
            <FaLock />
          </p>
          <span>create password</span>
        </div>
        <div className="imput__container">
          <input
            type="password"
            required
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <p>
            <FaLock />
          </p>
          <span>confirm password</span>
        </div>
        <button className="create__btn" onClick={() => signupHandler()}>
          Create Account
        </button>
        {/* <p>
          Already Have Account <Link to="/login">Login</Link>
        </p> */}
      </form>
    </div>
  );
};
