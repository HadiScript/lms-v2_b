import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiSend } from "react-icons/bi";

const CourseDiscussion = ({ id, user }) => {
  const { elarniv_users_token } = parseCookies();

  const [messageInput, setMessageInput] = useState("");
  const [allMsgs, setAllMsgs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllComments = async () => {
    const payload = {
      headers: { Authorization: elarniv_users_token },
    };
    const url = `${baseUrl}/api/comments/${id}`;
    const { data } = await axios.get(url, payload);
    setAllMsgs(data.msgs);
  };

  useEffect(() => {
    if (id) fetchAllComments();
  }, [id]);

  const postComment = async (e) => {
    e.preventDefault();
    if (!messageInput) {
      toast.error("please type something...");
      return;
    }
    try {
      setLoading(true);
      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const url = `${baseUrl}/api/comments/${id}`;
      const response = await axios.post(
        url,
        { text: messageInput, userId: user.id },
        payloadHeader
      );
      setLoading(false);
      setMessageInput("");
      setAllMsgs([...allMsgs, response.data.msgs]);
      fetchAllComments();
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

  const deleteComment = async (commentID) => {
    try {
      setLoading(true);
      const payloadHeader = {
        headers: { Authorization: elarniv_users_token },
      };

      const url = `${baseUrl}/api/comments/delete/${commentID}`;
      const response = await axios.delete(url, payloadHeader);
      setLoading(false);
      toast.success("msg deleted");
      // setAllMsgs([...allMsgs, response.data.msgs]);
      fetchAllComments();
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
    <div className="courses-details-desc-style-two">
      <div className="row justify-content-center">
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
            height: " 600px",
            border: "1px solid #ddd",
            borderRadius: " 5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{ flex: 1, padding: "10px", overflowY: "scroll" }}
            // ref={listRef}
          >
            {allMsgs.length > 0 &&
              allMsgs.map((x, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: `#f2f2f2`,
                    padding: "10px",
                    margin: "5px 0",
                    borderRadius: "5px",
                    maxWidth: "100%",
                    //   alignSelf: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",

                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src="/images/avatar.jpg"
                        style={{ borderRadius: "50%", height: "60px" }}
                      />
                      <div>
                        <span>
                          {x && x.User && (
                            <>
                              {x.User.role === "instructor" ||
                              x.User.role === "cord" ? (
                                "Admin"
                              ) : (
                                <>
                                  {x.User.first_name} {x.User.last_name}
                                </>
                              )}
                            </>
                          )}
                        </span>
                        <br />
                        <small style={{ fontSize: "10px" }}>
                          {x && x.created_at && x.created_at.substring(0, 10)}
                        </small>
                      </div>
                    </div>
                    {x && x.User && (
                      <>
                        {x.user_id === user.id && (
                          <small
                            className="text-danger"
                            onClick={() => deleteComment(x.id)}
                          >
                            delete
                          </small>
                        )}{" "}
                      </>
                    )}
                  </div>
                  <p style={{ marginLeft: "70px" }}> {x && x.text} </p>
                </div>
              ))}
          </div>

          <form onSubmit={(e) => postComment(e)}>
            <div
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                borderTop: "1px solid #ddd",
              }}
            >
              <textarea
                className="form-controll"
                style={{ width: "95%", padding: "5px" }}
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(event) => setMessageInput(event.target.value)}
              />
              <span type="submit" onClick={postComment}>
                <BiSend size={30} color="green" />
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseDiscussion;
