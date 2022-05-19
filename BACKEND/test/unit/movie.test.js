const { User } = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("config");

describe("getAuthTokens", () => {
  it("should be token", () => {
    let user = new User({
      id: "1",
      email: "rishabh@gmail.com",
      isAdmin:false,
    });
    const token = user.getAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    const encode = jwt.sign(decoded, config.get("jwtPrivateKey"));
    expect(token).toMatch(encode);
  });
});