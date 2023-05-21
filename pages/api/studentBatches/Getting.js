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
  const { userId, batchId, fromID } = req.body;
  console.log(req.body, "here i s");
  try {
    if (fromID === "userID") {
      const studentHavingBatches = await StudentBatches.findAll({
        where: { userId },
      });

      return res.status(200).json({
        message: "student_batches",
        stuBatches: studentHavingBatches,
        stuBatchesNumber: studentHavingBatches.length,
      });
    } else if (fromID === "batchID") {
      const batchHavingStudents = await StudentBatches.findAll({
        where: { batchId },
      });

      return res.status(200).json({
        message: "student_batches",
        BatchStudents: batchHavingStudents,
        BatcheStudentsNumber: batchHavingStudents.length,
      });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "student_batch",
      message: e.message,
    });
  }
};
