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
const Article = sequelize.define('article', {
    author: {
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.TEXT
    },
    content: {
        type: DataTypes.TEXT
    },
    pv: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    sequelize,
    modelName: 'article',
    //timestamps: false
})
//Article.sync({ alter: true })
    
Article.belongsTo(User, {foreignKey: 
'author', targetKey: 'id'});

module.exports = {
    User,
    Article
}
