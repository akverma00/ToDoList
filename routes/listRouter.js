import express from 'express';
const listRouter = express.Router();
import listControllers from "../controllers/list.controllers.js";


// Create a new listitem
listRouter.post("/", listControllers.createItem);

// Retrieve all listitems
listRouter.get("/", listControllers.findAll);

// Update a listitem with id
listRouter.put("/:id", listControllers.updateItem);

// Delete a listRouter with id
listRouter.delete("/:id", listControllers.removeItem);

// Retrieve all published listControllers
//listRouter.get("/published", listControllers.findAllPublished);

// Retrieve a single listRouter with id
//listRouter.get("/:id", listControllers.findOne);

// Delete all listControllers
//listRouter.delete("/", listControllers.deleteAll);

export default listRouter;