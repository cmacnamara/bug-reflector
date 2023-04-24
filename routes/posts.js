import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', postsCtrl.index)
router.get('/new', isLoggedIn, postsCtrl.new)
router.get('/:postId', postsCtrl.show)
router.get('/:postId/edit', isLoggedIn, postsCtrl.edit)
router.get('/:postId/comments/:commentId/edit', isLoggedIn, postsCtrl.editComment)

router.post('/', isLoggedIn, postsCtrl.create)
router.post('/:postId/comments', isLoggedIn, postsCtrl.createComment)

router.put('/:postId', isLoggedIn, postsCtrl.update)
router.put('/:postId/comments/:commentId', isLoggedIn, postsCtrl.updateComment)

router.delete('/:postId', isLoggedIn, postsCtrl.delete)

export {
  router
}