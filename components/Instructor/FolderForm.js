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

const FolderForm = ({ courseId, user, fetchFolders }) => {
  const { elarniv_users_token } = parseCookies();
  const [folder_name, setFolder_name] = useState("");

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payloadData = {
        creator_id : user?.id,
        creator_name : user?.name,
        folder_name,
        course_id : courseId
      };

      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const url = `${baseUrl}/api/folders/Create`;
      const response = await axios.post(url, payloadData, payloadHeader);
      fetchFolders()
      setLoading(false);
      setFolder_name("")
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
        {/* {JSON.stringify(user)} */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Create Folder"
              name="duration"
              value={folder_name}
              onChange={(e) => setFolder_name(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12">
          <span className="text-success mx-2" onClick={(e) => handleSubmit(e)}>
            Create {loading && "loading..."}
          </span>
        </div>
      </div>
    </form>
  );
};

export default FolderForm;
