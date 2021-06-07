const { ListItem } = require('../models');
const createItem = async (req, res) => {
    try {
        const item = await ListItem.create(req.body);
        return res.status(201).json(
            item
        );
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const findAll = async (req, res) => {

    try {
        const title = req.query.title;
        //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
        const item = await ListItem.findAll({
            //where: condition,
            order: [
                ['completed', 'ASC'],
                ['createdAt', 'ASC']
            ]
        });
        return res.status(201).json(
            item,
        );
    } catch (error) {
        return res.status(500).json({ error: error.message || "Some error occurred while retrieving tutorials." })
    }

};
const updateItem = async (req, res) => {

    const id = req.params.id;
    try {
        const item = await ListItem.update({ completed: req.params.completed === "false" ? true : false }, {
            where: { id: id }
        });
        return res.status(201).json({
            item,
            message: "Listitem was updated successfully."
        });
    } catch (error) {
        return res.status(500).json({ error: error.message || `Cannot update Listitem with id=${id}. Maybe Listitem was not found or req.body is empty!` })
    }
};
const removeItem = async (req, res) => {
    const id = req.params.id;

    try {
        const item = await ListItem.destroy({
            where: { id: id }
        });
        return res.status(201).json({
            item,
            message: "Listitem was deleted successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message || `Cannot delete Listitem with id=${id}. Maybe Listitem was not found!`
        });
    }
};
module.exports = {
    createItem,
    findAll,
    updateItem,
    removeItem
}