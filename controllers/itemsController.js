const connectDB = require("../db/connect");
const { ObjectId } = require("mongodb");

// Helper validation function
function validateItem(body) {
    //#swagger-tags-['items']
    const errors = [];

    if (!body.name || typeof body.name !== "string") {
        errors.push("Name is required and must be a string.");
    }

    if (body.description && typeof body.description !== "string") {
        errors.push("Description must be a string.");
    }

    return errors;
}

// GET items
exports.getItems = async (req, res) => {
    //#swagger-tags-['items']
    try {
        const db = await connectDB();
        const items = await db.collection("items").find().toArray();

        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve items.", error: error.message });
    }
};

// POST item
exports.createItem = async (req, res) => {
    //#swagger-tags-['items']
    try {
        const errors = validateItem(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const db = await connectDB();
        const item = {
            name: req.body.name,
            description: req.body.description,
        };

        const result = await db.collection("items").insertOne(item);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to create item.", error: error.message });
    }
};

// PUT update item
exports.updateItem = async (req, res) => {
    //#swagger-tags-['items']
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format." });
        }

        const errors = validateItem(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const db = await connectDB();
        const updated = await db.collection("items").updateOne(
            { _id: new ObjectId(id) },
            { $set: { name: req.body.name, description: req.body.description } }
        );

        if (updated.matchedCount === 0) {
            return res.status(404).json({ message: "Item not found." });
        }

        res.json({ message: "Item updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to update item.", error: error.message });
    }
};

// DELETE item
exports.deleteItem = async (req, res) => {
    //#swagger-tags-['items']
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format." });
        }

        const db = await connectDB();
        const deleted = await db.collection("items").deleteOne({ _id: new ObjectId(id) });

        if (deleted.deletedCount === 0) {
            return res.status(404).json({ message: "Item not found." });
        }

        res.json({ message: "Item deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete item.", error: error.message });
    }
};