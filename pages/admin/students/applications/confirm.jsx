import Backdrop from "@/components/Backdrop";
import AdminSideNav from "@/components/_App/AdminSideNav";
import Footer from "@/components/_App/Footer";
import Navbar from "@/components/_App/Navbar";
import GeneralLoader from "@/utils/GeneralLoader";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { CiLocationArrow1 } from "react-icons/ci";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdLocationCity } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { BsCalendar2Date } from "react-icons/bs";
import { RiParentFill } from "react-icons/ri";
import { TbTie } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { parseCookies } from "nookies";
import Link from "next/link";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Confirm = ({ user }) => {
  const { elarniv_users_token } = parseCookies();

  // stuApps -> student applications
  const [stuApps, setStuApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAppr, setLoadingAppr] = useState(false);
  const [modalOpen, setModalOpen] = useState();
  const [modalOpen2, setModalOpen2] = useState();
  const [currentStuApp, setCurrentStuApp] = useState({});
  const [password, setPassword] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/student_app/GetStuAppConfirm`
      );
      setStuApps(response.data.students_apps);
      setLoading(false);
    } catch (err) {
      let {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message, {
        style: {
          border: "1px solid #ff0033",
          padding: "16px",
          color: "#ff0033",
        },
        iconTheme: {
          primary: "#ff0033",
          secondary: "#FFFAEE",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const close = () => {
    setModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const close2 = () => {
    setModalOpen2(false);
    document.body.style.overflow = "unset";
  };

  const RegisterUser = async (e, user) => {
    e.preventDefault();
    if (!password) {
      return toast.error("please enter password", {
        style: {
          border: "1px solid #ff0033",
          padding: "16px",
          color: "#ff0033",
        },
        iconTheme: {
          primary: "#ff0033",
          secondary: "#FFFAEE",
        },
      });
    }
    try {
      setLoading(true);
      const url = `${baseUrl}/api/users/signup`;
      const payload = {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password,
      };
      const response = await axios.post(url, payload);

      // handleLogin(response.data.elarniv_users_token, router);
      toast.success(response.data.message, {
        style: {
          border: "1px solid #4BB543",
          padding: "16px",
          color: "#4BB543",
        },
        iconTheme: {
          primary: "#4BB543",
          secondary: "#FFFAEE",
        },
      });

      await axios.put(
        `${baseUrl}/api/student_app/GetStuAppConfirm`,
        {
          userId: user.id,
        },
        payload
      );
      setModalOpen2(false);
      fetchData();
    } catch (err) {
      let {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message, {
        style: {
          border: "1px solid #ff0033",
          padding: "16px",
          color: "#ff0033",
        },
        iconTheme: {
          primary: "#ff0033",
          secondary: "#FFFAEE",
        },
      });
      setModalOpen2(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar user={user} />

      {/* table student applicatons */}
      <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            {/* sidebar */}
            <div className="col-lg-3 col-md-4">
              <AdminSideNav user={user} />
            </div>

            <div className="col-lg-9 col-md-8">
              <div className="main-content-box">
                <ul className="nav-style1">
                  <li>
                    <Link href="/admin/students/applications/pending">
                      <a>Pending</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/students/applications/confirm">
                      <a className="active">Approved</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/students/applications/rejected">
                      <a>Rejected</a>
                    </Link>
                  </li>
                </ul>
                {loading ? (
                  <GeneralLoader />
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle table-hover fs-14">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">ID Card</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Education</th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {stuApps.length > 0 ? (
                          stuApps.map((user) => (
                            <tr key={user.id}>
                              <td>{`${user.firstName} ${user.lastName}`}</td>
                              <td>{user.email}</td>
                              <td>{user.idCard}</td>
                              <td>{user.phoneNumber}</td>
                              <td>{user.education}</td>

                              <td>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setModalOpen(true);
                                    setCurrentStuApp(user);
                                  }}
                                  className="text-primary"
                                >
                                  View
                                </span>
                              </td>

                              <td>
                                {!user.registered ? (
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setModalOpen2(true);
                                      setCurrentStuApp(user);
                                    }}
                                    className="text-primary"
                                  >
                                    Register
                                  </span>
                                ) : (
                                  <span
                                    style={{ cursor: "pointer" }}
                                    className="text-success"
                                  >
                                    Already Registered
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center py-3">
                              Empty!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* model View */}
      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {modalOpen && (
          <Backdrop onClick={() => {}}>
            <motion.div
              className="modal fade show"
              onClick={(e) => e.stopPropagation()}
              //   variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <button type="button" className="btn-close" onClick={close}>
                    <i className="bx bx-x"></i>
                  </button>

                  <div className="container">
                    <div className="py-5">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "start",
                          gap: "10px",
                        }}
                      >
                        <img
                          src="/images/avatar.jpg"
                          alt={currentStuApp.lastName}
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                            marginBottom: "10px",
                          }}
                        />
                        <h2>
                          {currentStuApp.firstName + currentStuApp.lastName}
                        </h2>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-lg-1 col-md-0" />
                        <div className="col-lg-9 col-md-12">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {/* <AiOutlineMail />  */}
                            <span className="text-secondary">Email</span>
                            <span className="text-dark">
                              {currentStuApp.email}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">ph#</span>
                            <span className="text-dark">
                              {currentStuApp.phoneNumber}
                            </span>

                            {/* <BiPhoneCall />
                            <span className="text-primary">
                              {currentStuApp.phoneNumber}
                            </span> */}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">CNIC#</span>
                            <span className="text-dark">
                              {currentStuApp.idCard}
                            </span>
                            {/* <HiOutlineIdentification />
                            <span className="">{currentStuApp.idCard}</span> */}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">Address</span>
                            <span className="text-dark">
                              {currentStuApp.address}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">City</span>
                            <span className="text-dark">
                              {currentStuApp.city}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">
                              Date of birth
                            </span>
                            <span className="text-dark">
                              {currentStuApp.dateOfBirth}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">Education</span>
                            <span className="text-dark">
                              {currentStuApp.education}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">Gender</span>
                            <span className="text-dark">
                              {currentStuApp.gender}
                            </span>
                          </div>

                          <br />

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">Father Name</span>
                            <span className="text-dark">
                              {currentStuApp.parentName}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">Occupation</span>
                            <span className="text-dark">
                              {currentStuApp.parentOccupations}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">
                              Father phone #
                            </span>
                            <span className="text-dark">
                              {currentStuApp.parentPhoneNumber}
                            </span>
                          </div>
                          <br />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">Interest</span>
                            <span className="text-dark">
                              {currentStuApp.interest}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">
                              Want to acheive
                            </span>
                            <span className="text-dark">
                              {currentStuApp.wantToAchieve}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="text-secondary">
                              Enroll to {currentStuApp.enrollTo}
                            </span>
                            <span className="text-dark">
                              {currentStuApp.enrollTo === "program"
                                ? currentStuApp.course
                                : ""}
                              {currentStuApp.enrollTo === "workshop"
                                ? currentStuApp.workshop
                                : ""}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-2 col-md-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>

      {/* Register */}
      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {modalOpen2 && (
          <Backdrop onClick={() => {}}>
            <motion.div
              className="modal fade show"
              onClick={(e) => e.stopPropagation()}
              //   variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <button type="button" className="btn-close" onClick={close2}>
                    <i className="bx bx-x"></i>
                  </button>

                  <div className="container">
                    <div className="register-form">
                      <h2>{currentStuApp.firstName}</h2>

                      <form onSubmit={(e) => RegisterUser(e, currentStuApp)}>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <motion.button
                          type="submit"
                          className="mb-3"
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {}}
                        >
                          Register
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
};

export default Confirm;
