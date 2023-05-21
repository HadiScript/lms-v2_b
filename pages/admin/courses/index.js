import React, { useState, useEffect } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { parseCookies } from "nookies";
import GeneralLoader from "@/utils/GeneralLoader";
import CourseRow from "@/components/Admin/CourseRow";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "@/components/Backdrop";
import { BsCheck } from "react-icons/bs";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 2,
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
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState();
  const [modalOpen2, setModalOpen2] = useState();
  const [currentCourse, setCurrentCourse] = useState({});
  const [Teachers, setTeachers] = useState([]);
  const [loadingTeacher, setLoadingTeacher] = useState(true);
  const [loadingAssignTeachers, setloadingAssignTeachers] = useState(true);
  const [giveCourse, setGiveCourse] = useState("");
  const [assignedTeachers, setAssignedTeachers] = useState([]);

  // for students
  const [students, setStudents] = useState([]);
  const [studentLoading, setStudentLoading] = useState(false);
  const [modalOpen3, setModalOpen3] = useState();
  const [modalOpen4, setModalOpen4] = useState();
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [assignStudent, setAssignStudent] = useState({});
  const [loading3, setLoading3] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);

  const fetchTeacherData = async () => {
    setLoadingTeacher(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(
        `${baseUrl}/api/instructor/instructors`,
        payload
      );
      setTeachers(response.data.instructors);
      setLoadingTeacher(false);
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
      setLoadingTeacher(false);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(`${baseUrl}/api/admin/courses`, payload);
      console.log(response.data.courses, "from datas");
      setCourses(response.data.courses);
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
  const handleAssigned = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };

      const payloadData = {
        teacherId: giveCourse && giveCourse, //user
        courseId: currentCourse && currentCourse.id,
      };
      const response = await axios.post(
        `${baseUrl}/api/course-teachers/`,
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
      //   setLoading(false);
      fetchData();
    }
  };

  const getCourseTeachers = async (courseId) => {
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(
        `${baseUrl}/api/course-teachers/${courseId}`,
        payload
      );
      setAssignedTeachers(response.data.teachers);
      setloadingAssignTeachers(false);
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
      setloadingAssignTeachers(false);
    }
  };

  // fetching studeents
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

  useEffect(() => {
    fetchStudentData();
  }, []);

  const close3 = () => {
    setModalOpen3(false);
    document.body.style.overflow = "unset";
  };

  const close4 = () => {
    setModalOpen4(false);
    document.body.style.overflow = "unset";
  };

  const handleAssignStudents = async (e) => {
    e.preventDefault();
    // console.log(assignStudent);
    let selectedStu;
    if (assignStudent) {
      selectedStu = students && students.find((x) => x.id === assignStudent);
    }
    const payloadData = {
      userId: assignStudent,
      batchId: currentCourse.id,
      studentName:
        selectedStu && selectedStu.first_name + " " + selectedStu.last_name,
      batch_course_name: currentCourse.details.title,
    };

    // console.log("assigning students payloads ", payloadData);
    // return;
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

      console.log(response.data.BatchStudents, "number of students");

      setAssignedStudents(response.data.BatchStudents);
      // setNumberOfAssignedStudents(response.data.BatcheStudentsNumber);
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

  return (
    <>
      <Navbar user={user} />

      <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <AdminSideNav user={user} />
            </div>

            <div className="col-lg-9 col-md-8">
              <div className="main-content-box">
                <ul className="nav-style1">
                  <li>
                    <Link href="/admin/courses/">
                      <a className="active">Courses</a>
                    </Link>
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
                          <th scope="col">Title</th>
                          <th scope="col">Coruse</th>
                          <th scope="col">Created By</th>
                          <th scope="col">from</th>
                          <th scope="col">to</th>
                          <th scope="col">monday</th>
                          <th scope="col">tuesday</th>
                          <th scope="col">wednesday</th>
                          <th scope="col">thursday</th>
                          <th scope="col">friday</th>
                          <th scope="col">Starting Date</th>
                          <th scope="col">Ending Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses?.length > 0 ? (
                          courses.map((course) => (
                            <tr>
                              {/* {JSON.stringify(course.details)} */}
                              <td>
                                <Link href={`/course/${course.slug}`}>
                                  <a>{course.title}</a>
                                </Link>
                              </td>
                              <td>{course.details.title}</td>
                              <td>{course.user.first_name}</td>

                              <td>{course.startingFrom}</td>
                              <td>{course._to}</td>
                              <td className="text-center">
                                {course.monday ? (
                                  <BsCheck size={25} color="green" />
                                ) : (
                                  "X"
                                )}
                              </td>
                              <td className="text-center">
                                {course.tuesday ? (
                                  <BsCheck size={25} color="green" />
                                ) : (
                                  "X"
                                )}
                              </td>
                              <td className="text-center">
                                {course.wednesday ? (
                                  <BsCheck size={25} color="green" />
                                ) : (
                                  "X"
                                )}
                              </td>
                              <td className="text-center">
                                {course.thursday ? (
                                  <BsCheck size={25} color="green" />
                                ) : (
                                  "X"
                                )}
                              </td>
                              <td className="text-center">
                                {course.friday ? (
                                  <BsCheck size={25} color="green" />
                                ) : (
                                  "X"
                                )}
                              </td>
                              <td className="text-center">
                                {course.startingDate && course.startingDate}
                                {/* {JSON.stringify(course.startingDate)} */}
                              </td>
                              <td className="text-center">
                                {course.endingDate && course.endingDate}
                              </td>

                              <td
                                onClick={() => {
                                  setModalOpen(true);
                                  setCurrentCourse(course);
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
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Give this course to teachers"
                                >
                                  assign
                                </span>
                              </td>
                              <td
                                onClick={() => {
                                  setModalOpen2(true);
                                  setCurrentCourse(course);
                                  getCourseTeachers(course.id);
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor: "purple",
                                    padding: "4px",
                                    borderRadius: "2px",
                                    color: "white",
                                    cursor: "pointer",
                                  }}
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Give this course to teachers"
                                >
                                  teachers
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
                                    setCurrentCourse(course);
                                    setModalOpen3(true);
                                  }}
                                >
                                  assign studs
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
                                    fetchAssignedStudents(course.id);
                                    setModalOpen4(true);
                                    setCurrentCourse(course);
                                  }}
                                >
                                  view studes
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

      {/* assign courses to the students */}
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
                    <h2>{currentCourse.title}</h2>

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
                          {Teachers.length === 0 && <>Empty</>}
                          {loadingTeacher ? (
                            <>wait...</>
                          ) : (
                            <>
                              <option value="">choose</option>
                              {Teachers.length > 0 &&
                                Teachers?.map((x) => (
                                  <option key={x.id} value={x.id}>
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
                          giveCourse && currentCourse && handleAssigned(e);
                        }}
                      >
                        Save {giveCourse}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>

      {/* assigned teachers */}
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
                    <h4>Assigned teachers</h4>
                    {loadingAssignTeachers && <>loading...</>}
                    {assignedTeachers.length === 0 && (
                      <p className="m-2">Empty</p>
                    )}
                    {/* {JSON.stringim rfy(assignedTeachers)} */}
                    {assignedTeachers.map((x) => (
                      <>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                            {x.users && x.users.profile_photo ? (
                              <img
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  marginRight: "5px",
                                }}
                                src={x.users.profile_photo}
                                alt={x.users.first_name}
                              />
                            ) : (
                              <img
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  marginRight: "5px",
                                }}
                                src="/images/avatar.jpg"
                                alt={x.users.first_name}
                              />
                            )}
                            <span>
                              {x.users.first_name} {x.users.last_name}
                            </span>
                          </li>
                        </ul>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>

      {/* modal fpr the assignmnets */}
      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {modalOpen3 && (
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
                  <button type="button" className="btn-close" onClick={close3}>
                    <i className="bx bx-x"></i>
                  </button>

                  <div className="register-form">
                    <h2>{currentCourse.title}</h2>

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
                          currentCourse && handleAssignStudents(e);
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

      {/* modal for the checking number student assigned */}
      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {modalOpen4 && (
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
                  <button type="button" className="btn-close" onClick={close4}>
                    <i className="bx bx-x"></i>
                  </button>

                  <div className="register-form">
                    <h2>{currentCourse.title}</h2>
                    {/* {JSON.stringify(currentBatch)} */}

                    {loading3 && "...loading..."}

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Number of Students Assigned#
                        <span className="text-light bg-info px-2 mx-2 rounded">
                          {/* {numberOfAssignedStudents} */}
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

export default Index;
