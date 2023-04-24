import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const postSchema = new Schema({
  mainContent: String,
  summary: String,
  technologies: [String],
  resolved: Boolean,
  reflection: String,
  summary: String,
  comments: [commentSchema],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}
