import batch from "@/database/models/batch";

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

    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGet = async (req, res) => {
  try {
    // console.log("touched from all bacthes");

    const batches = await batch.findAll({ where: { deactive: false } });
    // console.log(batches);
    res.status(200).json({ batches });
  } catch (error) {
    res.status(400).json({
      error_code: "handle_get",
      message: e.message,
    });
  }
};

const handlePut = async (req, res) => {
  const { batchID } = req.body;
  try {
    await batch.update({ deactive: true }, { where: { id: batchID } });
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({
      error_code: "handle_get",
      message: e.message,
    });
  }
};
