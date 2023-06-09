import { Post } from '../models/post.js'
import { Technology } from '../models/technology.js'

function index(req, res) {
  let modelQuery = req.query.summary
    ? { summary: new RegExp(req.query.summary, 'i') }
    : {}
  Post.find(modelQuery)
  .populate('owner')
  .populate('technologies')
  .then(posts => {
    res.render('posts/index', {
      posts,
      title: 'Bug Reflector - All Posts'
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/');
  })
}

function newPost(req,res) {
  Technology.find({})
  .then(technologies => {
    res.render('posts/new', {
      title: 'New Post',
      technologies
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/');
  })
}

function create(req,res) {
  req.body.owner = req.user.profile._id
  req.body.resolved = !!req.body.resolved;
  for(let key in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }
  Post.create(req.body)
  .then(post => {
    res.redirect(`/posts/${post._id}`)
  })
  .catch(err => {
    console.log(err);
    res.redirect('/');
  })
}

function show(req,res) {
  Post.findById(req.params.postId)
  .populate('owner')
  .populate('comments.owner')
  .populate('technologies')
  .then(post => {  
    console.log('Post: ', post);
    console.log('Tech: ', post.technologies);
    res.render('posts/show', {
      post,
      title: 'Post Detail',
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/posts');
  })
}

function edit(req,res) {
  Post.findById(req.params.postId)
  .populate('technologies')
  .then(post => {
    Technology.find({})
    .then(technologies => {
      res.render('posts/edit', {
        title: 'Edit Post',
        post,
        technologies
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts');
    })
  })
}

function update(req,res) {
  Post.findByIdAndUpdate(req.params.postId)
  .then(post => {
    if(post.owner.equals(req.user.profile._id)) {
      req.body.resolved = !!req.body.resolved;
      post.updateOne(req.body)
      .then(() => {
        res.redirect(`/posts/${post._id}`)
      })
      .catch(err => {
        console.log(err);
        res.redirect('/posts');
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err);
    res.redirect('/posts');
  })
}

function deletePost(req,res) {
  Post.findById(req.params.postId)
  .then(post => {
    if(post.owner.equals(req.user.profile._id)) {
      Post.deleteOne({_id: post._id})
      .then(() => {
        res.redirect('/posts')
      })
      .catch(err => {
        console.log(err);
        res.redirect('/posts');
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err);
    res.redirect('/posts');
  })
}

function createComment(req,res) {
  req.body.owner = req.user.profile._id
  req.body.edited = false
  Post.findById(req.params.postId)
  .then(post => {
    post.comments.push(req.body)
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts');
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/posts');
  })
}

function editComment(req,res) {
  Post.findById(req.params.postId)
  .then(post => {
    const comment = post.comments.id(req.params.commentId)
    res.render('comments/edit', {
      title: 'Edit Comment',
      post,
      comment
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect(`/posts/${post._id}`);
  })
}

function updateComment(req,res) {
  Post.findById(req.params.postId)
  .then(post => {
    const comment = post.comments.id(req.params.commentId)
    if(comment.owner.equals(req.user.profile._id)) {
      comment.content = req.body.content
      comment.edited = true;
      post.save()
      .then(() => {
        res.redirect(`/posts/${post._id}`)
      })
      .catch(err => {
        console.log(err);
        res.redirect('/posts');
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err);
    res.redirect('/posts');
  })
}

function deleteComment(req,res) {
  Post.findById(req.params.postId)
  .then(post => {
    const comment = post.comments.id(req.params.commentId)
    if(post.owner.equals(req.user.profile._id) || comment.owner.equals(req.user.profile._id)) {
      post.comments.remove({ _id: req.params.commentId})
      post.save()
      .then(() => {
        res.redirect(`/posts/${post._id}`)
      })
      .catch(err => {
        console.log(err);
        res.redirect(`/posts/${post._id}`);
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err);
    res.redirect(`/posts/${post._id}`);
  })
}

export {
  index,
  newPost as new,
  create,
  show,
  edit,
  update,
  deletePost as delete,
  createComment,
  editComment,
  updateComment,
  deleteComment,
}