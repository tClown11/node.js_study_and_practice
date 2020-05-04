const express = require('express')
const router = express.Router()
const PostModel = require('../models/posts')
const CommentModel = require('../models/comments')
const checkLogin = require('../middlewares/check').checkLogin

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/', checkLogin, function (req, res, next) {
  if (req.query.author) {
    PostModel.getPostsOfAuthor(req.query.author)
    .then(function (result) {
      res.render('posts', {
        posts: result
      })
    })
    .catch(next)
  }else {
    PostModel.getPosts()
    .then(function (posts) {
      //console.log(posts)
      res.render('posts', {
        posts: posts
      })
    })
    .catch(next)
  }
  
})
  
  // POST /posts/create 发表一篇文章
  router.post('/create', checkLogin, function (req, res, next) {
    const userId = req.cookies['uid']
    const title = req.fields.title
    const content = req.fields.content

    // 校验参数
    try {
      if (!title.length) {
        throw new Error('请填写标题')
      }
      if (!content.length) {
        throw new Error('请填写内容')
      }
    } catch (e) {
      return res.redirect('back')
    }

    let post = {
      userId: userId,
      title: title,
      content: content
    }

    PostModel.create(post)
    .then(function (result) {
      post = result
      // 发表成功后跳转到该文章页
      res.redirect(`/posts/${post.id}`)
    })
    .catch(next)
  })
  
  // GET /posts/create 发表文章页
  router.get('/create', checkLogin, function (req, res, next) {
    res.render('create')
  })
  
  // GET /posts/:postId 单独一篇的文章页
  router.get('/:postId',checkLogin, function (req, res, next) {
    const postId = req.params.postId

  Promise.all([
    PostModel.getPostById(postId), // 获取文章信息
    CommentModel.getComments(postId),
    PostModel.incPv(postId)// pv 加 1
  ])
    .then(function (result) {
      const post = result[0]
      const comments = result[1]
      if (!post) {
        throw new Error('该文章不存在')
      }
     // console.log(result)
      res.render('post', {
        post: post,
        comments: comments
      })
    })
    .catch(next)
  })
  
  // GET /posts/:postId/edit 更新文章页
  router.get('/:postId/edit', checkLogin, function (req, res, next) {
    const postId = req.params.postId
    const currentUserId = req.cookies['uid']

    PostModel.getPostById(postId)
      .then(function (article) {
        if (!article) {
          throw new Error('该文章不存在')
        }
        //console.log(article)
        if (currentUserId !== article.userId.toString()) {
          throw new Error('权限不足')
        }
        //article.currentUser = userId
        res.render('edit', {
          post: article
        })
      })
      .catch(next)
  })
  
  // POST /posts/:postId/edit 更新一篇文章
  router.post('/:postId/edit', checkLogin, function (req, res, next) {
    const postId = req.params.postId
    const currentUserId = req.cookies['uid']
    const title = req.fields.title
    const content = req.fields.content

    // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题')
    }
    if (!content.length) {
      throw new Error('请填写内容')
    }
  } catch (e) {
    return res.redirect('back')
  }

  PostModel.getPostById(postId)
  .then(function (post) {
    if (!post) {
      throw new Error('文章不存在')
    }
    if (post.userId.toString() !== currentUserId) {
      throw new Error('没有权限')
    }
    PostModel.updatePostById(postId, title, content)
      .then(function () {
        // 编辑成功后跳转到上一页
        res.redirect(`/posts/${postId}`)
      })
      .catch(next)
  })
  })
  
  // GET /posts/:postId/remove 删除一篇文章
  router.get('/:postId/remove', checkLogin, function (req, res, next) {
    const postId = req.params.postId
    const currentUserId = req.cookies['uid']

  PostModel.getPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在')
      }
      if (post.userId.toString() !== currentUserId) {
        throw new Error('没有权限')
      }
      PostModel.delPostById(post.userId, postId)
        .then(function () {
          // 删除成功后跳转到主页
          res.redirect('/posts')
        })
        .catch(next)
    })
  })
  
  module.exports = router