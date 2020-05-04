const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const CommentModel = require('../models/comments')

//POST /comments 创建一条留言
router.post('/', checkLogin, function(req,res,next) {
    const author = req.cookies['uid']
    const postId = req.fields.postId
    //console.log(postId)
    const content = req.fields.content

    //校验参数
    try {
      if (!content.length) {
        throw new Error('请填写留言内容')
      }
    } catch (e) {
      req.flash('error', e.message)
      return res.redirect('back')
    }
    const comment = {
      articleId: postId,
      content: content,
      userId: author
    }

    CommentModel.create(comment)
    .then(function () {
      res.redirect('back')
    })
    .catch(next)
})

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', checkLogin, function (req, res, next) {
    const commentId = req.params.commentId
    const author = req.cookies['uid']

    CommentModel.getCommentById(commentId)
    .then(function (comment) {
      if (!comment) {
        throw new Error('留言不存在')
      }
      if (comment.userId.toString() !== author) {
        throw new Error('没有权限删除留言')
      }
      CommentModel.delCommentById(commentId)
      .then(function () {
        res.redirect('back')
      })
      .catch(next)
    })
})
  
module.exports = router