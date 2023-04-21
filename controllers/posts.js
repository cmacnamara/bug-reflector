import { Post } from '../models/post.js'

function index(req, res) {
  Post.find({})
  .populate('owner')
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

function newPost(req,res) {
  res.render('posts/new', {
    title: 'New Post'
  })
}

function create(req,res) {
  req.body.resolved = !!req.body.resolved;
  console.log('Req.body', req.body);
  for(let key in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }
  Post.create(req.body)
  .then(post => {
    res.redirect('/posts')
  })
  .catch(err => {
    console.log(err);
    res.redirect('/');
  })
}

export {
  index,
  newPost as new,
  create
}