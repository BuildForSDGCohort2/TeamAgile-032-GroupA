const postSchema = require("../models/post");
const userSchema = require("../models/user");

exports.upload = async (req, res, next) => {
  console.log(req.user);
  try {
    let postTitle = req.body.title;
    let postText = req.body.text || null;
    let mediaFiles = req.file || null;

    let phone = req.user.phone_number;

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

    post = await postSchema.create(post);

    return res.status(200).json({
      success: true,
      message: "Post created successfully.",
      data: {
        statusCode: 200,
        post
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
