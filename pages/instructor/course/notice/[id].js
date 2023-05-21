import PageNavigation from "@/components/Instructor/PageNavigation";
import Footer from "@/components/_App/Footer";
import Navbar from "@/components/_App/Navbar";
import LoadingSpinner from "@/utils/LoadingSpinner";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Notice = ({ user }) => {
  const { id } = useRouter().query;

  const { elarniv_users_token } = parseCookies();
  const [notice, setNotice] = useState();
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState("");

  const fetchNotice = async () => {
    const payload = {
      headers: { Authorization: elarniv_users_token },
    };
    const url = `${baseUrl}/api/courses/course/notice/${id}`;
    const response = await axios.get(url, payload);
    // console.log(response.data.courseNoticed, "from notice page");
    setNotice(response.data.courseNoticed);
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  useEffect(() => {
    if (notice) {
      setText(notice[0]?.text);
      setHeading(notice[0]?.heading);
      setVariant(notice[0]?.variant);
    }
  }, [notice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading || !text || !variant) {
      return toast.error("All fields are requried*");
    }

    try {
      setLoading(true);
      const payloadData = {
        text,
        heading,
        variant,
      };

      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const url = `${baseUrl}/api/courses/course/notice/${id}`;
      const response = await axios.put(url, payloadData, payloadHeader);
      //   console.log(response, "from live form");
      setLoading(false);
      fetchNotice();
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      let {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const url = `${baseUrl}/api/courses/course/live_link/${id}`;
      const response = await axios.delete(url, payloadHeader);
      //   console.log(response, "from live form");
      setLoading(false);
      fetchNotice();

      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      let {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });


  return (
    <>
      <Navbar user={user} />
      <div className="ptb-100">
        <div className="container">
          <PageNavigation courseId={id} activeClassname="notice" />

          <div className="create-course-form">
            <div className="row">
              {notice && (
                <div class={`alert alert-${notice[0]?.variant}`} role="alert">
                  <h4 class="alert-heading">{notice[0]?.heading}</h4>
                  <p>{notice[0]?.text}</p>
                  <hr />
                  <p class="mb-0">{notice[0]?.created_at}</p>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">Heading</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Lecture 2 will be conducted on XX-XX-XXXX"
                      name="heading"
                      value={heading}
                      onChange={(e) => setHeading(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label fw-semibold">Text</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="type..."
                      name="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label fw-semibold">Variant</label>
                    <select
                      required
                      className="form-select"
                      value={variant}
                      onChange={(e) => {
                        setVariant(e.target.value);
                      }}
                    >
                      <option value="">Choose</option>
                      <option value="info">
                        Info - Light Blue (mostly used)
                      </option>
                      <option value="danger">Red</option>
                      <option value="success">Green</option>
                      <option value="warning">Yellow</option>
                    </select>
                  </div>

                  <button type="submit" className="default-btn">
                    <i className="flaticon-right-arrow"></i>
                    Update <span></span>
                    {loading ? <LoadingSpinner /> : ""}
                  </button>

                  <span
                    className="text-danger mx-2"
                    onClick={(e) => handleDelete(e)}
                  >
                    Delete
                  </span>
                </div>

                <div className="col-md-6">
                  <div class={`alert alert-${variant}`} role="alert">
                    <h4 class="alert-heading">{heading}</h4>
                    <p>{text}</p>
                    <hr />
                    <small class="mb-0">
                      {/* {formattedDate} | {formattedTime} */}
                    </small>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Notice;
