import { User } from "database/models";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    case "PUT":
      await handlePut(req, res);
      break;

    case "DELETE":
      await handleDelete(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGet = async (req, res) => {
  try {
    const admins = await User.findAll({
      order: [["created_at", "DESC"]],
      where: {
        role: "admin",
      },
    });

    res.status(200).json({ admins });
  } catch (e) {
    res.status(400).json({
      error_code: "get_courses_for_approve",
      message: e.message,
    });
  }
};

const handlePut = async (req, res) => {
  try {
    const { userId, course } = req.body;

    if (course) {
      const thisUser = await User.update(
        {
          my_course: course,
        },
        { where: { id: userId } }
      );

      console.log(thisUser.my_course, "from this make admin function");
      res.status(200).json({ message: "This course has been given" });
    }
    // } else {
    //   await User.update(
    //     {
    //       role: "student",
    //     },
    //     { where: { id: userId } }
    //   );
    //   res.status(200).json({ message: "Removed from admin" });
    // }
  } catch (e) {
    res.status(400).json({
      error_code: "make_admin",
      message: e.message,
    });
  }
};

const handleDelete = async (req, res) => {
  console.log("touched from delete function from the backend");
  try {
    const { userID } = req.body;

    if (userID) {
      await User.delete({ where: { id: userID } });
      res.status(200).json({ message: "User has been deleted" });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "User Deletion",
      message: e.message,
    });
  }
};
