import Backdrop from "@/components/Backdrop";
import AdminSideNav from "@/components/_App/AdminSideNav";
import Navbar from "@/components/_App/Navbar";
import GeneralLoader from "@/utils/GeneralLoader";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsCheck } from "react-icons/bs";

const Deactive = ({ user }) => {
  const { elarniv_users_token } = parseCookies();

  const [loading, setLoading] = useState(false);
  const [deBatches, setDeBatches] = useState([]);
  const [modalOpen2, setModalOpen2] = useState();
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [numberOfAssignedStudents, setNumberOfAssignedStudents] = useState(0);
  const [currentBatch, setCurrentBatch] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(
        `${baseUrl}/api/batch/all_deactive`,
        payload
      );

      setDeBatches(response.data.batches);
      setLoading(false);
    } catch (err) {
      console.log(err);
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

  const fetchAssignedStudents = async (batchID) => {
    setLoading(true);
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

  const close2 = () => {
    setModalOpen2(false);
    document.body.style.overflow = "unset";
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
                    <a href="/admin/batch/all/">Active Batches</a>
                  </li>
                  <li>
                    <a className="active">Deactive Batches</a>
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

                          {/* <th scope="col">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {deBatches.length > 0 ? (
                          deBatches.map((user) => (
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
                                >
                                  deactive
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

                    {loading && "...loading..."}

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

export default Deactive;
