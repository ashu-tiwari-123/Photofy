import axios from "axios";
import FormData from "form-data";
import userModel from "../models/userModel.js";

const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    const user = await userModel.findById(userId);
    if (!user || !prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }
    if (user.creditBalance < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient credits" });
    }
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    )
    const base64Image = Buffer.from(data,'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;
    user.creditBalance -= 1;
    await user.save();
    res.status(200).json({ success: true, image: resultImage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { generateImage };
