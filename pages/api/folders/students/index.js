import Assignments from "@/database/models/assignments";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await upload_a_file(req, res);
      break;
    case "GET":
      await handleGet(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const upload_a_file = async (req, res) => {
  const { stu_id, folder_id, stu_name, lecture_name, lecture_file } = req.body;

  console.log(
    stu_id,
    folder_id,
    stu_name,
    lecture_name,
    lecture_file,
    "from create folder"
  );

  try {
    if (!lecture_file) {
      return res.status(422).json({ message: "Please upload file" });
    }

    const newFile = await Assignments.create({
      stu_id,
      folder_id,
      stu_name,
      file_name: lecture_name,
      file: lecture_file,
    });

    res.status(200).json({
      message: "File uploaded!",
      newFile,
    });
  } catch (e) {
    // console.error(error)
    res.status(400).json({
      error_code: "File creations",
      message: e.message,
    });
  }
};
