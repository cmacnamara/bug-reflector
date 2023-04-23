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

function show(req,res) {
  Post.findById(req.params.postId)
  .then(post => {
    res.render('posts/show', {
      post,
      title: 'Post Detail'
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/posts');
  })
}

function edit(req,res) {
  Post.findById(req.params.postId)
  .then(post => {
    res.render('posts/edit', {
      title: 'Edit Post',
      post
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/posts');
  })
}

function update(req,res) {
  req.body.resolved = !!req.body.resolved;
  Post.findByIdAndUpdate(req.params.postId, req.body, {new: true})
  .then(post => {
    res.redirect(`/posts/${post._id}`)
  })
  .catch(err => {
    console.log(err);
    res.redirect('/posts');
  })
}

export {
  index,
  newPost as new,
  create,
  show,
  edit,
  update,
}