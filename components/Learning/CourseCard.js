import React from "react";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

const CourseCard = ({ details, user, slug }) => {
  const { image, title, is_class, short_desc } = details;
  console.log(details, "in card");
  return (
    <div className="col-lg-4 col-md-6">
      <div className="single-courses-box style-2">
        <div className="courses-content">
          <h3>
            {is_class ? (
              <Link href={`/learning/course/class/${slug}`}>
                <a>{title}</a>
              </Link>
            ) : (
              <Link href={`/learning/student/${slug}`}>
                <a>{title}</a>
              </Link>
            )}
          </h3>

          <p>{short_desc.substring(0, 100)}...</p>

          <div className="course-author d-flex align-items-center">
            <span>E-mail : <a href="mailto:cord@hadielearning.com" target="_blank">{`${user.first_name} ${user.last_name}`}</a></span>
          </div>

          <p>
            Go <BiRightArrowAlt />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
