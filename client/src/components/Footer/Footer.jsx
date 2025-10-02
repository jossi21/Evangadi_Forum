import React from "react";
import evangadi_footer_logo from "../../assets/images/evangadi_footer_logo.png";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <>
      <section className={classes.footer__outer_wrapper}>
        <div className={classes.footer__inner__wrapper}>
          <div>
            <img src={evangadi_footer_logo} alt="" />
            <div>
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
            </div>
          </div>
          <div className={classes.footer__links}>
            <h3>Useful Links</h3>
            <ul>
              <li>
                <a href="">How it works</a>
              </li>
              <li>
                <a href="">Terms of Service</a>
              </li>
              <li>
                {" "}
                <a href="">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div className={classes.footer__contact}>
            <h3>Contact Info</h3>
            <ul>
              <li>
                <a href="evangadi.com">Evangadi Networks</a>
              </li>
              <li>
                <a href="suport@evangadi.com">suport@evangadi.com</a>
              </li>
              <li>
                <a href="">+1-202-386-2702</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
