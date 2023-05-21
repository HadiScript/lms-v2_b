import React, { useEffect, useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import { motion } from "framer-motion";
import Link from "@/utils/ActiveLink";
import ProfileDropdown from "./ProfileDropdown";
// import Cart from "./Cart";
import SearchForm from "./SearchForm";

import { GoHome } from "react-icons/go";
import { CiBoxList } from "react-icons/ci";
import { RiTeamLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { toast } from "react-hot-toast";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { parseCookies } from "nookies";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Navbar = ({ user }) => {
  const { elarniv_users_token } = parseCookies();
  const [menu, setMenu] = useState(true);
  const [loading, setloading] = useState(false);
  const [batchCourse, setBatchCourse] = useState("");

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  React.useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  // fetching batches
  const fetchingBatch = async (userBatch) => {
    try {
      setloading(true);
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const res = await axios.get(`${baseUrl}/api/batch/${userBatch}`, payload);
      setBatchCourse(res.data.course_from_batch);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("Failed, Try Again");
    }
  };

  useEffect(() => {
    if (user && user.my_batch) {
      fetchingBatch(user?.my_batch);
    }
  }, [user && user.my_batch]);

  return (
    <>
      <div id="navbar" className="navbar-area">
        <div className="edemy-nav">
          <div className="container-fluid">
            <div
              className={`navbar navbar-expand-lg navbar-light ${
                !user && 'py-2'
              }`}
            >
              <Link href="/">
                <a onClick={toggleNavbar} className="navbar-brand">
                  {/* {user?.my_course} */}
                  <img
                    src="/images/cycarts_logo.png"
                    alt="logo"
                    style={{ height: "40px" }}
                  />
                  {/* <h5 style={{ fontWeight: "800" }}>Cycarts-LMS</h5> */}
                </a>
              </Link>

              <button onClick={toggleNavbar} className={classTwo} type="button">
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                {/* <SearchForm /> */}

                <ul className="navbar-nav">
                  {/* Homw */}
                  {/* <motion.li
                    className="nav-item"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link href="/" activeClassName="active">
                      <a onClick={toggleNavbar} className="nav-link">
                        Home <GoHome className="" />
                      </a>
                    </Link>
                  </motion.li> */}

                  {/* about u s */}
                  {/* <motion.li
                    className="nav-item"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link href="/about-us" activeClassName="active">
                      <a onClick={toggleNavbar} className="nav-link">
                        About Us <RiTeamLine className="" />
                      </a>
                    </Link>
                  </motion.li> */}

                  {/* courses */}
                  {/* <motion.li
                    className="nav-item"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link href="/courses" activeClassName="active">
                      <a onClick={toggleNavbar} className="nav-link">
                        Courses <CiBoxList />
                      </a>
                    </Link>
                  </motion.li> */}

                  {user ? (
                    !user.instructor_request && (
                      <motion.li
                        className="nav-item"
                        whileHover={{
                          scale: 1.1,
                          transition: {
                            duration: 0.5,
                          },
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {/* <Link
                          href="/become-an-instructor"
                          activeClassName="active"
                        >
                          <a onClick={toggleNavbar} className="nav-link">
                            Become An Instructor
                          </a>
                        </Link> */}
                      </motion.li>
                    )
                  ) : (
                    <motion.li
                      className="nav-item"
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.5 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* <Link
                        href="/become-an-instructor"
                        activeClassName="active"
                      >
                        <a onClick={toggleNavbar} className="nav-link">
                          Become An Instructor
                        </a>
                      </Link> */}
                    </motion.li>
                  )}
                </ul>
              </div>

              <div className="others-option d-flex align-items-center">
                {/* <Cart /> */}

                <div className="option-item">
                  {
                    user && (
                      <ProfileDropdown {...user} batchCourse={batchCourse} />
                    )
                    // : (
                    //   <motion.div
                    //     className="login"
                    //     whileHover={{
                    //       scale: 1.1,
                    //       transition: { duration: 0.5 },
                    //     }}
                    //     whileTap={{ scale: 0.9 }}
                    //   >
                    //     <Link href="/authentication" activeClassName="active">
                    //       <a onClick={toggleNavbar} className="nav-link">
                    //         login <BiLogIn />
                    //       </a>
                    //     </Link>
                    //   </motion.div>

                    // )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
