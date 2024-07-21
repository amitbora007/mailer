import { Contact } from "../models/models.js";
import { sendEmail } from "../helpers/mailer.js";

export const readContact = async (req, res) => {
  const info = await Contact.find()
    .then(() => {
      res.status(200).json({ status: true, data: info });
    })
    .catch((error) => {
      res.status(404).json({ status: false, data: error });
    });
};

export const createContact = async (req, res) => {
  const mailOptions = new Contact(req.body);
  console.log(mailOptions);

  await mailOptions
    .save()
    .then(() => {
      res.status(201).json({ status: true, data: "Data saved" });
      let mailDetails = {
        from: `${mailOptions.name} <${mailOptions.email}>`,
        to: process.env.website_mail,
        subject: 'Inquiry',
        text: mailOptions.content,
      };
      sendEmail(mailDetails);
    })
    .catch((error) => {
      console.error("Error saving data:", error);
      res.status(500).json({ status: false, data: error });
    });
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;
  const info = { name, content, _id: id };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ status: false, data: `The id ${id} is not valid` });
  }

  await Contact.findByIdAndUpdate(id, info, { new: true })
    .then(() => {
      res.json({ status: true, data: info });
    })
    .catch((error) => {
      res.json({ status: false, data: error });
    });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ status: false, data: `The id ${id} is not valid` });
  }

  await Contact.findByIdAndRemove(id)
    .then(() => {
      res.json({ status: true, data: "deleted successfully" });
    })
    .catch((error) => {
      res.json({ status: false, data: error });
    });
};
