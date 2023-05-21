import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import GeneralLoader from "@/utils/GeneralLoader";
import CourseCard from "@/components/Learning/CourseCard";

const Index = ({ user }) => {
  // return;
  const { elarniv_users_token } = parseCookies();
  const [enrolments, setEnrolments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [myCourse, setMyCourse] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchMyCourse = async () => {
    try {
      setLoading(true);
      const payload = {
        params: { id: user?.id },
        headers: { Authorization: elarniv_users_token },
      };
      const url = `${baseUrl}/api/users/course/mycourse/`;
      const response = await axios.get(url, payload);
      console.log(response, "here is the res from my course page");
      setCourses(response.data.mycourses);
      setLoading(false);
    } catch (err) {
      setLoading(false);
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
    }
  };

  useEffect(() => {
    fetchMyCourse();
  }, []);

  return (
    <>
      <Navbar user={user} />

      <div className="ptb-100">
        <div className="container">
          <h2 className="fw-bold mb-4">My learning</h2>

          <ul className="nav-style1">
            <li>
              <Link href="/learning/my-courses/">
                <a className="active">All Courses</a>
              </Link>
            </li>
          </ul>

          <div className="row">
            {loading ? (
              <GeneralLoader />
            ) : (
              <>
                {courses.length > 0 ? (
                  courses.map((x) => (
                    <>
                      <CourseCard
                        key={x.id}
                        {...x}
                        slug={x.title}
                        details={x.details}
                        user={x.user}
                      />
                    </>
                  ))
                ) : (
                  <h5>Dont have any batch !</h5>
                  
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Index;
