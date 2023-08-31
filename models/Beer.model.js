const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const beerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  tagline: {
    type: String,
    required: [true, "Tagline is required"],
  },
  first_brewed: String,
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image_url: {
    type: String,
    default: "https://images.punkapi.com/v2/keg.png"
  },
  ph: Number,
  attenuation_level: Number,
  brewers_tips: String,
  contributed_by: String,
});

const Beer = model("Beer", beerSchema);

module.exports = Beer;
