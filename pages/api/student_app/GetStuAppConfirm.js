import studentsApplication from "@/database/models/studentsApplication";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    case "PUT":
      await handlePut(req, res);
      break;

    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGet = async (req, res) => {
  try {
    const students_apps = await studentsApplication.findAll({
      where: { approved: 1 },
    });

    res.status(200).json({ students_apps });
  } catch (e) {
    res.status(400).json({
      error_code: "get_students",
      message: e.message,
    });
  }
};

const handlePut = async (req, res) => {
  try {
    await studentsApplication.update(
      {
        registered: true,
      },
      {
        where: {
          id: req.body.userId,
        },
      }
    );

    res.status(200).json({ registered: true });
  } catch (e) {
    res.status(400).json({
      error_code: "get_students",
      message: e.message,
    });
  }
};
