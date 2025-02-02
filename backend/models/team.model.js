import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  socialMedia: {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    facebook: { type: String },
  },
});

const TeamModel = mongoose.model("Team", teamSchema);

export default TeamModel;
