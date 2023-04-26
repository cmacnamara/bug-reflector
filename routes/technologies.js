import { Router } from 'express'
import * as technologiesCtrl from '../controllers/technologies.js'

const router = Router()

router.get('/new', technologiesCtrl.new)

router.post('/', technologiesCtrl.create)

export {
  router
}