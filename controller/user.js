const UserSchema = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
  let { phone_number, role } = req.user;

  try {
    let user = await UserSchema.findOne({ phone: phone_number });

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

    if (role !== "super_admin") {
      return res.status(401).json({
        success: false,
        message: "You are not authorised to access this resource",
        error: {
          statusCode: 401,
          description: "You are not authorised to access this resource"
        }
      });
    }

    let users = await UserSchema.find({ role: "user" }).select("-password");
    return res.status(200).json({
      success: true,
      message: "Success",
      data: {
        length: users.length,
        statusCode: 200,
        data: users
      }
    });
  } catch (err) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        statusCode: err.statusCode,
        description: err.message
      }
    });
  }
};
