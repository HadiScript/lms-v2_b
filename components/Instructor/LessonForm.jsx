import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import LoadingSpinner from "@/utils/LoadingSpinner";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const INITIAL_VALUE = {
  group_name: "",
  title: "",
  link: "",
  short_id: 0,
  courseId: "",
};

const UploadLessonForm = ({ courseId }) => {
  const { elarniv_users_token } = parseCookies();
  const [lesson, setLesson] = useState(INITIAL_VALUE);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    setLesson((prevState) => ({ ...prevState, courseId }));
  }, []);

  useEffect(() => {
    let { group_name, title, courseId, link } = lesson;
    const isVideo = Object.values({
      group_name,
      title,
      courseId,
    }).every((el) => Boolean(el));
    isVideo ? setDisabled(false) : setDisabled(true);
  }, [lesson]);

  const handleChange = (e) => {
    setLesson((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { group_name, title, short_id, courseId, link } = lesson;
    // console.log(lesson, "from lesson upload");
    // return;
    try {
      setLoading(true);

      const { group_name, title, short_id, courseId, link } = lesson;

      const payloadData = {
        group_name,
        title,
        link,
        short_id,
        courseId,
      };
      const url = `${baseUrl}/api/courses/course/lesson/new`;
      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const response = await axios.post(url, payloadData, payloadHeader);

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

      setLoading(false);

      router.push(`/instructor/course/lessonEdits/${courseId}`);
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Lesson Group Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Group Title"
              name="group_name"
              value={lesson.group_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Lesson Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Video Title"
              name="title"
              value={lesson.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">
              Lesson Order Number (Ascending)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Group Title"
              name="short_id"
              value={lesson.short_id}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Short Descriptions</label>
            <input
              type="text"
              className="form-control"
              placeholder="Short Descriptions"
              name="link"
              value={lesson.link}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Completed</label>
            <input
              type="checkbox"
              className="form-control"
              placeholder="Group Title"
              name="link"
              value={lesson.activeLine}
              onChange={handleChange}
            />
          </div>
        </div> */}

        <div className="col-12">
          <button
            type="submit"
            className="default-btn"
            disabled={loading || disabled}
          >
            <i className="flaticon-right-arrow"></i>
            Upload Lesson <span></span>
            {loading && <LoadingSpinner />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadLessonForm;
