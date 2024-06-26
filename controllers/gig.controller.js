import { existsSync, renameSync, unlinkSync } from "fs";
import Gig from "../models/gig.model.js";

export const addGig = async (req, res, next) => {
  try {
    if (req?.userId) {
      if (req.body) {
        const {
          title,
          description,
          category,
          features,
          price,
          revisions,
          time,
          shortDesc,
        } = req.body.gigData;

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
        });
        return res.status(201).send("Successfully created the gig.");
      }
    }
    return res.status(400).send("Cookie Error.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
