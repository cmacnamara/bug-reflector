import mongoose from 'mongoose'

const Schema = mongoose.Schema

const technologySchema = new Schema({
  name: { type: String, required: true },
}, {
  timestamps: true
})

const Technology = mongoose.model('Technology', technologySchema)

export {
  Technology
}