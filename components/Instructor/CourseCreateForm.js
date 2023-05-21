import React, { useState, useEffect } from "react";

import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import LoadingSpinner from "@/utils/LoadingSpinner";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const INITIAL_VALUE = {
  title: "",
  courseDetailId: "",
};

const initDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
};

const CourseCreateForm = ({ btnText, teachers, user }) => {
  const { elarniv_users_token } = parseCookies();
  const [course, setCourse] = useState(INITIAL_VALUE);
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // batchs
  const [days, setDays] = useState(initDays);
  const [startingFrom, setStartingFrom] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [to, setTo] = useState("");

  // useEffect(() => {
  //   const isCourse = Object.values(course).every((el) => Boolean(el));
  //   isCourse ? setDisabled(false) : setDisabled(true);
  // }, [course]);

  // fetching course details
  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(
        `${baseUrl}/api/admin/courses/get_min_new_details`,
        // `${baseUrl}/api/categories`,
        payload
      );
      console.log("course details", response.data);
      setCourseDetails(response.data.courses);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, courseDetailId } = course;
    const payloadData = {
      title,
      userID: user.id,
      cdId: courseDetailId,
      ...days,
      startingFrom,
      _to: to,
      startingDate,
      endingDate,
    };

    // console.log(payloadData, "create course");
    // return;
    try {
      setLoading(true);

      // console.log("data", payloadData);
      // return;

      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const url = `${baseUrl}/api/courses/new`;
      const response = await axios.post(url, payloadData, payloadHeader);
      console.log(response.data, "from create course");
      setLoading(false);

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
      router.push(`/admin/courses/`);
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
      {/* {JSON.stringify(teachers)} */}

      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="login-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">
                      Batch Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Batch Title"
                      name="title"
                      value={course.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">
                      Select course
                    </label>
                    <select
                      className="form-select"
                      name="courseDetailId"
                      value={course.courseDetailId}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {courseDetails.length > 0 &&
                        courseDetails.map((x) => (
                          <option key={x.id} value={x.id}>
                            {x.title}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row pt-10">
                <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Conducting days <span className="text-danger">*</span>{" "}
                </label>
                <div className="col-lg-6 col-md-6">
                  <div className="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      value="monday"
                      checked={days.monday}
                      onChange={() =>
                        setDays((prev) => ({
                          ...prev,
                          ["monday"]: !days.monday,
                        }))
                      }
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Monday
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      value="tuesday"
                      checked={days.tuesday}
                      onChange={() =>
                        setDays((prev) => ({
                          ...prev,
                          ["tuesday"]: !days.tuesday,
                        }))
                      }
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Tuesday
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      value="wednesday"
                      checked={days.wednesday}
                      onChange={() =>
                        setDays((prev) => ({
                          ...prev,
                          ["wednesday"]: !days.wednesday,
                        }))
                      }
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Wednesday
                    </label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      value="thursday"
                      checked={days.thursday}
                      onChange={() =>
                        setDays((prev) => ({
                          ...prev,
                          ["thursday"]: !days.thursday,
                        }))
                      }
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Thursday
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      value="friday"
                      checked={days.friday}
                      onChange={() =>
                        setDays((prev) => ({
                          ...prev,
                          ["friday"]: !days.friday,
                        }))
                      }
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Friday
                    </label>
                  </div>
                </div>
              </div>

              <div className="row pt-5">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>
                      Starting from <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="9am"
                      name="startingFrom"
                      value={startingFrom}
                      onChange={(e) => setStartingFrom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>
                      To <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="11am"
                      name="to"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row pt-5">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>
                      Starting Date <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="startingDate"
                      value={startingDate}
                      onChange={(e) => setStartingDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>
                      Ending Date <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="endingDate"
                      value={endingDate}
                      onChange={(e) => setEndingDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row my-5">
                <div className="col-12">
                  <button
                    type="submit"
                    className="default-btn"
                    // disabled={disabled}
                  >
                    <i className="flaticon-right-arrow"></i>
                    {btnText || "Create Batch"} <span></span>
                    {loading ? <LoadingSpinner /> : ""}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CourseCreateForm;
