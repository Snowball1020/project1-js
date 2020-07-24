// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  // User -> Items

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/

const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({

  //owener_id is Associcated with User 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["ON SALE", "SOLD OUT"],
    default: "ON SALE"
  }

},
  {
    timestamps: true,
    toJSON: {
      getters: true
    }
  }
)


ItemSchema.query.onSale = function () {
  return this.where({
    status: "ON SALE"
  })
}

ItemSchema.query.soldOut = function () {
  return this.where({
    status: "SOLD OUT"
  })
}

//helper to describe the item
ItemSchema.virtual("itemDetails")
  .get(function () {
    return `Description and Comments from the seller :  ${this.description} `
  })


module.exports = mongoose.model("Item", ItemSchema)