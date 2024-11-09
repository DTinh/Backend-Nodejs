'use strict';
const {
    Model,
    DatabaseError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { //dinh danh cac moi qhe
            // define association here
            Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' })
            Schedule.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'doctorData' })
        }
    }
    Schedule.init({
        currenNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};