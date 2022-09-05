import { model, Schema, InferSchemaType } from 'mongoose';

const postSchema = new Schema({
  userData: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  desc: { type: String },
  published: { type: Date, required: true },
  photo: { type: Schema.Types.Buffer, required: true },
  likedBy: { type: [{type: Schema.Types.ObjectId, ref: 'User'}] },
  comments: { type: [{ type: Schema.Types.ObjectId, ref: 'Comment'}] },
});

type PostModel = InferSchemaType<typeof postSchema>;

const Post = model<PostModel>('Post', postSchema);

export default Post;
