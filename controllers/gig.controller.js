import fs, { existsSync, renameSync, unlinkSync } from "fs";
import Gig from "../models/gig.model.js";

export const addGig = async (req, res, next) => {
  try {
    if (req?.userId) {
      if (req.files) {
        const fileKeys = Object.keys(req.files);
        const fileNames = [];
        fileKeys.forEach((file) => {
          const date = Date.now();
          renameSync(
            req.files[file].path,
            "uploads/" + date + req.files[file].originalname
          );
          fileNames.push(date + req.files[file].originalname);
        });

        if (req.query) {
          const {
            title,
            description,
            category,
            features,
            price,
            revisions,
            time,
            shortDesc,
          } = req.query;

          if (
            !title ||
            !description ||
            !category ||
            !features ||
            !price ||
            !revisions ||
            !time ||
            !shortDesc
          )
            return res.status(400).send("Not enough data to create a Gig ...");

          await Gig.create({
            title,
            description,
            deliveryTime: parseInt(time),
            category,
            features,
            price: parseInt(price),
            shortDesc,
            revisions: parseInt(revisions),
            createdBy: req.userId,
            images: fileNames,
          });
          return res.status(201).send("Successfully created the gig.");
        }
      }
      return res.status(400).send("All data fields should be required!!!");
    }
    return res.status(400).send("Cookie Error.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserAuthGigs = async (req, res, next) => {
  try {
    if (req?.userId) {
      const gigs = await Gig.find({ createdBy: req.userId });
      return res.status(200).send(gigs);
    }
    return res.status(400).send("UserId should be required.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.createdBy !== req.userId)
      return res.status(400).send("Only you can delete your gig!");

    if (gig.images.length > 0) {
      for (var i = 0; i < gig.images.length; i++) {
        let fileName = "uploads/" + gig.images[i];
        fs.unlink(fileName, (err) => {
          console.log(err);
        });
      }
    }
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
