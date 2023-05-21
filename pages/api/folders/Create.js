import Folders from "@/database/models/folders";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await create_a_folder(req, res);
      break;

    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const create_a_folder = async (req, res) => {
  const { creator_id, folder_name, course_id, creator_name } = req.body;

  console.log(
    creator_id,
    folder_name,
    course_id,
    creator_name,
    "from create folder"
  );

  try {
    if (!folder_name) {
      return res.status(422).json({ message: "Folder name is required" });
    }

    const folderExist = await Folders.findOne({
      where: { folder_name },
    });

    if (folderExist) {
      return res.status(422).json({ message: `Folder is already exist` });
    }

    const newFolder = await Folders.create({
      folder_name,
      creator_id,
      creator_name,
      course_id,
    });

    res.status(200).json({
      message: "Folder created!",
      newFolder,
    });
  } catch (e) {
    // console.error(error)
    res.status(400).json({
      error_code: "Folder creations",
      message: e.message,
    });
  }
};
