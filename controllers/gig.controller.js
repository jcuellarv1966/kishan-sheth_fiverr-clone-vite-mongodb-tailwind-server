import { existsSync, renameSync, unlinkSync } from "fs";
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
      return res.status(400).send("All properties should be required.");
    }
    return res.status(400).send("Cookie Error.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
