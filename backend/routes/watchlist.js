const express = require("express");
const router = express.Router();
const sanitizeHtml = require("sanitize-html");
const WatchlistItem = require("../models/WatchlistItem");
const { body, param, validationResult } = require("express-validator");
const { sendEmail } = require("../services/emailService.js");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get(
  "/:userId",
  [param("userId").trim().notEmpty().withMessage("Invalid userId")],
  handleValidation,
  async (req, res) => {
    try {
      const items = await WatchlistItem.find({ userId: req.params.userId });
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch items" });
    }
  }
);

router.get(
  "/item/:id",
  [param("id").isMongoId().withMessage("Invalid item ID")],
  handleValidation,
  async (req, res) => {
    try {
      const item = await WatchlistItem.findById(req.params.id);
      if (!item) return res.status(404).json({ error: "Item not found" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch item" });
    }
  }
);

router.post(
  "/",
  [
    body("userId").trim().escape().notEmpty().withMessage("userId is required"),
    body("title")
      .trim()
      .notEmpty()
      .withMessage("title is required")
      .customSanitizer((value) =>
        sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
      ),
    body("type").optional().trim().escape(),
    body("status").optional().trim().escape(),
    body("notes")
      .optional()
      .trim()
      .customSanitizer((value) =>
        sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
      ),
    body("imageUrl")
      .optional()
      .trim()
      .isURL()
      .withMessage("imageUrl must be a valid URL"),
    body("movieId")
      .trim()
      .notEmpty()
      .withMessage("movieId is required")
      .isString()
      .withMessage("movieId must be a string"),
    body("rating")
      .optional()
      .isNumeric()
      .withMessage("rating must be a number")
      .custom((value) => {
        if (value < 1 || value > 5) {
          throw new Error("rating must be between 1 and 5");
        }
        return true;
      }),
    body("releaseDate")
      .optional()
      .isString()
      .withMessage("releaseDate must be a string"),
  ],
  handleValidation,
  async (req, res) => {
    try {
      const {
        userId,
        movieId,
        title,
        type,
        status,
        notes,
        imageUrl,
        releaseDate,
      } = req.body;
      const newItem = new WatchlistItem({
        userId,
        movieId,
        title,
        type,
        status,
        notes,
        imageUrl,
        releaseDate,
      });
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err) {
      res.status(500).json({ error: "Failed to create item" });
    }
  }
);

router.post("/newsletter", async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res
      .status(500)
      .json({ error: "Failed to receive an email address" });
  try {
    await sendEmail(email);
    console.log("Email sent");
    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error("Failed: ", err);
    res.status(500).json({ error: "Failed to send email" });
    console.log(error);
  }
});

router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid item ID"),
    body("title")
      .optional()
      .trim()
      .customSanitizer((value) =>
        sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
      ),
    body("type").optional().trim().escape(),
    body("status").optional().trim().escape(),
    body("notes")
      .optional()
      .trim()
      .customSanitizer((value) =>
        sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
      ),
    body("imageUrl")
      .optional()
      .trim()
      .isURL()
      .withMessage("imageUrl must be a valid URL"),
  ],
  handleValidation,
  async (req, res) => {
    try {
      const updatedItem = await WatchlistItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedItem)
        return res.status(404).json({ error: "Item not found" });
      res.json(updatedItem);
    } catch (err) {
      res.status(500).json({ error: "Failed to update item" });
    }
  }
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid item ID")],
  handleValidation,
  async (req, res) => {
    try {
      const deletedItem = await WatchlistItem.findByIdAndDelete(req.params.id);
      if (!deletedItem)
        return res.status(404).json({ error: "Item not found" });
      res.json({ message: "Item deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  }
);

module.exports = router;
