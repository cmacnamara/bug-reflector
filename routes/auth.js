import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.post("/google", passport.authenticate("google-one-tap", {
  failureRedirect: "/",
  successRedirect: "/posts",
}))

router.get('/logout', function (req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err)}
    res.redirect('/posts')
  })
})

export {
  router
}
