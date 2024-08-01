const UserModel = require("../models/UserModel");

async function searchUser(req, res) {
  try {
    const { search } = req.body;
    const query = new RegExp(search, "i", "g");

    const users = await UserModel.find({
      $or: [{ name: query }, { email: query }],
    });

    return res.json({
      message: "All users",
      data: users,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.export = searchUser;
