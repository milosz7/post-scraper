import axios from 'axios';
import dotenv from 'dotenv';
import { Buffer } from 'buffer';
import {
  PEXELS_RANDOM_IMG_API_URL,
  POST_DESCRIPTION_URL,
  USER_DATA_API_URL,
  DEFAULT_POSTS_AMOUNT_TO_GENERATE,
} from './config';
import {
  fetchedImageResponse,
  fetchedPostDescData,
  fetchedUserData,
  filteredUserData,
} from '../types/types';
import { connectToDb } from './db-config';
import User from './models/userModel';
import Post from './models/postModel';
import mongoose from 'mongoose';
dotenv.config();

const convertImage = async (url: string) => {
  const { data }: { data: ArrayBuffer } = await axios.get(url, { responseType: 'arraybuffer' });
  return data;
};

const fetchUserData = async () => {
  const { data }: { data: fetchedUserData } = await axios.get(USER_DATA_API_URL);
  const desiredUserData: filteredUserData = {
    username: data.results[0].login.username,
    email: data.results[0].email,
    password: data.results[0].login.password,
    avatar: await convertImage(data.results[0].picture.large),
  };
  return desiredUserData;
};

const fetchDesc = async () => {
  const { data }: { data: fetchedPostDescData } = await axios.get(POST_DESCRIPTION_URL);
  return data.content;
};

const createPostAndUser = async () => {
  connectToDb();

  try {
    const { username, email, password, avatar } = await fetchUserData();
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      avatar,
      password,
      posts: [],
      following: [],
      followers: [],
      profileDesc: 'Some desc',
    });

    const { data }: { data: fetchedImageResponse } = await axios.get(PEXELS_RANDOM_IMG_API_URL, {
      headers: { Authorization: process.env.PEXELS_API_KEY },
    });
    const largePhotosURLs = data.photos.map((photo) => photo.src.large);

    for (let i = 0; i < DEFAULT_POSTS_AMOUNT_TO_GENERATE; i++) {
      const photo = Buffer.from(largePhotosURLs[i]);
      const desc = await fetchDesc();

      const newPost = new Post({
        desc,
        photo,
        _id: new mongoose.Types.ObjectId(),
        userData: newUser._id,
        published: new Date(),
        likedBy: [newUser._id],
        comments: [],
      });
      await newPost.save();
      newUser.posts.push(newPost._id.toHexString());
    }
    await newUser.save();
  } catch (e) {
    console.error(e);
  }
  await mongoose.connection.close()
};

createPostAndUser();
