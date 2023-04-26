import { Router } from 'express'
import * as technologiesCtrl from '../controllers/technologies.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/new', isLoggedIn, technologiesCtrl.new)

router.post('/', isLoggedIn, technologiesCtrl.create)

export {
  router
}