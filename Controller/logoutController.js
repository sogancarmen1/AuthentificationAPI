const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
  try {
    return res
      .cookie("access-token", null, {
        expires: new Date(Date.now()),
      })
      .status(200)
      .json({ message: "you are logout" });
  } catch (error) {
    return res.status(500).json({ message: "problems" });
  }
};

module.exports = { logout };
