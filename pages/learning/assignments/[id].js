import Navbar from "@/components/_App/Navbar";
import baseUrl from "@/utils/baseUrl";
import LoadingSpinner from "@/utils/LoadingSpinner";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiFile } from "react-icons/fi";

const INITIAL_VALUE = {
  lecture_name: "",
  lecture_file: "",
};

const AssignmentsFiles = ({ user }) => {
  const {
    query: { id },
  } = useRouter();

  const [allAssignments, setAllAssignments] = useState([]);

  const { elarniv_users_token } = parseCookies();
  const [asset, setAsset] = useState(INITIAL_VALUE);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAsset = Object.values(asset).every((el) => Boolean(el));
    isAsset ? setDisabled(false) : setDisabled(true);
  }, [asset]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    let fileSize;
    if (name === "lecture_file") {
      fileSize = files[0].size / 1024 / 1024;
      if (fileSize > 5) {
        toast.error(
          "The file size greater than 5 MB. Make sure less than 5 MB.",
          {
            style: {
              border: "1px solid #ff0033",
              padding: "16px",
              color: "#ff0033",
            },
            iconTheme: {
              primary: "#ff0033",
              secondary: "#FFFAEE",
            },
          }
        );
        e.target.value = null;
        return;
      }
      setAsset((prevState) => ({
        ...prevState,
        lecture_file: files[0],
      }));
    } else {
      setAsset((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleAssetUpload = async () => {
    const data = new FormData();
    data.append("file", asset.lecture_file);
    data.append("upload_preset", process.env.UPLOAD_PRESETS);
    data.append("cloud_name", process.env.CLOUD_NAME);
    let response;
    if (asset.lecture_file) {
      response = await axios.post(process.env.CLOUDINARY_ZIP_URL, data);
    }

    const assetUrl = response.data.url;

    return assetUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let assetUrl = "";
      if (asset.lecture_file) {
        const assetUpload = await handleAssetUpload();
        assetUrl = assetUpload.replace(/^http:\/\//i, "https://");
      }

      const payloadData = {
        lecture_name: asset.lecture_name,
        lecture_file: assetUrl,
        stu_name: user.first_name + " " + user.last_name,
        stu_id: user.id,
        folder_id: id,
      };

      const url = `${baseUrl}/api/folders/students/`;
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
      fetchingAssignments();

      setLoading(false);
    } catch (err) {
      // console.log(err.response.data);

      let message;
      if (err.response.data.error) {
        message = err.response.data.error.message;
      } else {
        message = err.response.data.message;
      }

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

  const fetchingAssignments = async () => {
    const payload = {
      headers: { Authorization: elarniv_users_token },
    };
    const url = `${baseUrl}/api/folders/students/${id}`;
    const response = await axios.get(url, { folder_id: id }, payload);
    // console.log(response.data.course, "from live page");
    setAllAssignments(response.data.assignments);
  };

  useEffect(() => {
    fetchingAssignments();
  }, [id]);

  const fileDelete = async (fileId) => {
    try {
      setLoading(true);

      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const url = `${baseUrl}/api/folders/file/${fileId}`;
      const response = await axios.delete(url, payload);

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
      fetchingAssignments();

      setLoading(false);
    } catch (err) {
      console.log(err);

      let message;
      if (err.response.data.error) {
        message = err.response.data.error.message;
      } else {
        message = err.response.data.message;
      }

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
      <div className="ptb-100">
        <div className="container">
          <div className="row ">
            <h2>{id}</h2>
            <hr />
          </div>

          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                {/* file name */}
                <div className="form-group">
                  <label className="form-label fw-semibold">File name</label>
                  <input
                    type="text"
                    placeholder="Enter your file name"
                    className="form-control file-control"
                    name="lecture_name"
                    onChange={handleChange}
                    required={true}
                  />
                </div>

                {/* upload files */}
                <div className="form-group">
                  <label className="form-label fw-semibold">
                    Select Asset/File
                  </label>
                  <input
                    type="file"
                    className="form-control file-control"
                    name="lecture_file"
                    onChange={handleChange}
                    required={true}
                  />
                  <div className="form-text">
                    Upload file size less than or equal 5MB!
                  </div>
                </div>

                {/* upload files button */}
                <button
                  type="submit"
                  className="default-btn"
                  disabled={loading || disabled}
                >
                  <i className="flaticon-right-arrow"></i>
                  Upload Asset <span></span>
                  {loading && <LoadingSpinner />}
                </button>
              </form>
            </div>

            <div className="col-md-6 ">
              <h2>Uploaded Assignments</h2>
              <ul className="list-group list-group-flush ">
                {allAssignments?.map((x) => (
                  <li
                    key={x.id}
                    className="list-group-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <FiFile color="green" size={30} />
                      <span
                        onClick={() => {
                          if (
                            x.stu_id === user.id ||
                            user.role === "instructor"
                          ) {
                            window.open(x.file);
                          }
                        }}
                      >
                        {x.file_name} by {x.stu_name}
                      </span>
                      <br />
                      <span>{x.created_at.substring(0, 10)}</span>
                      {(x.stu_id === user.id || user.role === "instructor") && (
                        <span
                          className="text-danger"
                          onClick={() => fileDelete(x.id)}
                        >
                          delete
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentsFiles;
