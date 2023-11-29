const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
var validator = require("email-validator");
const nodemailer = require("nodemailer");
const {MailtrapClient} = require("mailtrap");
const { notify } = require("../Routes/userroutes");

//add new user
const adduser = async (req, res) => {
  try {
    const { username, email, password, re_password } = req.body;

    if (!(username && email && password && re_password)) {
      res.status(400).send("All input is required");
    }

    if (password.length > 8) {
      if (validator.validate(email)) {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }

        if (password == re_password) {
          encryptedUserPassword = await bcrypt.hash(password, 10);
          encryptedUserrePassword = await bcrypt.hash(re_password, 10);
          const user = await User.create({
            username: username,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
            re_password: encryptedUserrePassword,
          });

          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "5h",
            }
          );

          // const transporter = nodemailer.createTransport({
          //   host: "smtp.mailtrap.io",
          //   port: 587,
          //   secure: false,
          //   auth: {
          //     user: "api",
          //     pass: "63123b0ca825fc61ce0ff448093baac3",
          //   },
          // });

          // async function main() {
          //   try {
          //     const info = await transporter.sendMail({
          //       from: "mailtrap@question.com", // sender address
          //       to: "sahiru906@gmail.com", // list of receivers
          //       subject: "Hello ✔", // Subject line
          //       text: "Hello world?", // plain text body
          //     });

          //     console.log("Message sent: %s", info.messageId);
          //   } catch (error) {
          //     console.error("Error sending email:", error);
          //   }
          // }

          // main();

          async function notifyAdmin(){
            const client = new MailtrapClient({token:'63123b0ca825fc61ce0ff448093baac3'});

            await client.send({
              from: {email: 'mailtrap@question.com'},
              to: [{email: 'sahiru906@gmail.com'}],
              subject: "Notification",
              text:"Check this out..."
            });
          }

          async function main(){
            await notifyAdmin();
          }

          main()

          res.status(201).json(user);
        } else {
          res.status(400).send("Password does not match.Try again!");
        }
      } else {
        return res.status(409).send("Please provide valid email address");
      }
    } else {
      return res.status(409).send("Password should has more than 8 characters");
    }
  } catch (err) {
    console.log(err);
  }
};

//login user
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All fields are required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      user.token = token;
      return res.status(200).json(user);
    }
    return res.status(400).send("User not found");
  } catch (error) {
    console.log(error);
  }
};

//update user
const updateuser = async (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  let user;

  try {
    if (validator.validate(email) && password.length > 8) {
      encryptedUserPassword = await bcrypt.hash(password, 10);
      user = await User.findByIdAndUpdate(id, {
        username,
        email: email.toLowerCase(),
        password: encryptedUserPassword,
      });

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      user.token = token;

      user = await user.save();

      if (user) {
        res.status(201).send("User updated successful..");
      } else {
        res.status(201).send("User updated failed..");
      }
    } else {
      res
        .status(201)
        .send(
          "Something went wrong.please check email or password is in valid format"
        );
    }
  } catch (err) {
    console.log("error", err);
  }
};

//delete user
const deleteuser = async (req, res) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      return res.status(200).send("User delete successfully");
    } else {
      return res.status(400).send("User delete unsuceess");
    }
  } catch (error) {
    console.log(error);
  }
};

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

exports.adduser = adduser;
exports.loginuser = loginuser;
exports.updateuser = updateuser;
exports.deleteuser = deleteuser;
exports.currentUser = currentUser;
