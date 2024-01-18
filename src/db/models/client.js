import { sequelize } from "../config.js"

import { DataTypes } from "sequelize"

export const Client = sequelize.define('client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    cuit: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING
}, {
    timestamps: false
})