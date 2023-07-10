import "../landing/style.css";

import { Login } from "../login/Login";
import { SingUp } from "../signup/SignUp";
import { useAuth } from "../../contexts/authContext";

export const Landing = () => {
  const { toggleLogin, setToggleLogin } = useAuth();
  return (
    <div className="landing__container">
      <section className="left__sec">
        <h1>
          Maaya <span>Jaal</span>
        </h1>

        <marquee behavior="" direction="left">
          WELCOME TO <span>MAAYAJAAL</span> PLEASE! LOGIN TO CONTINUE
        </marquee>
      </section>
      <section className="right__sec">
        {toggleLogin ? (
          <>
            <SingUp />
            <p className="signUp__link">
              Not register yet{" "}
              <button onClick={() => setToggleLogin(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login />
            <p className="login__link">
              Aready have Account{" "}
              <button onClick={() => setToggleLogin(true)}>SignUp</button>
            </p>
          </>
        )}
      </section>
    </div>
  );
};
