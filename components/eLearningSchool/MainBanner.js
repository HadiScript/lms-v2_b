import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BannerCourses from "./BannerCourses";

import { FcGraduationCap } from "react-icons/fc";

// import FunFacts from "./FunFacts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";

const MainBanner = ({ user, courses }) => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      const url = `${baseUrl}/api/testimonials`;
      const response = await axios.get(url);
      setTestimonials(response.data.testimonials);
    };
    fetchTests();
  }, []);

  return (
    <>
      <div className="main-banner">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="main-banner-content">
                <h1>The Future of Education, Brought to You by Cycarts LMS</h1>
                {/* <p>
                  Flexible easy to access learning opportunities can bring a
                  significant change in how individuals prefer to learn! The
                  eLearniv can offer you to enjoy the beauty of eLearning!
                </p> */}

                <motion.div whileTap={{ scale: 0.9 }}>
                  {user ? (
                    <Link href="/courses">
                      <a className="default-btn">
                        <i className="flaticon-user"></i> Browse Courses{" "}
                        <span></span>
                      </a>
                    </Link>
                  ) : (
                    <Link href="/authentication">
                      <a className="default-btn">
                        <i className="flaticon-user"></i> Join For Free{" "}
                        <span></span>
                      </a>
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="main-banner-courses-list">
                <div className="row">
                  <Swiper
                    pagination={{
                      dynamicBullets: true,
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper feedback-slides"
                  >
                    {testimonials.length > 0 &&
                      testimonials.map((teste) => (
                        <SwiperSlide key={teste.id}>
                          <div className="single-feedback-item">
                            <p>{teste.description}</p>

                            <div className="client-info d-flex align-items-center">
                              <img
                                src={teste.image_url}
                                className="rounded-circle"
                                alt="image"
                              />
                              <div className="title">
                                <h3>{teste.name}</h3>
                                <span>{teste.designation}</span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-6 col-md-12">
              <div className="main-banner-courses-list">
                <div className="row">
                  {courses &&
                    courses.map((course) => (
                      <BannerCourses key={course.id} {...course} />
                    ))}
                </div>

                <div className="banner-shape1">
                  <img src="/images/banner-shape1.png" alt="image" />
                </div>
                <div className="banner-shape2">
                  <imge
										src="/images/banner-shape2.png"
										alt="image"
									/>

                  <FcGraduationCap className="img" size={80} color="#661cab" />
                </div>
                <div className="banner-shape3">
                  <img src="/images/banner-shape3.png" alt="image" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
