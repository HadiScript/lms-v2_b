import AdminSideNav from "@/components/_App/AdminSideNav";
import Footer from "@/components/_App/Footer";
import Navbar from "@/components/_App/Navbar";
import GeneralLoader from "@/utils/GeneralLoader";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { parseCookies } from "nookies";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Index = ({ user }) => {
  const { elarniv_users_token } = parseCookies();
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const response = await axios.get(
        `${baseUrl}/api/coordinators/get`,
        payload
      );
      setCoordinators(response.data.coords);
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
    fetchData();
  }, []);

  return (
    <>
      <Navbar user={user} />

      <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <AdminSideNav user={user} />
            </div>

            <div className="col-lg-9 col-md-8">
              <div className="main-content-box">
                <ul className="nav-style1">
                  <li>
                    <a className="active">Coordinators</a>
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
                          <th scope="col">Phone</th>
                          <th scope="col">Joining date</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {coordinators.length > 0 ? (
                          coordinators.map((x, index) => (
                            <tr key={index}>
                              <td>{`${x.first_name} ${x.last_name}`}</td>
                              <td>{`${x.email}`} </td>
                              <td>{`${x.phone}`} </td>
                              <td>{`${x.created_at.slice(0, 10)}`} </td>
                              <td>
                                <span className="text-danger">delete</span>
                              </td>
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

      <Footer />
    </>
  );
};

export default Index;
