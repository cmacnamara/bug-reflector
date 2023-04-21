import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
  mainContent: String,
  summary: String,
  technologies: [String],
  resolved: Boolean,
  reflection: String,
  summary: String,
  comment: [commentSchema],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}