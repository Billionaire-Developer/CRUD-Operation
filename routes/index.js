const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/api/items', (req, res) => {
    //#swagger.tags-['Hello world']
    res.send("Hello World");
});
const {
    getItems,
    createItem,
    updateItem,
    deleteItem
} = require("../controllers/itemsController");

router.get("/", getItems);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;