const router = require("express").Router();
const User = require("../models/User");
const authentication = require("../middlewares/authentication");
const pass = require("../utils/generatePassword");
const transporter = require("../utils/transporter");

// Register
router.post("/register", async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Logout
router.post("/logout", authentication.verify, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({ message: "You have successfully logged out!" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Request reset password
router.post("/reset-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      user.tokens = [];
      user.password = pass.generatePassword();
      const key = user.password;
      const msg = {
        from: process.env.USER,
        to: user.email,
        subject: "Instrucțiuni resetare parolă",
        html: `<!doctype html>
          <html>
            <head>
            <style>
              img {
                width: 250px;
                height: 200px;
                display: block;
                margin-left: auto;
                margin-right: auto;
              }
              p, li {
                margin-left: 40px;
                font-size: 15px;
              } 
              .credentials {
                font-weight: 600;
              }
              .footer {
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                color: black;
                text-align: right;
                font-style: oblique;
                font-weight: 700;
             }
             .userAccountSettings {
                font-style: oblique;
             }
             .team {
              font-style: oblique;
              text-align: right;
              font-weight: 700;
             }
             ul {
              list-style-type: disc;
             }
             a:link {
              color: blue;
              background-color: transparent;
              text-decoration: none;
            }
            a:hover {
              color: red;
              background-color: transparent;
            }
            .contactInfo {
              font-style: oblique;
            }
            </style>
              <meta charset="utf-8">
            </head>
            <body>
              <img src="https://t4.ftcdn.net/jpg/04/65/91/57/360_F_465915770_HsbKRqP7PQnoGnNn5dyYRlODYZQI9PNu.jpg" alt="image">
              <p>Salut,</p>
              <p>Ai primit acest email, deoarece ai solicitat resetarea parolei pentru contul tău.</p>
              <p>Parola ta de autentificare a fost schimbată, iar ca urmare a acestui lucru ai fost deconectat automat de pe toate dispozitivele pe care ai fost logat anterior. 
              Pentru a te putea autentifica din nou în aplicație navighează spre pagina de <a href="http://localhost:3000/login">logare</a> și completează câmpurile din formular cu următoarele date:</p>
              <ul>
                <li>email: <span class="credentials">${user.email}</span></li>
                <li>parolă: <span class="credentials">${key}</span></li>
              </ul>
              <p>Dacă ai orice fel de neclarități în legătură cu procesul de autentificare nu ezita să ne contactezi prin email la adresa <span class="contactInfo">hello@hollywoodrecords.com</span> sau telefonic la numărul <span class="contactInfo">+(40) 737 728 737</span>.</p>
              <p>Toate cele bune!</p>
              <div>
                <p class="team">Echipa Hollywood Records</p>
              </div>
              <div class="footer">
                <p>© 2023 <span>Hollywood Records</span>. Toate drepturile rezervate!</p>
              </div>
            </body>
          </html>`,
      };
      await transporter.sendMail(msg);
      await user.save();
      res.send({
        message:
          "All access tokens for " +
          user.firstName +
          " " +
          user.lastName +
          " have been deleted!",
      });
    } else res.status(404).json("This email address does not exist!");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update user
router.put("/:id", authentication.verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    const updates = Object.keys(req.body);
    try {
      const { user } = req;
      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(500).json("You can only update your own account!");
  }
});

// Delete user
router.delete("/:id", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json("User with id " + req.params.id + " has been deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("Only the administrator can delete the account!");
  }
});

// Get all users
router.get("/", authentication.verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.role !== "admin")
    return res.status(400).send({
      message: "Only the administrator can see the entire list of users!",
    });
  try {
    const users = query
      ? (await User.find().sort({ _id: -1 }).limit(5)).reverse()
      : await User.find();
    res.status(200).json(users.reverse());
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get one user
router.get("/find/:id", authentication.verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.role === "admin") {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("You can only see your own account details!");
  }
});

// Get users statistics
router.get("/statistics", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const data = await User.aggregate([
        {
          $project: {
            Month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$Month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(500)
      .json(
        "Only the administrator can see the statistics related to the number of registrations!"
      );
  }
});

// Get total number of users
router.get(
  "/total-number-of-users",
  authentication.verify,
  async (req, res) => {
    if (req.user.role === "admin") {
      try {
        const count = await User.countDocuments({});
        res.json(count);
      } catch (error) {
        res.send(error);
      }
    } else {
      res
        .status(500)
        .json("Only the administrator can see the total number of users!");
    }
  }
);

module.exports = router;
