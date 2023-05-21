import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { BiFolder, BiTrash } from "react-icons/bi";

const UploadAssignment = ({ id }) => {
  // console.log(id, "course id");
  const router = useRouter();
  const { elarniv_users_token } = parseCookies();

  const [folders, setFolders] = useState([]);

  const fetchFolders = async () => {
    const payload = {
      headers: { Authorization: elarniv_users_token },
    };
    const url = `${baseUrl}/api/folders/${id}`;
    const response = await axios.get(url, payload);
    // console.log(response.data.course, "from live page");
    setFolders(response.data.folders);
  };
  useEffect(() => {
    if (id) {
      fetchFolders();
    }
  }, [id]);

  return (
    <div className="">
      <div className="container my-5 ">
        <ul className="list-group list-group-flush " style={{ width: "60%" }}>
          {folders?.map((x) => (
            <li
              key={x.id}
              onClick={() =>
                router.push(`/learning/assignments/${x.folder_name}`)
              }
              className="list-group-item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <BiFolder color="green" size={30} />
              <span>{x.folder_name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadAssignment;
