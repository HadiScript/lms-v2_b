// active batches

import AdminSideNav from "@/components/_App/AdminSideNav";
import Footer from "@/components/_App/Footer";
import Navbar from "@/components/_App/Navbar";
import GeneralLoader from "@/utils/GeneralLoader";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsCheck } from "react-icons/bs";
import Backdrop from "@/components/Backdrop";

const AllBatches = ({ user }) => {
  const { elarniv_users_token } = parseCookies();
  const [loading, setLoading] = useState(false);
  const [allBatches, setAllBatches] = useState([]);
  const [modalOpen, setModalOpen] = useState();
  const [modalOpen2, setModalOpen2] = useState();
  const [students, setStudents] = useState([]);
  const [currentBatch, setCurrentBatch] = useState({});
  const [assignStudent, setAssignStudent] = useState({});
  const [studentLoading, setStudentLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [numberOfAssignedStudents, setNumberOfAssignedStudents] = useState(0);
  const [loading3, setLoading3] = useState(false);
  // loading3 -> assigned Student loading

  const fetchData = async () => {
    setLoading(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(`${baseUrl}/api/batch/all`, payload);

      setAllBatches(response.data.batches);
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

  const fetchStudentData = async () => {
    setStudentLoading(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(`${baseUrl}/api/students`, payload);

      setStudents(response.data.students);
      setStudentLoading(false);
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
      setStudentLoading(false);
    }
  };

  const fetchAssignedStudents = async (batchID) => {
    setLoading3(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const payloadData = {
        batchId: batchID,
        fromID: "batchID",
      };
      const response = await axios.post(
        `${baseUrl}/api/studentBatches/Getting`,
        payloadData,
        payload
      );

      setAssignedStudents(response.data.BatchStudents);
      setNumberOfAssignedStudents(response.data.BatcheStudentsNumber);
      setLoading3(false);
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
      setLoading3(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStudentData();
  }, []);

  const close = () => {
    setModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const close2 = () => {
    setModalOpen2(false);
    document.body.style.overflow = "unset";
  };

  const handleAssigned = async (e) => {
    e.preventDefault();
    // console.log(assignStudent);
    let selectedStu;
    if (assignStudent) {
      selectedStu = students && students.find((x) => x.id === assignStudent);
    }
    const payloadData = {
      userId: assignStudent,
      batchId: currentBatch.id,
      studentName:
        selectedStu && selectedStu.first_name + " " + selectedStu.last_name,
      batch_course_name: currentBatch.course,
    };
    try {
      setAssignLoading(true);
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };

      const response = await axios.post(
        `${baseUrl}/api/studentBatches/`,
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
      setAssignLoading(false);
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
      setAssignLoading(false);
      fetchData();
    }
  };

  const makeDeactive = async (id) => {
    setLoading(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      await axios.put(`${baseUrl}/api/batch/all`, { batchID: id }, payload);

      fetchData();
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

  return (
    <>
      <Navbar user={user} />

      {/* table */}
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
                    <a className="active">Active Batches</a>
                  </li>
                  <li>
                    <a href="/admin/batch/deactive/">Deactive Batches</a>
                  </li>
                </ul>
                {loading ? (
                  <GeneralLoader />
                ) : (
                  <div className="table-responsive">
                    <table
                      className="table align-middle table-hover fs-14"
                      style={{ width: "1400px" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">course</th>
                          <th scope="col">from</th>
                          <th scope="col">to</th>
                          <th scope="col">monday</th>
                          <th scope="col">tuesday</th>
                          <th scope="col">wednesday</th>
                          <th scope="col">thursday</th>
                          <th scope="col">friday</th>
                          <th scope="col">Starting Date</th>
                          <th scope="col">Ending Date</th>
                          <th scope="col"></th>
                          <th scope="col"></th>

                          {/* <th scope="col">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {allBatches.length > 0 ? (
                          allBatches.map((user) => (
                            <tr key={user.id}>
                              <td>{user.batchName}</td>
                              <td>{user.course}</td>
                              <td>{user.startingFrom}</td>
                              <td>{user._to}</td>
                              <td className="text-center">
                                {user.monday ? (
                                  <BsCheck size={25} color="green" />
                                ) : (
                                  "X"
                                )}
                              </td>
                              <td className="text-center">
                                {user.tuesday ? (
                                  <BsCheck size={25} color="green" />
                                ) : (
                                  "X"
                                )}
                              </td>
                              <td className="text-center">
                                {user.wednesday ? (
                                  <BsCheck size={25} color="green" />
                                ) : (
                                  "X"
                                )}
                              </td>
                              <td className="text-center">
                                {user.thursday ? (
                                  <BsCheck size={25} color="green" />
                                ) : (
                                  "X"
                                )}
                              </td>
                              <td className="text-center">
                                {user.friday ? (
                                  <BsCheck size={25} color="green" />
                                ) : (
                                  "X"
                                )}
                              </td>
                              <td className="text-center">
                                {user.startingDate && user.startingDate}
                                {/* {JSON.stringify(user.startingDate)} */}
                              </td>
                              <td className="text-center">
                                {user.endingDate && user.endingDate}
                              </td>

                              <td>
                                <span
                                  style={{
                                    backgroundColor: "green",
                                    padding: "4px",
                                    borderRadius: "2px",
                                    color: "white",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setCurrentBatch(user);
                                    setModalOpen(true);
                                  }}
                                >
                                  assign
                                </span>
                              </td>

                              <td>
                                <span
                                  style={{
                                    backgroundColor: "green",
                                    padding: "4px",
                                    borderRadius: "2px",
                                    color: "white",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    fetchAssignedStudents(user.id);
                                    setModalOpen2(true);
                                    setCurrentBatch(user);
                                  }}
                                >
                                  view
                                </span>
                              </td>

                              <td>
                                <span
                                  style={{
                                    backgroundColor: "red",
                                    padding: "4px",
                                    borderRadius: "2px",
                                    color: "white",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => makeDeactive(user.id)}
                                >
                                  de-active
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

      {/* modal fpr the assignmnets */}
      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {modalOpen && (
          <Backdrop onClick={() => {}}>
            <motion.div
              className="modal fade show"
              onClick={(e) => e.stopPropagation()}
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
                    <h2>{currentBatch.title}</h2>

                    <form onSubmit={() => {}}>
                      <div className="form-group">
                        <label>Assign Course</label>
                        <select
                          className="form-select"
                          value={assignStudent}
                          onChange={(e) => {
                            console.log(e.target.value, "frommmm");
                            setAssignStudent(e.target.value);
                          }}
                        >
                          {students.length === 0 && <>Empty</>}
                          {studentLoading ? (
                            <>wait...</>
                          ) : (
                            <>
                              <option value="">choose</option>
                              {students.length > 0 &&
                                students?.map((x) => (
                                  <option key={x.id} value={x.id}>
                                    {/* {JSON.stringify(students)} */}
                                    {x.first_name + " " + x.last_name}
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
                          currentBatch && handleAssigned(e);
                        }}
                      >
                        Save {assignLoading && "..loading.."}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>

      {/* modal for the checking number student assigned */}
      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {modalOpen2 && (
          <Backdrop onClick={() => {}}>
            <motion.div
              className="modal fade show"
              onClick={(e) => e.stopPropagation()}
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
                    <h2>{currentBatch.batchName}</h2>
                    {/* {JSON.stringify(currentBatch)} */}

                    {loading3 && "...loading..."}

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Number of Students Assigned#
                        <span className="text-light bg-info px-2 mx-2 rounded">
                          {numberOfAssignedStudents}
                        </span>
                      </li>
                      {assignedStudents.length > 0 ? (
                        assignedStudents.map((x) => (
                          <li className="list-group-item">{x.studentName}</li>
                        ))
                      ) : (
                        <li className="list-group-item">No Any Student</li>
                      )}
                    </ul>
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

export default AllBatches;
