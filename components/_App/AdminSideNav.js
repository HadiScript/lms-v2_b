import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import StickyBox from "react-sticky-box";
import { motion } from "framer-motion";

const AdminSideNav = ({ user }) => {
  const isAdmin = user.role === "admin";

  const isCord = user.role === "cord";

  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (!isAdmin && !isCord) {
      router.replace("/");
    }
  }, [user]);

  // Sidebar Nav
  const [isActiveSidebarNav, setActiveSidebarNav] = useState("false");
  const handleToggleSidebarNav = () => {
    setActiveSidebarNav(!isActiveSidebarNav);
  };

  return (
    <>
      {/* For mobile device */}
      <div className="text-end d-md-none">
        <div className="sidebar-menu-button" onClick={handleToggleSidebarNav}>
          Sidebar Menu
        </div>
      </div>

      <div className={`side-nav-wrapper ${isActiveSidebarNav ? "" : "active"}`}>
        <StickyBox className="sticky-box" offsetTop={50} offsetBottom={20}>
          {/* Close button */}
          <div className="close d-md-none" onClick={handleToggleSidebarNav}>
            <i className="bx bx-x"></i>
          </div>

          {/* Nav */}
          <div className="side-nav">
            <ul>
              {/* Dashboard */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/">
                  <a className={currentRoute === "/admin" ? "active" : ""}>
                    Dashboard
                  </a>
                </Link>
              </motion.li>

              {/* Courses */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/courses/">
                  <a
                    className={
                      currentRoute === "/admin/courses" ||
                      currentRoute === "/admin/courses/new-arrival"
                        ? "active"
                        : ""
                    }
                  >
                    Courses
                  </a>
                </Link>
              </motion.li>

                {/* Courses */}
                <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/courses/courses_new/">
                  <a
                    className={
                      currentRoute === "/admin/courses/courses_new" ||
                      currentRoute === "/admin/courses/new-arrival_new"
                        ? "active"
                        : ""
                    }
                  >
                    Courses new
                  </a>
                </Link>
              </motion.li>

              {/* Instructors */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/instructor/">
                  <a
                    className={
                      currentRoute === "/admin/instructor" ||
                      currentRoute === "/admin/instructor/requests"
                        ? "active"
                        : ""
                    }
                  >
                    Instructors
                  </a>
                </Link>
              </motion.li>

              {/* Students */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/students/">
                  <a
                    className={
                      currentRoute === "/admin/students" ||
                      currentRoute === "/admin/students/site-admins"
                        ? "active"
                        : ""
                    }
                  >
                    Students
                  </a>
                </Link>
              </motion.li>

              {/* student coordinators */}
              {isAdmin && (
                <motion.li
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Link href="/admin/coordinators/">
                    <a
                      className={
                        currentRoute === "/admin/coordinators" ? "active" : ""
                      }
                    >
                      Coordinators
                    </a>
                  </Link>
                </motion.li>
              )}

              {/* Drops */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/drop">
                  <a className={currentRoute === "/admin/drop" ? "active" : ""}>
                    Drops
                  </a>
                </Link>
              </motion.li>

              {/* Categories */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/categories/">
                  <a
                    className={
                      currentRoute === "/admin/categories" ||
                      currentRoute === "/admin/categories/create"
                        ? "active"
                        : ""
                    }
                  >
                    Categories
                  </a>
                </Link>
              </motion.li>

              {/* Coupons */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/Modal/">
                  <a
                    className={
                      currentRoute === "/admin/Modal" ||
                      currentRoute === "/admin/Modal/"
                        ? "active"
                        : ""
                    }
                  >
                    Set Modal
                  </a>
                </Link>
              </motion.li>

              {/* course creation */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/instructor/course/create">
                  <a
                    className={
                      currentRoute === "/instructor/course/create" ||
                      currentRoute === "/instructor/course/create"
                        ? "active"
                        : ""
                    }
                  >
                    Create Course
                  </a>
                </Link>
              </motion.li>

               {/* course details creation */}
               <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/instructor/course/create_new">
                  <a
                    className={
                      currentRoute === "/instructor/course/create_new" ||
                      currentRoute === "/instructor/course/create_new"
                        ? "active"
                        : ""
                    }
                  >
                    Create Course details
                  </a>
                </Link>
              </motion.li>

              {/* Create User */}
              {isAdmin && (
                <motion.li
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Link href="/admin/register/studentForm/">
                    <a
                      className={
                        currentRoute === "/admin/register/studentForm" ||
                        currentRoute === "/admin/register/studentForm"
                          ? "active"
                          : ""
                      }
                    >
                      Create User
                    </a>
                  </Link>
                </motion.li>
              )}

              {/* for both student coordinators and also for admins */}
              {/* aaplication revieved from form */}

              {/* all Batchs */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/batch/all">
                  <a
                    className={
                      currentRoute === "/admin/batch/all" ? "active" : ""
                    }
                  >
                    Batches
                  </a>
                </Link>
              </motion.li>

              {/* Create Batch */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/batch/create">
                  <a
                    className={
                      currentRoute === "/admin/batch/create" ? "active" : ""
                    }
                  >
                    Create Batch
                  </a>
                </Link>
              </motion.li>

              {/* applications */}
              <motion.li
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link href="/admin/students/applications/pending">
                  <a
                    className={
                      currentRoute === "/admin/students/applications/pending"
                        ? "active"
                        : ""
                    }
                  >
                    Applications
                  </a>
                </Link>
              </motion.li>

              {/* Create User as Student */}
              {isCord && (
                <motion.li
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Link href="/admin/register/StuFormByCord/">
                    <a
                      className={
                        currentRoute === "/admin/register/StuFormByCord" ||
                        currentRoute === "/admin/register/StuFormByCord"
                          ? "active"
                          : ""
                      }
                    >
                      Create User as Student
                    </a>
                  </Link>
                </motion.li>
              )}

              {/* St. Cordinators */}
              {isAdmin && (
                <motion.li
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Link href="/admin/register/studentForm/">
                    <a
                      className={
                        currentRoute === "/admin/register/studentForm" ||
                        currentRoute === "/admin/register/studentForm"
                          ? "active"
                          : ""
                      }
                    >
                      St. Cordinators
                    </a>
                  </Link>
                </motion.li>
              )}
            </ul>
          </div>
        </StickyBox>
      </div>
    </>
  );
};

export default AdminSideNav;
