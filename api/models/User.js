const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true }
);

// Print output format
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  if (!userObject.role === "admin") {
    delete userObject.updatedAt;
    delete userObject.__v;
  }
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// Generate tokens
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Find credentials account for login
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("This user does not exist!");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("The password entered is incorrect!");
  return user;
};

// Encrypt password after update it
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Reset password and token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resePasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resePasswordToken = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
