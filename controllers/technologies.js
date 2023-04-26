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

export {
  newTechnology as new,
}