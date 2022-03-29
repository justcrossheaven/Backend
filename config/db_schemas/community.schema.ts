import mongoose, { Schema } from 'mongoose';

interface Community {
  communityID: string;
  name: string;
  description: string;
  members: number;
  img: string;
}

const communitySchema = new Schema<Community>(
  {
    communityID: {
      type: String,
      required: true,
      trim: true,
      minlength: 24,
      maxLength: 24,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    description: {
      type: String,
      required: true,
    },
    members:{
        type: Number,
        required: true
    },
    img: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const CommunityModel = mongoose.model<Community>('Community', communitySchema);
export default CommunityModel;