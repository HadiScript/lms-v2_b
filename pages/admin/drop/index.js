import AdminSideNav from "@/components/_App/AdminSideNav";
import Navbar from "@/components/_App/Navbar";
import baseUrl from "@/utils/baseUrl";
import GeneralLoader from "@/utils/GeneralLoader";
import { formatDate } from "@/utils/helper";
import axios from "axios";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Drops = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [dropedStudents, setDrops] = useState([]);
  const { elarniv_users_token } = parseCookies();

  const fetchDrops = async () => {
    setLoading(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(
        `${baseUrl}/api/users/delete/Drops`,
        payload
      );
      setDrops(response.data.DropStudent);
      setLoading(false);
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

  useEffect(() => {
    fetchDrops();
  }, []);

  return (
    <>
      <Navbar user={user} />

      <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            {/* sidebar */}
            <div className="col-lg-3 col-md-4">
              <AdminSideNav user={user} />
            </div>

            <div className="col-lg-9 col-md-8">
              <div className="main-content-box">
                <ul className="nav-style1">
                  <li>
                    <a className="active">Drop</a>
                  </li>
                </ul>

                {loading ? (
                  <GeneralLoader />
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle table-hover fs-14">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Enrolled Course</th>
                          <th scope="col">Joined</th>
                          <th scope="col">Drop at</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dropedStudents.length > 0 ? (
                          dropedStudents.map((user) => (
                            <tr key={user.id}>
                              <td>{`${user.stu_name} `}</td>
                              <td>{user.stu_email}</td>
                              <td>{user.course}</td>
                              <td>{formatDate(user.joining_date) }</td>
                              <td>{formatDate(user.created_at) }</td>
                              

                              
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center py-3">
                              Empty!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drops;
