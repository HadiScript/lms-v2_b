import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageNavigation from "@/components/Instructor/PageNavigation";
import { useRouter } from "next/router";
import LiveForm from "@/components/Instructor/LiveForm";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import FolderForm from "@/components/Instructor/FolderForm";
import { BiFolder, BiTrash } from "react-icons/bi";
import { toast } from "react-hot-toast";

const Folders = ({ user }) => {
  const router = useRouter();
  const { id: courseId } = router.query;

  const { elarniv_users_token } = parseCookies();

  const [course, setCourse] = useState({});
  const [folders, setFolders] = useState([]);

  const fetchCourse = async () => {
    const payload = {
      headers: { Authorization: elarniv_users_token },
    };
    const url = `${baseUrl}/api/courses/course/live_link/${courseId}`;
    const response = await axios.get(url, payload);
    setCourse(response.data.course);
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchFolders = async () => {
    const payload = {
      headers: { Authorization: elarniv_users_token },
    };
    const url = `${baseUrl}/api/folders/${courseId}`;
    const response = await axios.get(url, payload);
    // console.log(response.data.course, "from live page");
    setFolders(response.data.folders);
  };
  useEffect(() => {
    fetchFolders();
  }, []);

  const handleDelete = async (folderID) => {
    // console.log(folderID, "id");
    // return;
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const url = `${baseUrl}/api/folders/delete/${folderID}`;
      await axios.delete(url, payload);
      fetchFolders()
      toast.success("folder deleted");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Navbar user={user} />
      folders
      <div className="ptb-100">
        <div className="container">
          <PageNavigation courseId={courseId} activeClassname="folders" />

          <div className="create-course-form">
            <FolderForm
              courseId={courseId}
              user={user}
              fetchFolders={fetchFolders}
            />
          </div>

          <div className="container my-5 ">
            <ul
              className="list-group list-group-flush "
              style={{ width: "60%" }}
            >
              {folders?.map((x) => (
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
                    onClick={() =>
                      router.push(`/learning/assignments/${x.folder_name}`)
                    }
                  >
                    <BiFolder color="green" size={30} />
                    <span>{x.folder_name}</span>
                    <br />
                    <span>{x.creator_id}</span>
                  </div>
                  <BiTrash
                    color="red"
                    cursor="pointer"
                    onClick={() => handleDelete(x.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Folders;
