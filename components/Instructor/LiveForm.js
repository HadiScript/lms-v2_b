import React, { useState, useEffect } from "react";
import controls from "@/utils/RTEControl";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import LoadingSpinner from "@/utils/LoadingSpinner";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const LiveForm = ({ courseId, live }) => {
  const { elarniv_users_token } = parseCookies();
  const [liveLink, setLiveLink] = useState();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    live && setLiveLink(live);
  }, live);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payloadData = {
        liveLink,
      };

      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const url = `${baseUrl}/api/courses/course/live_link/${courseId}`;
      const response = await axios.put(url, payloadData, payloadHeader);
      console.log(response, "from live form");
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

      //   router.push(`/instructor/courses`);
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
    //   setLoading(true);

      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const url = `${baseUrl}/api/courses/course/live_link/${courseId}`;
      const response = await axios.delete(url, payloadHeader);
      //   console.log(response, "from live form");
    //   setLoading(false);

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

      //   router.push(`/instructor/courses`);
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
    //   setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Link</label>
            <input
              type="text"
              className="form-control"
              placeholder="past link here"
              name="duration"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="default-btn">
            <i className="flaticon-right-arrow"></i>
            Update <span></span>
            {loading ? <LoadingSpinner /> : ""}
          </button>

          <span className="text-danger mx-2" onClick={(e) => handleDelete(e)}>
            Delete
          </span>
        </div>
      </div>
    </form>
  );
};

export default LiveForm;
