import React from "react";
import { secondsToHms } from "@/utils/helper";

const VideoList = ({ id, title, short_id, link, completed, activeClass }) => {
  return (
    <li
      className={activeClass === id ? "active" : ""}
      // onClick={() => onPlay(id)}
    >
      {short_id}. {title}
      <span className="d-flex align-items-start gap-3  fs-16 mt-1">
        {!completed ? (
          <span className="text-secondary">
           {link}
          </span>
        ) : (
          <span> completed </span>
        )}
      </span>
    </li>
  );
};

export default VideoList;
