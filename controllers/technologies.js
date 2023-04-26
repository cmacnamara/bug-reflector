import { Technology } from '../models/technology.js'

function newTechnology(req, res) {
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
}

function create(req,res) {
  Technology.create(req.body)
  .then(technology => {
    res.redirect('/technologies/new')
  })
}

export {
  newTechnology as new,
  create,
}