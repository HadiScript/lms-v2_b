import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageNavigation from "@/components/Instructor/PageNavigation";
import { useRouter } from "next/router";
import LiveForm from "@/components/Instructor/LiveForm";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";

const GoLive = ({ user }) => {
  const router = useRouter();
  const { id: courseId } = router.query;

  const { elarniv_users_token } = parseCookies();

  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const url = `${baseUrl}/api/courses/course/live_link/${courseId}`;
      const response = await axios.get(url, payload);
      console.log(response.data.course, "from live page");
      setCourse(response.data.course);
    };

    fetchCourse();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="ptb-100">
        <div className="container">
          <PageNavigation courseId={courseId} activeClassname="live" />

          <div className="create-course-form">
            <LiveForm
              courseId={courseId}
              live={course?.live_link && course?.live_link}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GoLive;
