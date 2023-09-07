const router = require("express").Router();
const Beer = require("../models/Beer.model");

router.get("/", async (req, res) => {
  const allBeers = await Beer.find();
  res.json(allBeers);
});

router.get("/random", async (req, res) => {
  const randomBeers = await Beer.aggregate([{ $sample: { size: 1 } }]);
  res.json(randomBeers);
});

router.get("/:beerId", async (req, res) => {
  const oneBeer = await Beer.findById(req.params.beerId);
  res.json(oneBeer);
});

router.post("/", async (req, res) => {
  try {
    let {
      name,
      tagline,
      first_brewed,
      description,
      image_url,
      ph,
      attenuation_level,
      brewers_tips,
      contributed_by,
    } = req.body;

    let newBeer = await Beer.create({
      name,
      tagline,
      first_brewed,
      description,
      ph,
      attenuation_level,
      brewers_tips,
      contributed_by,
      image_url,
    });
    res.status(201).json(newBeer);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error creating Beer", message: error.message });
  }
});

router.put("/:beerId", async (req, res) => {
  const updatedBeer = await Beer.findByIdAndUpdate(
    req.params.beerId,
    req.body,
    { new: true }
  );
  res.json(updatedBeer);
  res.status(202).json({ message: "Beer successfully modified" });
});

router.delete("/:beerId", async (req, res) => {
  await Beer.findByIdAndDelete(req.params.beerId);
  res.status(202).json({ message: "Beer successfully deleted" });
});

module.exports = router;
