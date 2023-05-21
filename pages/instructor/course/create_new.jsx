import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import Link from "next/link";
import CourseCreateForm from "@/components/Instructor/CourseCreateForm";
import axios from "axios";
import { toast } from "react-hot-toast";
import baseUrl from "@/utils/baseUrl";
import { parseCookies } from "nookies";
import NewCourseCreateForm from "@/components/Instructor/CourseNewForm";

const NewCreation = ({ user }) => {
  const { elarniv_users_token } = parseCookies();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingData = async () => {
    setLoading(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(
        `${baseUrl}/api/instructor/instructors`,
        payload
      );
      setTeachers(response.data.instructors);
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
    fetchingData();
  }, []);

  return (
    <>
      <Navbar user={user} />

      <div className="ptb-100">
        <div className="container">
          <h2 className="fw-bold mb-4">Create the Course</h2>

          <ul className="nav-style1">
            <li>
              <Link href="/instructor/courses/">
                <a>Courses</a>
              </Link>
            </li>
            <li>
              <Link href="/instructor/course/create/">
                <a className="active">Create a Course</a>
              </Link>
            </li>
            <li>
              <Link href="/instructor/course/create-class/">
                <a>Create Class Room</a>
              </Link>
            </li>
          </ul>

          <div className="create-course-form">
            {loading
              ? "...loading..."
              : teachers && (
                  <NewCourseCreateForm teachers={teachers} user={user} />
                )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NewCreation;
