import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/_App/Footer";
import Navbar from "@/components/_App/Navbar";
import React from "react";
import { Link } from "next/link";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/utils/LoadingSpinner";

const INITIAL_USER = {
  firstName: "hadi",
  lastName: "raza",
  email: "hadi@gmail.com",
  phoneNumber: "0322222222",
  idCard: "2222222222",
  address: "karachi",
  city: "karachi",
  dateOfBirth: "",

  parentName: "",
  parentOccupations: "",
  parentPhoneNumber: "",

  interest: "",
  wantToAchieve: "",
};

const students = ({ user }) => {
  const [gender, setGender] = React.useState("");
  const [education, setEducation] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [userReq, setUserReq] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const isUser = Object.values(userReq).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [userReq]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserReq((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    setGender(event.target.value);
  };

  const data = {
    ...userReq,
    gender,
    course,
    education,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(data, "here is req");

    try {
      setLoading(true);
      const url = `${baseUrl}/api/student_app/postApplications`;
      const payload = { ...data };
      const response = await axios.post(url, payload);
      console.log(response);
      // handleLogin(response.data.elarniv_users_token, router);
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

      {/* <PageBanner
        pageTitle="Application for enroll"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Application"
      /> */}

      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="login-form">
                <h2>Application</h2>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <label>
                          First Name <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          name="firstName"
                          value={userReq.firstName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          last Name <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="last Name"
                          name="lastName"
                          value={userReq.lastName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Email <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="example@gmail.com"
                          name="email"
                          value={userReq.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            value="female"
                            checked={gender === "female"}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Female
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value="male"
                            checked={gender === "male"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value="other"
                            checked={gender === "other"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Other
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          Address <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="last Name"
                          name="address"
                          value={userReq.address}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          City <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="last Name"
                          name="city"
                          value={userReq.city}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Date of birth <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="last Name"
                          name="dateOfBirth"
                          value={userReq.dateOfBirth}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Phone no# <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="03XX-XXXXXXX"
                          name="phoneNumber"
                          value={userReq.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          CNIC <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="XXXXXXXXXXXX"
                          name="idCard"
                          value={userReq.idCard}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <label>
                          Parents Name <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Parents Name"
                          name="parentName"
                          value={userReq.parentName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Occupation <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Occupation"
                          name="parentOccupations"
                          value={userReq.parentOccupations}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Phone no# <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Occupation"
                          name="parentPhoneNumber"
                          value={userReq.parentPhoneNumber}
                          onChange={handleChange}
                        />
                      </div>

                      <hr />

                      <div className="form-group">
                        <label>
                          Your interest <span className="text-danger">*</span>{" "}
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Occupation"
                          name="interest"
                          value={userReq.interest}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Education</label>
                        <select
                          className="form-select"
                          value={education}
                          onChange={(e) => {
                            setEducation(e.target.value);
                          }}
                        >
                          <option value="">choose</option>
                          <option value="matrix">matrix</option>
                          <option value="2ndyear">NodeJs</option>
                          <option value="bachelor">Design</option>
                          <option value="masters">Design</option>
                          <option value="mPhil">Design</option>
                          <option value="phd">Design</option>
                        </select>
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
                          <option value="">choose</option>
                          <option value="reactjs">ReactJs</option>
                          <option value="nodejs">NodeJs</option>
                          <option value="design">Design</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Your interest <span className="text-danger">*</span>{" "}
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Occupation"
                          name="wantToAchieve"
                          value={userReq.wantToAchieve}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <motion.button
                      onClick={handleSubmit}
                      type="submit"
                      // disabled={disabled}
                      whileTap={{ scale: 0.9 }}
                    >
                      Log In
                      {/* {loading ? <LoadingSpinner /> : ""} */}
                    </motion.button>
                  </div>
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

export default students;
