import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { toast } from "react-hot-toast";
import { parseCookies } from "nookies";

const CoursesCard = ({
  id,
  title,
  slug,
  short_desc,
  lessons,
  is_class,
  user: { first_name, last_name, profile_photo },

  onDelete,
}) => {
  const { elarniv_users_token } = parseCookies();

  const [loading, setLoading] = useState(false);
  const [assignedStudents, setAssignedStudents] = useState(0);

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

      // console.log(response.data.BatchStudents, "number of students");

      setAssignedStudents(response.data.BatcheStudentsNumber);
      // setNumberOfAssignedStudents(response.data.BatcheStudentsNumber);
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

  useEffect(() => {
    id && fetchAssignedStudents(id);
  }, [id]);

  return (
    <div className="col-lg-4 col-md-6">
      <div className="single-courses-box">
        <div className="courses-image">
          <div className="dropdown action-dropdown">
            <div className="icon">
              <i className="bx bx-dots-vertical-rounded"></i>
            </div>
            <ul className="dropdown-menu">
              <li>
                <Link href={`/instructor/course/chat/${id}`}>
                  <a className="dropdown-item">
                    <i className="bx bx-chat"></i> Discussion
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/instructor/course/notice/${id}`}>
                  <a className="dropdown-item">
                    <i className="bx bx-cloud-upload"></i> Notice
                  </a>
                </Link>
              </li>

              <li>
                <Link href={`/instructor/course/live/${id}`}>
                  <a className="dropdown-item">
                    {" "}
                    <i className="bx bx-play"></i> Go Live
                  </a>
                </Link>
              </li>

              <li>
                <Link href={`/instructor/course/edit/${id}`}>
                  <a className="dropdown-item">
                    {" "}
                    <i className="bx bx-edit"></i> Edit Course
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/instructor/course/lesson_uploads/${id}`}>
                  <a className="dropdown-item">
                    <i className="bx bx-cloud-upload"></i> Upload Lesson
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/instructor/course/lessonEdits/${id}`}>
                  <a className="dropdown-item">
                    <i className="bx bxs-edit-alt"></i> Edit Lessons
                  </a>
                </Link>
              </li>

              <li>
                <Link href={`/instructor/course/assets/${id}`}>
                  <a className="dropdown-item">
                    <i className="bx bxs-file-plus"></i> Assets
                  </a>
                </Link>
              </li>

              <li>
                <Link href={`/instructor/course/folders/${id}`}>
                  <a className="dropdown-item">
                    <i className="bx bxs-folder-plus"></i> create folder
                  </a>
                </Link>
              </li>

              <li>
                <button
                  onClick={() => onDelete(id)}
                  type="button"
                  className="dropdown-item"
                >
                  <i className="bx bxs-trash"></i> Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="courses-content">
          <h3>
            {is_class ? (
              <Link href={`/learning/course/class/${slug}`}>
                <a>{title}</a>
              </Link>
            ) : (
              <Link href={`/instructor/course/edit/${id}`}>
                <a>{title}</a>
              </Link>
            )}
          </h3>
          <p>{short_desc}</p>
          <br />
          <div className="course-author d-flex align-items-center">
            <span>Created By: {`${first_name} ${last_name}`}</span>
          </div>
          <p>{short_desc}</p>
          <ul className="courses-box-footer d-flex justify-content-between align-items-center">
            <li>
              <i className="flaticon-agenda"></i> {lessons} Lessons
            </li>
            <li>
              <i className="flaticon-people"></i>{" "}
              {loading ? "loading..." : assignedStudents} Students
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;
