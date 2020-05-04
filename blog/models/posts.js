const Post = require('../lib/mysql_connect').Article
const User = require('../lib/mysql_connect').User
const CommentModel = require('./comments').Comment
// const marked = require('marked');

// // 将 post 的 content 从 markdown 转换成 html
// Post.plugin('contentToHtml', {
//     afterFind: function (posts) {
//       return posts.map(function (post) {
//         post.content = marked(post.content)
//         return post
//       })
//     },
//     afterFindOne: function (post) {
//       if (post) {
//         post.content = marked(post.content)
//       }
//       return post
//     }
//   })

module.exports = {
    //创建一篇文章
    create: async function create (post) {
        return await Post.create(post)
    },

    // 通过文章 id 获取一篇文章
    getPostById: async function getPostById(postId) {
        return await Post.findOne({
            where: {
                id: postId
            },
            include: [{
                model: User,  // 此处必须为一个 function，不能是一个table名称
                attributes: ['name', 'id'],
            }],
        })
    },

    // 按创建时间降序获取某个特定用户的所有文章
    getPostsOfAuthor: async function getPosts (author) {
        return await Post.findAll({
            where: {
                userId: author
            },
            order: [['createdAt', 'DESC']],
            limit: 10,
            include: [{
                model: User,  // 此处必须为一个 function，不能是一个table名称
                attributes: ['name', 'id'],
            }],
        })
    },

    // 按创建时间降序获取所有用户所有文章
    getPosts: async function getPosts () {
        return await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10,
            include: [{
                model: User,  // 此处必须为一个 function，不能是一个table名称
                attributes: ['name', 'id'],
            }],
        })
    },

    // 通过文章 id 给 pv 加 1
    incPv: async function incPv (postId) {
        return await Post.findOne({
            where: {
                id: postId
            }
        })
        .then(function (result){
            result.increment('pv')
        })
    },

    // // 通过文章 id 获取一篇原生文章（编辑文章）
    // getRawPostById: function getRawPostById (postId) {
    //     return Post
    //     .findOne({ 
    //         where: {
    //             id: postId }
    //         })
    //     .populate({ path: 'author', model: 'User' })
    //     .exec()
    // },

    // 通过文章 id 更新一篇文章
    updatePostById: async function updatePostById (postId, titles, data) {
        return await Post.update({title: titles, content: data}, {
            where: {
                id: postId
            },
            include: [{
                model: User, // 此处必须为一个 function，不能是一个table名称
                attributes: ['name', 'id'],
            }],
        })
    },

    // 通过文章 id 删除一篇文章
    delPostById: async function delPostById (userId, postId) {
        return await Post.destroy({
            where: {
                userId: userId,
                id: postId
            },
        }).then(function (res) {
            // 文章删除后，再删除该文章下的所有留言
            if (res.result.ok && res.result.n > 0) {
                return CommentModel.delCommentsByPostId(postId)
            }
        })
    },
}