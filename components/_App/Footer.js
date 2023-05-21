import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer-area">
        <div className="container">
          <div className="footer-bottom-area">
            <div className="row align-items-center text-center">
              <div className="col-lg-12 col-md-12">
                <p>
                  <i className="bx bx-copyright"></i>
                  {currentYear} Cycarts{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;
