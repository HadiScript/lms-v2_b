import User from "@/database/models/user";
import StudentBatches from "database/models/studentBatches";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "POST":
      await handlePost(req, res);
      break;

    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handlePost = async (req, res) => {
  const { userId, batchId, studentName, batch_course_name } = req.body;

  try {
    let checkId = userId + batchId;
    const exist = await StudentBatches.findAll({
      where: { checkId },
    });

    console.log(exist.length === 0, "yes zero");

    if (exist.length !== 0) {
      return res.status(400).json({
        message: `${studentName} is already assigned to this batch`,
      });
    } else {
      const studentUpdates = await User.findOne({ where: { id: userId } });

      if (studentUpdates.batchAssigned === 0) {
        studentUpdates.batchAssigned = 1;
        studentUpdates.batchCourse1 = batch_course_name;
        studentUpdates.save();
      } else if (
        studentUpdates.batchAssigned === 1 &&
        studentUpdates.batchCourse1 !== batch_course_name
      ) {
        studentUpdates.batchAssigned = 2;
        studentUpdates.batchCourse2 = batch_course_name;
        studentUpdates.save();
      } else if (
        studentUpdates.batchAssigned === 1 &&
        studentUpdates.batchCourse1 === batch_course_name
      ) {
        return res.status(400).json({
          message: `${studentName} is already have ${batch_course_name}`,
        });
      } else if (studentUpdates.batchAssigned === 2) {
        return res.status(400).json({
          message: `${studentName} is already have 2 batches`,
        });
      }
      const newAssignments = await StudentBatches.create({
        userId,
        batchId,
        checkId,
        studentName,
      });

      res.status(200).json({
        message: "Student has been added to this batche",
        added: newAssignments,
      });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "student_batch",
      message: e.message,
    });
  }
};
