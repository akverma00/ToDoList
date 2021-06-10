const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();


//router.post('/', controllers.createItem);

router.post('/:title', controllers.createItem);

// Retrieve all listitems
router.get("/", controllers.findAll);

// Update a listitem with id
router.put("/:id/:completed", controllers.updateItem);

// Delete a listRouter with id
router.delete("/:id", controllers.removeItem);


module.exports = router;