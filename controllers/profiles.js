import { Post } from '../models/post.js'

function index(req,res) {
  Post.find({ owner: req.params.profileId })
  .populate('owner')
  .then(posts => {
    res.render('profile/index', {
      posts,
      title: 'Profile'
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/posts');
  })
}

export {
  index
}