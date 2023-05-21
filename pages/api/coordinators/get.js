import User from "database/models/user";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGet = async (req, res) => {
  try {
    const coords = await User.findAll({
      where: { role: "cord" },
    });

    console.log("touched", coords);

    res.status(200).json({ coords });
  } catch (e) {
    res.status(400).json({
      error_code: "get_coords",
      message: e.message,
    });
  }
};
