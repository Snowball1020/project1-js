// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation
  - User -> Properties

//  - User -> Item

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/

const view = "items";
const Item = require("../models/item")
const User = require("../models/user")

//Index page 
exports.index = async (req, res) => {

  try {
    const items = await Item
      .find()
      .populate("user")
      .sort({
        updatedAt: "desc"
      });

    res.status(200).json(items)

  } catch (error) {
    res.status(400).json({ message: "There was sn Error fetching items", error })

  }
}

//simply take the user to a new page
exports.new = async (req, res) => {
  res.render(`${view}/new`, {
    pageTitle: "New Item",
    user: req.user
  })
}


//manage a logged in user's item
exports.youritems = async (req, res) => {

  try {
    const items = await Item
      .find({ user: req.user._id })
      .populate("user")
    res.render(`${view}/youritems`, {
      pageTitle: "Your Items",
      items: items,
      user: req.user
    })

  } catch (error) {
    req.flash('danger', `${error}`);
    res.redirect("/")
  }
}

//Create new item
exports.create = async (req, res) => {

  const { name, description, price } = req.body

  try {
    const user = await User.findOne({ email: req.user.email })
    const item = await Item.create({ user: user._id, ...req.body })

    res.status(200).json(item)

  } catch (error) {
    res.status(400).json({ message: "There was an error posting the item", error })
  }

}

//Show page this is where the user see the single page for a single reservation
exports.show = async (req, res) => {

  try {
    const item = await Item
      .findOne({ _id: req.params.id })
      .populate("user")

    res.status(200).json(item)
  } catch (error) {
    res.status(400).json({ message: "There was an issue to fetch the item" })
  }

}

//Edit page
exports.edit = async (req, res) => {

  try {
    const item = await Item.findOne({ _id: req.params.id });
    res.render(`${view}/edit`, {
      pageTitle: "edit item",
      formData: item,
      user: req.user
    });
  } catch (error) {
    req.flash('danger', `${error}`);
    res.redirect('/');
  }
};

//Update page
exports.update = async (req, res) => {

  try {
    const user = await User.findOne({ email: req.user.email })
    const contents = { user: user._id, ...req.body }
    const item = await Item.findByIdAndUpdate(req.body.id, contents)

    req.flash('success', 'The item updated successfully');
    res.redirect(`/items/${req.body.id}`);

  } catch (error) {
    req.flash('danger', `${error}`);
    res.redirect(`/items/${req.body.id}/edit`);
  }
}

//Buy the product , simply change the status to SOLD OUT
exports.buy = async (req, res) => {

  try {

    const item = await Item.findByIdAndUpdate(req.body.id, {
      status: "SOLD OUT"
    })

    req.flash('success', 'You purchased this Item! Thank you for your shopping today.');
    res.redirect(`/items/${req.body.id}`);

  } catch (error) {
    req.flash('danger', `${error}`);
    res.redirect(`/items`);
  }

}


//Delete page
exports.delete = async (req, res) => {

  try {
    await Item.remove({ _id: req.body.id })
    res.status(200).json({ message: "Deleted" })
  } catch (error) {

    res.status(400).json({ message: "There was an error deleting the item" })
  }

}

