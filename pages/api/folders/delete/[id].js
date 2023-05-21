import Folders from "@/database/models/folders";

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      await delete_folder(req, res);
      break;

    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const delete_folder = async (req, res) => {
  const { id } = req.query;

  try {
    const folderExist = await Folders.findOne({
      where: { id },
    });

    if (!folderExist) {
      return res.status(422).json({ message: `Folder is not exist` });
    }

    // console.log(folderExist, "folder delete");
    // return;

    await folderExist.destroy();

    res.status(200).json({
      message: "Folder deleted!",
    });
  } catch (e) {
    // console.error(error)
    res.status(400).json({
      error_code: "Folder creations",
      message: e.message,
    });
  }
};
