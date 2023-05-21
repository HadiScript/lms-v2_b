import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Link from "next/link";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import StudentsRaw from "@/components/Admin/StudentsRaw";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import GeneralLoader from "@/utils/GeneralLoader";
import { parseCookies } from "nookies";

import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "@/components/Backdrop";
import { BiTrash } from "react-icons/bi";

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

const Index = ({ user }) => {
  const { elarniv_users_token } = parseCookies();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [giveCourse, setGiveCourse] = useState("");
  const [giveBatch, setGiveBatch] = useState("");
  const [modalOpen, setModalOpen] = useState();
  const [modalOpen2, setModalOpen2] = useState();
  const [batches, setBatches] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // fethcing students data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/students`);
      setUsers(response.data.students);
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

  //   fetching course
  const [courses, setCourses] = useState([]);
  const [loadingCourse, setLoadingCourse] = useState(true);

  const fetchDataCourse = async () => {
    setLoadingCourse(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(`${baseUrl}/api/admin/courses`, payload);
      // console.log(response.data.courses);
      setCourses(response.data.courses);
      //   setGiveCourse(response.data?.courses[0]?.title);
      setLoadingCourse(false);
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
      setLoadingCourse(false);
    }
  };

  useEffect(() => {
    fetchDataCourse();
  }, []);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(`${baseUrl}/api/batch/all`, payload);
      setBatches(response.data.batches);
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
    fetchBatches();
  }, []);

  // handle admin function
  const handleAdmin = async (e, userId) => {
    // console.log(userId);

    e.preventDefault();

    // setGiveCourse(e.target.value);

    if (!giveCourse) return;
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };

      const payloadData = { userId, course: giveCourse };
      const response = await axios.put(
        `${baseUrl}/api/admin/make-admin`,
        payloadData,
        payload
      );
      setGiveCourse("");
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
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  // give him the batch
  const handleBatch = async (e, userId) => {
    // console.log(userId);

    e.preventDefault();

    // setGiveCourse(e.target.value);

    if (!giveBatch) return;
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };

      const payloadData = { userId, my_batch: giveBatch };
      const response = await axios.put(
        `${baseUrl}/api/admin/Give-Batch`,
        payloadData,
        payload
      );
      setGiveCourse("");
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
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const close = () => {
    setModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const close2 = () => {
    setModalOpen2(false);
    document.body.style.overflow = "unset";
  };

  const DropStudent = async (dropedUser) => {
    try {
      console.log(elarniv_users_token, "token from delete functions");
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const userID = dropedUser.id;
      const payloadData = {
        joining_date: dropedUser.created_at,
        stu_name: dropedUser.first_name + " " + dropedUser.last_name,
        stu_email: dropedUser.email,
        cord_id: user.id,
        course: dropedUser.my_course,
      };

      const response = await axios.post(
        `${baseUrl}/api/users/delete/${userID}`,
        payloadData,
        payload
      );

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
      fetchData();
    } catch (err) {
      console.log(err, "from");
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
      fetchData();
    }
  };

  return (
    <>
      <Navbar user={user} />

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
                    <Link href="/admin/students/">
                      <a className="active">Students</a>
                    </Link>
                  </li>
                  {user?.role?.admin && (
                    <li>
                      <Link href="/admin/students/site-admins/">
                        <a>Admins</a>
                      </Link>
                    </li>
                  )}
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
                          <th scope="col">Asigned Course</th>
                          <th scope="col">Batch</th>

                          {/* <th scope="col">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 ? (
                          users.map((user) => (
                            <tr key={user.id}>
                              <td>{`${user.first_name} ${user.last_name}`}</td>
                              <td>{user.email}</td>
                              <td className="">
                                {user.my_course ? user.my_course : "-"}
                              </td>
                              <td className="">
                                {user.my_batch ? user.my_batch : "-"}
                              </td>

                              <td
                                onClick={() => {
                                  setModalOpen(true);
                                  setCurrentUser(user);
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor: "grey",
                                    padding: "4px",
                                    borderRadius: "2px",
                                    color: "white",
                                    cursor: "pointer",
                                  }}
                                >
                                  assign
                                </span>
                              </td>

                              <td
                                onClick={() => {
                                  setModalOpen2(true);
                                  setCurrentUser(user);
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor: "blue",
                                    padding: "4px",
                                    borderRadius: "2px",
                                    color: "white",
                                    cursor: "pointer",
                                  }}
                                >
                                  assign batch
                                </span>
                              </td>

                              {/* delete student */}
                              <td>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    confirmAlert({
                                      title: "",
                                      message: `Are you sure to drop ${user.first_name} `,
                                      buttons: [
                                        {
                                          label: "Yes",
                                          onClick: () => DropStudent(user),
                                        },
                                        {
                                          label: "No",
                                          //onClick: () => alert('Click No')
                                        },
                                      ],
                                    });
                                  }}
                                  className="text-danger"
                                >
                                  Drop
                                </span>
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

      {/* modal */}

      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {modalOpen && (
          <Backdrop onClick={() => {}}>
            <motion.div
              className="modal fade show"
              onClick={(e) => e.stopPropagation()}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <button type="button" className="btn-close" onClick={close}>
                    <i className="bx bx-x"></i>
                  </button>

                  <div className="register-form">
                    <h2>{currentUser.first_name}</h2>

                    <form onSubmit={() => {}}>
                      <div className="form-group">
                        <label>Assign Course</label>
                        <select
                          className="form-select"
                          value={giveCourse}
                          onChange={(e) => {
                            setGiveCourse(e.target.value);
                          }}
                        >
                          {loadingCourse ? (
                            <>wait...</>
                          ) : (
                            <>
                              <option value="">choose</option>
                              {courses?.map((x) => (
                                <option key={x.id} value={x.slug}>
                                  {x.slug}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                      <motion.button
                        type="submit"
                        style={{ backgroundColor: " white", color: "GrayText" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          giveCourse &&
                            currentUser &&
                            handleAdmin(e, currentUser.id);
                        }}
                      >
                        Save
                      </motion.button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {modalOpen2 && (
          <Backdrop onClick={() => {}}>
            <motion.div
              className="modal fade show"
              onClick={(e) => e.stopPropagation()}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <button type="button" className="btn-close" onClick={close2}>
                    <i className="bx bx-x"></i>
                  </button>

                  <div className="register-form">
                    <h2>{currentUser.first_name}</h2>

                    <form onSubmit={() => {}}>
                      <div className="form-group">
                        <label>Assign Batch</label>
                        <select
                          className="form-select"
                          value={giveBatch}
                          onChange={(e) => {
                            setGiveBatch(e.target.value);
                          }}
                        >
                          {loadingCourse ? (
                            <>wait...</>
                          ) : (
                            <>
                              <option value="">choose</option>
                              {batches?.map((x) => (
                                <option key={x.id} value={x.slug}>
                                  {x.batchName}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                      <motion.button
                        type="submit"
                        style={{ backgroundColor: " white", color: "GrayText" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          giveBatch &&
                            currentUser &&
                            handleBatch(e, currentUser.id);
                        }}
                      >
                        Save
                      </motion.button>
                    </form>
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

export default Index;
