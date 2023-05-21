import React from "react";

const CourseOverview = ({ overview, desc, whatYouLearn }) => {
  return (
    <div className="courses-details-desc-style-two">
      <h3>Overview</h3>
      <div dangerouslySetInnerHTML={{ __html: overview }}></div>
      <hr />
      <h3>Short Description</h3>
      <div dangerouslySetInnerHTML={{ __html: desc }}></div>
      <hr />
      <h3>What you will learn?</h3>
      <div dangerouslySetInnerHTML={{ __html: whatYouLearn }}></div>
    </div>
  );
};

export default CourseOverview;
