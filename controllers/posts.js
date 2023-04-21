import { Post } from '../models/post.js'

function index(req, res) {
  Post.find({})
  .then(posts => {
    res.render('posts/index', {
      posts,
      title: 'All Posts'
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/');
  })
}

export {
  index
}