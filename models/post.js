import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  edited: Boolean,
}, {
  timestamps: true
})

const postSchema = new Schema({
  mainContent: String,
  summary: String,
  resolved: Boolean,
  reflection: String,
  summary: String,
  comments: [commentSchema],
  technologies: [{type: Schema.Types.ObjectId, ref: 'Technology'}],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}
