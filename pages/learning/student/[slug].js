import CourseAsset from "@/components/Learning/CourseAsset";
import CourseDiscussion from "@/components/Learning/CourseDiscussion";
import CourseFeedback from "@/components/Learning/UploadAssign";
import CourseOverview from "@/components/Learning/CourseOverview";
import CourseRating from "@/components/Learning/CourseRating";
import Player from "@/components/Learning/Player";
import ProgressManager from "@/components/Learning/ProgressManager";
import VideoList from "@/components/Learning/VideoList";
import Footer from "@/components/_App/Footer";
import Navbar from "@/components/_App/Navbar";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import StickyBox from "react-sticky-box";
import UploadAssignment from "@/components/Learning/UploadAssign";
import SingleCoursesPage from "pages/course/[slug]";
import { parseCookies } from "nookies";

const StudentCourse = ({ user }) => {
  const { elarniv_users_token } = parseCookies();
  const [lessons, setLessons] = useState([]);

  const [course, setCourse] = useState({});
  const [active, setActive] = useState("");
  const [tab, setTab] = useState("overview");
  const [notice, setNotice] = useState([]);

  //   routes
  const {
    query: { slug },
  } = useRouter();

  const fetchLesson = async () => {
    const url = `${baseUrl}/api/learnings/lessons/${slug}`;
    const response = await axios.get(url);
    setLessons(response.data.lessons);
    setCourse(response.data.course);
  };

  useEffect(() => {
    fetchLesson();
  }, [slug]);

  const fetchNotice = async () => {
    const payload = {
      headers: { Authorization: elarniv_users_token },
    };
    const url = `${baseUrl}/api/courses/course/notice/${course.id}`;
    const response = await axios.get(url, payload);
    // console.log(response.data.courseNoticed, "from notice page");
    setNotice(response.data.courseNoticed);
  };

  useEffect(() => {
    if (course && course.id) fetchNotice();
  }, [course && course.id]);

  return (
    <>
      <Navbar user={user} />
      {/* {JSON.stringify(slug)} */}
      {/* {JSON.stringify(notice)} */}
      <div className="mt-5 pb-5 video-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9 col-md-8">
              <div className="video-content">
                {/* // {selectedVideo && <Player videoSrc={selectedVideo} />} */}
                <div class={`alert alert-${notice[0]?.variant}`} role="alert">
                  <h4 class="alert-heading">{notice[0]?.heading}</h4>
                  <p>{notice[0]?.text}</p>
                  <hr />
                  <p class="mb-0">{notice[0]?.created_at}</p>
                </div>

                <br />
                <ul className="nav-style1">
                  <li>
                    <Link href={`learning/course/${slug}`}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setTab("overview");
                        }}
                        className={tab == "overview" ? "active" : ""}
                      >
                        Overview
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/learning/course/${slug}`}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setTab("asset");
                        }}
                        className={tab == "asset" ? "active" : ""}
                      >
                        Assets
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/learning/course/${slug}`}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setTab("discussion");
                        }}
                        className={tab == "discussion" ? "active" : ""}
                      >
                        Discussion
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href={`/learning/course/${slug}`}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setTab("Upload");
                        }}
                        className={tab == "Upload" ? "active" : ""}
                      >
                        Upload Assignment
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href={`/learning/course/${slug}`}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setTab("rating");
                        }}
                        className={tab == "rating" ? "active" : ""}
                      >
                        Schedule
                      </a>
                    </Link>
                  </li>
                </ul>
                {/* {course && tab === "overview" && <SingleCoursesPage />} */}
                {course && tab == "asset" ? (
                  <CourseAsset {...course} />
                ) : tab == "discussion" ? (
                  <CourseDiscussion {...course} user={user} />
                ) : tab == "rating" ? (
                  <CourseRating {...course} />
                ) : tab == "Upload" ? (
                  <UploadAssignment {...course} />
                ) : (
                  <CourseOverview
                    {...course}
                    overview={course.details && course.details.overview}
                    desc={course.details && course.details.short_desc}
                    whatYouLearn={
                      course.details && course.details.what_you_will_learn
                    }
                  />
                )}
              </div>
            </div>

            <div className="col-lg-3 col-md-4">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <div className="video-sidebar">
                  {course && course.live_link ? (
                    <a
                      className="course-video-list"
                      href={course?.live_link}
                      target="_blank"
                    >
                      <h6 className="mb-3 text-primary"> Join Class </h6>
                    </a>
                  ) : (
                    ""
                  )}

                  <div className="course-video-list">
                    <h4 className="title mb-3">{course && course.title}</h4>
                    <ul>
                      {lessons.length > 0 &&
                        lessons.map((video) => (
                          <VideoList
                            key={video.id}
                            {...video}
                            activeClass={"fdal"}
                          />
                        ))}
                    </ul>
                  </div>
                </div>
              </StickyBox>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentCourse;
