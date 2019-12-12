const express = require("express");
const router = express.Router();
const Fashion = require("../modal/Fashion");

async function getOneFashion(req, res, next) {
  try {
    fashion = await Fashion.findById(req.params.id);
    if (fashion == null) {
      return res.status(404).json({ message: "Cant find any Fashions" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.fashion = fashion;
  next();
}

//GetAll Fashions
router.get("/", async (req, res) => {
  try {
    const fashions = await Fashion.find();
    res.json(fashions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get One Fashions
router.get("/:id", getOneFashion, (req, res) => {
  res.json(res.fashion);
});

//Create Fashion
router.post("/", async (req, res) => {
  const fashion = new Fashion({
    name: req.body.fashion,
    brand: req.body.brand,
    quantity: req.body.quantity,
    price: req.body.price
  });
  try {
    const newFashion = await fashion.save();
    res.status(201).json(newFashion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update Fashion
router.patch("/:id", (req, res) => {
  router.patch("/:id", getOneFashion, async (req, res) => {
    if (req.body.name != null) {
      res.fashion.name = req.body.name;
    }
    if (req.body.brand != null) {
      res.fashion.brand = req.body.brand;
    }
    if (req.body.quantity != null) {
      res.fashion.quantity = req.body.quantity;
    }
    if (req.body.price != null) {
      res.fashion.price = req.body.price;
    }
    try {
      const updateFashion = await res.fashion.save();
      res.json(updateFashion);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
});
//Delete Fashion
router.delete("/:id", getOneFashion, async (res, req) => {
  try {
    await res.fashion.remove();
    res.json({ message: "Deleted This Fashion" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
