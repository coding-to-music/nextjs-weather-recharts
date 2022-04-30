export default async (req, res) => {
  try {
    res.status(200).json({ key: process.env.MAPBOX_API_ACCESS_TOKEN });
  } catch (e) {
    console.error(e);
    res.status(e.status || 400).json({ message: "Api error" });
  }
};
