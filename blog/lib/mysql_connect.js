const config = require('config-lite')(__dirname)
const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types');
const sequelize = new Sequelize(config.mysql)

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING,
    }
},{
    sequelize,
    modelName: 'user',
    timestamps: false
})

const Article = sequelize.define('article', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    // author: {
    //     type: DataTypes.INTEGER,
    // },
    title: {
        type: DataTypes.TEXT
    },
    content: {
        type: DataTypes.TEXT
    },
    pv: {
        type: DataTypes.INTEGER,
        defaultValue: Number(0)
    }
},{
    sequelize,
    modelName: 'article',
    //timestamps: false
})


const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    // //评论作者ID
    // author: {
    //     type: DataTypes.INTEGER,
    // },
    content: {
        type: DataTypes.TEXT
    },
    //文章ID
    articleId: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'comment'
})
// User.sync()
// Article.sync()
// Comment.sync()

// async function init(User, Article, Comment) {
//     await User.sync();
//     await Article.sync();
//     await Comment.sync();
// }

// 创建标准关系
// 如前所述,Sequelize 关联通常成对定义. 综上所述：

// 创建一个 一对一 关系, hasOne 和 belongsTo 关联一起使用;
// 创建一个 一对多 关系, hasMany he belongsTo 关联一起使用;
// 创建一个 多对多 关系, 两个 belongsToMany 调用一起使用.

//一对多的关系
User.hasMany(Article, {sourceKey: 'id', onDelete: 'CASCADE'});
Article.belongsTo(User, {targetKey: 'id'});


// //一对多的关系,Comment与其他表的关系
Article.hasMany(Comment, {sourceKey: 'id', onDelete: 'CASCADE'});
Comment.belongsTo(Article, {targetKey: 'id'});
User.hasMany(Comment, {sourceKey: 'id'});
Comment.belongsTo(User, {targetKey: 'id'});

//init(User, Article, Comment)


// User.belongsTo(Article, {onDelete: 'CASCADE'});
// Article.hasOne(User);


// //一对多的关系,Comment与其他表的关系
// Article.hasMany(Comment, {onDelete: 'CASCADE'});
// Comment.belongsTo(Article);
// User.hasMany(Comment);
// Comment.belongsTo(User);


module.exports = {
    User,
    Article,
    Comment
}
