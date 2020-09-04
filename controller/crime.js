const crimeSchema = require("../models/crime");
const userSchema = require("../models/user");
const DataUri = require("datauri/parser");
const path = require("path");
const cloudinary = require("cloudinary");

exports.report = async (req, res, next) => {
  let user = req.user.phone_number;
  let crimeType = req.body.type;
  let crimeTxt = req.body.text;
  let address = req.body.address;
  let dtUri = new DataUri();

  try {
    console.log(req.ipInfo);
    if (!crimeTxt && !crimeType) {
      return res.status(404).json({
        success: false,
        message: "Fill the required fields",
        error: {
          statusCode: 400,
          description: "Fill the required fields"
        }
      });
    }

    user = await userSchema.findOne({ phone: user });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          statusCode: 404,
          description: "User not found"
        }
      });
    }

    let crime_reporter = user._id;

    let crime = {
      text: crimeTxt,
      crimeType: crimeType,
      reporter: crime_reporter,
      address: address
    };

    if (!req.files) {
      return res.status(404).json({
        success: false,
        message: "Provide evidence of crime",
        error: {
          statusCode: 400,
          description: "Provide evidence of crime"
        }
      });
    }

    crime.evidence = [];

    for (const file of req.files) {
      let dataUri = dtUri.format(path.extname(file.originalname), file.buffer);

      let final_file = dataUri.content;

      let media = await cloudinary.v2.uploader.upload_large(final_file);

      crime.evidence.push({
        url: media.secure_url,
        public_id: media.public_id
      });
    }

    let crimeResult = await crimeSchema.create(crime);

    return res.status(201).json({
      success: true,
      message: "Post created successfully.",
      data: {
        statusCode: 200
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
      error: {
        statusCode: 500,
        description: err
      }
    });
  }
};
