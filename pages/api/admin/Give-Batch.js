import { User } from "database/models";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "PUT":
      await handlePut(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handlePut = async (req, res) => {
  try {
    const { userId, my_batch } = req.body;

    if (my_batch) {
      const thisUser = await User.update(
        {
          my_batch,
        },
        { where: { id: userId } }
      );

      console.log(thisUser.my_batch, "from this make admin function");
      res.status(200).json({ message: "Added " });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "give_batch",
      message: e.message,
    });
  }
};
