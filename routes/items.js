
const { index, new: _new, create, show, delete: _delete, edit, update, buy, youritems } = require("../controllers/itemsControllers")

//calling the authenticated function to set the auth
function auth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "You must be authenticated" })
    }
    next();
}

module.exports = router => {

    //Public Route
    router.get("/items", index)

    //below routes are all private by putting ,authenticated,
    //youritems for displaying all posts of a logged in user
    router.get("/items/youritems", auth, youritems)

    router.post("/items/update", auth, update)
    router.post("/items/delete", auth, _delete)
    //buy 
    router.post("/items/buy", auth, buy)
    router.post("/items", auth, create)
    router.get("/items/new", auth, _new)
    //with :id
    router.get("/items/:id/edit", auth, edit)
    router.get("/items/:id", auth, show)


};

