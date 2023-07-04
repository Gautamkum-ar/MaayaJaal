import { FaTwitter } from "react-icons/fa";
import { AiOutlineCode, AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import "../footer/FooterStyle.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer__main">
      <div className="txt">
        @<p>Maaya</p> <span>Jaal</span>
        <AiOutlineCode />
        By Gautam Kumar
      </div>
      <section className="links">
        <Link to="https://github.com/Gautamkum-ar">
          <AiFillGithub />
        </Link>
        <Link to="https://www.linkedin.com/in/gautam-kumar-7b9933251/">
          <AiFillLinkedin />
        </Link>
        <Link to="https://twitter.com/kum_ar_gautam">
          <FaTwitter />
        </Link>
      </section>

      <p className="copy__right"> &copy;2023</p>
    </div>
  );
};
