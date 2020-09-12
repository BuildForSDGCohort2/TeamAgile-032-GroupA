const mongoose = require("mongoose"),
  geocoder = require("../util/geocoder");

const emergencySchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },

    evidence: [
      {
        url: String,
        public_id: String
      }
    ],

    reported: {
      type: Boolean,
      default: false
    },

    time: {
      type: Date,
      default: Date.now(),
      required: true
    },

    countryCode: String,

    location: {
      type: {
        type: String,
        enum: ["Point"]
      },
      coordinates: {
        type: [Number],
        index: "2dspheres"
      },
      formattedAddress: String
    }
  },
  { timestamps: true }
);

emergencySchema.pre("save", async function (next) {
  let loc = await geocoder.geocode(this.address);
  console.log(loc);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };
});

module.exports = mongoose.model("emergency", emergencySchema);
