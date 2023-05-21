import batch from "@/database/models/batch";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await GettingGet(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const GettingGet = async (req, res) => {
  const { my_batch } = req.query;

  try {
    const BatchExist = await batch.findOne({ where: { slug: my_batch } });

    if (BatchExist) {
      return res.status(200).json({ course_from_batch: BatchExist.course });
    } else {
      return res
        .status(400)
        .json({ message: "this batch hasnt any course yet" });
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error_code: "geting_get",
      message: e.message,
    });
  }
};
