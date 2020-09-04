const postSchema = require("../models/post");
const userSchema = require("../models/user");
const DataUri = require("datauri/parser");
const path = require("path");
const cloudinary = require("cloudinary");

exports.upload = async (req, res, next) => {
  let postTitle = req.body.title;
  let postText = req.body.text || null;

  let phone = req.user.phone_number;
  console.log(req.files);

  try {
    let user = await userSchema.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: err.message,
        error: {
          statusCode: 404,
          description: err.message
        }
      });
    }
    let author = user._id;

    let post = {
      title: postTitle,
      text: postText,
      author: author
    };

    if (req.files) {
      post.media = [];
      let dtauri = new DataUri();
      for (const file of req.files) {
        let dataUri = dtauri.format(
          path.extname(file.originalname),
          file.buffer
        );

        let final_file = dataUri.content;

        let image = await cloudinary.v2.uploader.upload_large(final_file);

        post.media.push({
          url: image.secure_url,
          public_id: image.public_id
        });
      }
    }

    let post_result = await postSchema.create(post);

    return res.status(201).json({
      success: true,
      message: "Post created successfully.",
      data: {
        statusCode: 200,
        post: post_result
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: {
        statusCode: 500,
        description: err.message
      }
    });
  }
};
