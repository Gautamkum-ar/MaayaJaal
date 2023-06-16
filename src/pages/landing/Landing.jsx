import { useState } from "react";
import "../landing/style.css";
import { Login } from "../login/Login";
import { SingUp } from "../signup/SignUp";

export const Landing = () => {
  const [signUp, setSignUp] = useState(false);
  return (
    <div className="landing__container">
      <section className="left__sec">
        <h1>
          Maaya <span>Jaal</span>
        </h1>
      </section>
      <section className="right__sec">
        {signUp ? (
          <>
            <SingUp />
            <p className="signUp__link">
              Not register yet{" "}
              <button onClick={() => setSignUp(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login />
            <p className="login__link">
              Aready have Account{" "}
              <button onClick={() => setSignUp(true)}>SignUp</button>
            </p>
          </>
        )}

        {/* {signUp ? (
          <button onClick={() => setSignUp(false)}>Login</button>
        ) : (
          <button onClick={() => setSignUp(true)}>SignUp</button>
        )} */}
      </section>
    </div>
  );
};
