import Footer from "@/components/_App/Footer";
import Navbar from "@/components/_App/Navbar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { parseCookies } from "nookies";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { useRouter } from "next/router";

const initVals = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
};

const Create = ({ user }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { elarniv_users_token } = parseCookies();

  // states
  const [batchName, setBatchName] = useState("");
  const [days, setDays] = useState(initVals);
  const [startingFrom, setStartingFrom] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [to, setTo] = useState("");
  const [course, setCourse] = useState("");

  //   fetching course
  const [courses, setCourses] = useState([]);
  const [loadingCourse, setLoadingCourse] = useState(true);

  const fetchDataCourse = async () => {
    setLoadingCourse(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(`${baseUrl}/api/admin/courses`, payload);
      // console.log(response.data.courses);
      setCourses(response.data.courses);
      //   setGiveCourse(response.data?.courses[0]?.title);
      setLoadingCourse(false);
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
      setLoadingCourse(false);
    }
  };

  useEffect(() => {
    fetchDataCourse();
  }, []);

  const payloadData = {
    ...days,
    batchName,
    startingFrom,
    _to: to,
    startingDate,
    endingDate,
    course,
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log(payloadData, "here is the data")
    return;
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.post(
        `${baseUrl}/api/batch/batch`,
        payloadData,
        payload
      );
      setLoading(false);
      toast.success("Batch has been created !");
      setBatchName("");
      setCourse("");
      setStartingFrom("");
      setTo("");
      setDays(initVals);
      router.push("/admin/batch/all/");
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

  return (
    <>
      <Navbar user={user} />

      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="login-form">
                <h2>Create batch</h2>

                <form onSubmit={(e) => submitForm(e)}>
                  <div className="form-group">
                    <label>
                      Batch name <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Batch Name"
                      name="batchName"
                      value={batchName}
                      onChange={(e) => setBatchName(e.target.value)}
                    />
                  </div>

                  <div className="row">
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

                  <div className="form-group">
                    <label>Assign Course</label>
                    <select
                      className="form-select"
                      value={course}
                      onChange={(e) => {
                        setCourse(e.target.value);
                      }}
                    >
                      {loadingCourse ? (
                        <>wait...</>
                      ) : (
                        <>
                          <option value="">choose</option>
                          {courses?.map((x) => (
                            <option key={x.id} value={x.id}>
                              {x.slug}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>

                  <motion.button
                    // onClick={handleSubmit}
                    type="submit"
                    // disabled={disabled}
                    whileTap={{ scale: 0.9 }}
                  >
                    Create
                    {loading ? <LoadingSpinner /> : ""}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Create;
