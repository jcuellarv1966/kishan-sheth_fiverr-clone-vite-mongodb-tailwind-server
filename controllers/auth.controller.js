import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { renameSync } from "fs";
import User from "../models/user.model.js";

const generatePassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: req.body.email });
      if (user) return res.status(400).send("Already registered user");

      const newUser = new User({
        email,
        password: await generatePassword(password),
      });

      await newUser.save();
      return res.status(201).json({
        user: { _id: newUser?._id, email: newUser?.email },
        jwt: createToken(email, newUser._id),
      });
    } else {
      return res.status(400).send("Email and Password Required");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("User not found!");

      const auth = await compare(password, user.password);
      if (!auth) {
        return res.status(400).send("Invalid Password");
      }

      return res.status(200).json({
        user: { _id: user?._id, email: user?.email },
        jwt: createToken(email, user._id),
      });
    } else {
      return res.status(400).send("Email and Password Required");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    if (req?.userId) {
      const user = await User.findById({ _id: req.userId });
      return res.status(200).json({
        user: {
          _id: user?._id,
          email: user?.email,
          image: user?.profileImage,
          username: user?.username,
          fullName: user?.fullName,
          description: user?.description,
          isProfileSet: user?.isProfileInfoSet,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const setUserInfo = async (req, res, next) => {
  try {
    if (req?.userId) {
      const { userName, fullName, description } = req.body;
      if (userName && fullName && description) {

        await User.findByIdAndUpdate(
          { _id: req.userId },
          {
            username: userName,
            fullName,
            description,
            isProfileInfoSet: true,
          }
        );
        return res.status(200).send("Profile data updated successfully.");
      } else {
        return res
          .status(400)
          .send("Username, Full Name and description should be included.");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const setUserImage = async (req, res, next) => {
  try {
    if (req.file) {
      if (req?.userId) {
        const date = Date.now();
        let fileName = "uploads/profiles/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);

        await User.findByIdAndUpdate(
          { _id: req.userId },
          { profileImage: fileName }
        );
        return res.status(200).json({ img: fileName });
      }
      return res.status(400).send("Cookie Error.");
    }
    return res.status(400).send("Image not inclued.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
