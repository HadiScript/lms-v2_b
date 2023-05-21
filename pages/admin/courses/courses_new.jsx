// copied from index
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(
        `${baseUrl}/api/admin/courses/new_details`,
        payload
      );
      console.log(response.data.courses, "from course detials new");
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

  const handleCourseHome = async (courseId) => {
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };

      const payloadData = { courseId, apply: true };
      const response = await axios.put(
        `${baseUrl}/api/admin/courses/new_details`,
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
      setLoading(false);
      fetchData();
    }
  };

  const handleCourseRemoveHome = async (courseId) => {
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };

      const payloadData = { courseId, apply: false };
      const response = await axios.put(
        `${baseUrl}/api/admin/courses/new_details`,
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
                  <li>
                    <Link href="/admin/courses/new-arrival/">
                      <a>New Arrival</a>
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
                          <th scope="col">Title</th>
                          {/* <th scope="col">Price</th> */}
                          <th scope="col">Category</th>
                          <th scope="col">Created By</th>
                          <th scope="col">Homepage</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses?.length > 0 ? (
                          courses.map((course) => (
                            <tr>
                              <td>
                                {/* <Link href={`/course/${course.slug}`}> */}
                                <a>{course.title}</a>
                                {/* </Link> */}
                              </td>
                              {/* <td>${course.latest_price}</td> */}
                              <td>
                                {course.category_from_course_details.name}
                              </td>
                              <td>
                                {course.user_from_course_details.first_name}
                              </td>
                              {/* <td>{course.videos.length}</td> */}

                              <td>
                                {course.in_home_page ? (
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm fs-12 ms-2"
                                    onClick={() =>
                                      handleCourseRemoveHome(course.id)
                                    }
                                  >
                                    Remove
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm fs-12 ms-2"
                                    onClick={() => handleCourseHome(course.id)}
                                  >
                                    Homepage
                                  </button>
                                )}
                              </td>

                              <td>
                                {course.approved ? (
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm fs-12 ms-2"
                                  >
                                    Approved
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-warning btn-sm fs-12"
                                  >
                                    Pending
                                  </button>
                                )}
                              </td>
                              {!course.approved && (
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm fs-12 ms-2"
                                    onClick={() => onApprove(id)}
                                  >
                                    Approve Now
                                  </button>

                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm fs-12 ms-2"
                                    onClick={() => onDeny(id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              )}
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
    </>
  );
};

export default Index;
