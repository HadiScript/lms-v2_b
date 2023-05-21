import React from "react";
import { BiTrash } from "react-icons/bi";

const CourseVideos = ({
  id: videoId,
  title,
  short_id,
  completed,
  onDelete,
  onEdit,
}) => {
  return (
    <li className="list-group-item" style={{ width: "50%" }}>
      <span className="">
        {short_id}_ {title}
      </span>
      <div className="d-flex align-items-center justify-content-between ">
        <span onClick={() => onEdit(videoId)} className="text-primary fs-10">
          {!completed ? "incompleted" : "completed"}
        </span>
        <br />
        <span onClick={() => onDelete(videoId)} className="text-danger fs-8">
          <BiTrash />
        </span>
      </div>
    </li>
  );
};

export default CourseVideos;
