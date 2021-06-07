import db from "../models/index.js";
const Listitem = db.listitem;
const Op = db.Sequelize.Op;

const createItem = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a item
    const item = {
        title: req.body.title,
        completed: req.body.completed ? req.body.completed : false
    };

    // Save item in the database
    Listitem
        .create(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating new item."
            });
        });
};

const findAll = (req, res) => {

    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Listitem.findAll({
        where: condition,
        order: [
            ['completed', 'ASC'],
            ['createdAt', 'ASC']
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
const updateItem = (req, res) => {
    const id = req.params.id;
    Listitem.update({ completed: req.params.completed === "false" ? true : false }, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Listitem was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Listitem with id=${id}. Maybe Listitem was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Listitem with id=" + id
            });
        });
};
const removeItem = (req, res) => {
    const id = req.params.id;

    Listitem.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Listitem was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Listitem with id=${id}. Maybe Listitem was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Listitem with id=" + id
            });
        });
};
const listControllers = {
    createItem,
    findAll,
    updateItem,
    removeItem
};

export default listControllers;