import React from "react";

const StudentsRaw = ({
  id,
  first_name,
  last_name,
  email,
  phone,
  bio,
  my_course,
  email_confirmed,
  role,
  onAdmin = null,
  loadingCourse,
  courses,
  giveCourse,
  setGiveCourse,
}) => {
  return (
    <tr>
      <td>{`${first_name} ${last_name}`}</td>
      <td>{email}</td>
      <td>{phone ? phone : "N/A"}</td>
      <td>{email_confirmed ? "Yes" : "No"}</td>

      <td>
        {/* <button
          type="button"
          className="btn btn-success btn-sm fs-12 ms-2"
          //   onClick={() => onAdmin(id)}
        > */}
        <div className="form-group" name="gender">
          <select
            className="form-select"
            value={giveCourse}
            onChange={(e) => {
              setGiveCourse(e.target.value);
              onAdmin(id);
            }}
          >
            {loadingCourse ? (
              <>wait...</>
            ) : (
              <>
                {courses?.map((x) => (
                  <option key={x.id} value={x.slug}>
                    {x.slug}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        {/* </button> */}

        {/* <button
					type="button"
					className="btn btn-success btn-sm fs-12 ms-2"
					onClick={() => onAdmin(id)}
				>
					{role == "admin" ? "Remove from admin" : "Make An Admin"}
				</button> */}
      </td>
      <td>{my_course}</td>
    </tr>
  );
};

export default StudentsRaw;
