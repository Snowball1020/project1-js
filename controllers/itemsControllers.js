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
    res.render(`${view}/index`, {
      pageTitle: "Index Page",
      items: items,
      user: req.user
    })

  } catch (error) {
    req.flash('danger', `${error}, error happened reading index page, back to home page`);
    res.redirect("/")
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

  if (!name || !description || !price) {
    req.flash('danger', `Please fill in all fields`);
    res.redirect("/items/new")
  }

  if (price < 0) {
    req.flash('danger', `Price should be more than $0 `);
    res.redirect("/items/new")
  } else {

    try {
      const user = await User.findOne({ email: req.user.email })
      const item = await Item.create({ user: user._id, ...req.body })
      req.flash('success', `Your item has been posted on the list!`);
      res.redirect("/items")

    } catch (error) {
      req.flash('danger', `${error}`);
      res.redirect("/items/new")
    }

  }

}

//Show page this is where the user see the single page for a single reservation
exports.show = async (req, res) => {

  try {
    const item = await Item
      .findOne({ _id: req.params.id })
      .populate("user")
    res.render(`${view}/show`, {
      pageTitle: "Show Page",
      item: item,
      user: req.user
    })
  } catch (error) {
    req.flash('danger', `${error}`);
    res.redirect("/items")
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
    req.flash('danger', `The item deleted`);
    res.redirect("/items")

  } catch (error) {

    req.flash('danger', `failed to delete`);
    res.redirect("/items")

  }

}

