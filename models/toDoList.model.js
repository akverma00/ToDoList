const ListItemModel = (sequelize, Sequelize) => {
    return sequelize
        .define("listitem", {
            title: {
                type: Sequelize.STRING
            },
            completed: {
                type: Sequelize.BOOLEAN
            }
        });
};
export default ListItemModel;