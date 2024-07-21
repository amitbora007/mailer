import express from "express";
import {
  createContact,
  deleteContact,
  readContact,
  updateContact,
} from "../controller/contactController.js";

export const contactRouter = express.Router();
contactRouter.get("/", readContact);
contactRouter.post("/", createContact);
contactRouter.patch("/:id", updateContact);
contactRouter.delete("/:id", deleteContact);

