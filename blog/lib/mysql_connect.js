const config = require('config-lite')(__dirname)
const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types');
const sequelize = new Sequelize(config.mysql)

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.STRING,
    }
},{
    sequelize,
    modelName: 'user',
    timestamps: false
})
//User.sync({ alter: true })
    
module.exports = User
