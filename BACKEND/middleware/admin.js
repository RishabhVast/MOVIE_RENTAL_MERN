module.exports = function (req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    response.status(401).json({ message: "Not authorized" });
  }
};
