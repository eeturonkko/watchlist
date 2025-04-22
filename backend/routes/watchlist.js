const express = require("express");
const router = express.Router();
const WatchlistItem = require("../models/WatchlistItem");

router.get("/:userId", async (req, res) => {
  try {
    const items = await WatchlistItem.find({ userId: req.params.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

router.get("/item/:id", async (req, res) => {
  try {
    const item = await WatchlistItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, title, type, status, notes, imageUrl } = req.body;
    const newItem = new WatchlistItem({
      userId,
      title,
      type,
      status,
      notes,
      imageUrl,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await WatchlistItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ error: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to update item" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await WatchlistItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
