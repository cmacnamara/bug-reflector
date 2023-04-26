import { Technology } from '../models/technology.js'

function newTechnology(req, res) {
  if(req.user.admin) {
    Technology.find({})
    .then(technologies => {
      res.render('technologies/new', {
        title: 'Add Technology',
        technologies
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts')
    })
  } else {
    throw new Error('🚫 Not authorized 🚫')
  }
}

function create(req,res) {
  if(req.user.admin) {
    Technology.create(req.body)
    .then(technology => {
      res.redirect('/technologies/new')
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts')
    })
  } else {
    throw new Error('🚫 Not authorized 🚫')
  }
}

export {
  newTechnology as new,
  create,
}