import axios from 'axios';
import dotenv from 'dotenv';
import { Buffer } from 'buffer';
import {
  PEXELS_RANDOM_IMG_API_URL,
  POST_DESCRIPTION_URL,
  USER_DATA_API_URL,
  DEFAULT_QUOTES_AMOUNT_TO_FETCH,
  DEFAULT_USERS_AMOUNT_TO_FETCH,
  DEFAULT_POSTS_AMOUNT_TO_GENERATE
} from './config';
import { fetchedImageResponse, fetchedPostDescData, fetchedUserData,  usersDataArr, PostData, profileData} from '../types/types';

const scrapeProfileAndPosts = async () => {
  dotenv.config();
  const descriptions: string[] = [];
  try {
      const userData = await fetchUsers()
      const descriptionsData = await fetchDescriptions();
      const imagesData = await fetchImages();
      generatePostsAndProfiles(userData, descriptionsData, imagesData);
  } catch (e) {
    console.error(e);
  }
};

const convertImage = async (url: string) => {
  const { data }: {data: ArrayBuffer} = await axios.get(url, { responseType: 'arraybuffer'});
  const bufferToBase64 = Buffer.from(data).toString('base64');
  const imageURL = `data:image/jpeg;base64,${bufferToBase64}`;
  return imageURL;
};

const fetchUsers = async () => {
  const usersData: usersDataArr = []
  for (let i = 0; i < DEFAULT_USERS_AMOUNT_TO_FETCH; i++) {
    const { data }: { data: fetchedUserData } = await axios.get(USER_DATA_API_URL);
    const desiredUserData = {
      username: data.results[0].login.username,
      avatar: await convertImage(data.results[0].picture.large),
    };
    usersData.push(desiredUserData)
  }
  return usersData;
};

const fetchDescriptions = async () => {
  const descriptions: string[] = [];
  for (let i = 0; i < DEFAULT_QUOTES_AMOUNT_TO_FETCH; i++) {
    const { data }: {data: fetchedPostDescData} = await axios.get(POST_DESCRIPTION_URL)
    descriptions.push(data.content);
  }
  return descriptions;
};

const fetchImages = async () => {
  const imageURLs: string[] = [];
  const { data }: { data: fetchedImageResponse } = await axios.get(PEXELS_RANDOM_IMG_API_URL, {
    headers: { Authorization: process.env.PEXELS_API_KEY },
  });
  const largePhotosURLs = data.photos.map((photo) => photo.src.large);
  console.log(largePhotosURLs);
  for (const url of largePhotosURLs) {
    const imageURL = await convertImage(url); 
    imageURLs.push(imageURL)
  }
  return imageURLs;
};

const generatePostsAndProfiles = (users: usersDataArr, descriptions: string[], images: string[]) => {
  const posts: PostData[] = [];
  const profiles: profileData[] = []
  for (let i = 0; i < DEFAULT_POSTS_AMOUNT_TO_GENERATE; i++) {
    const { username, avatar } = users[Math.floor(Math.random() * users.length)];
    const generatedPost = {
      username,
      avatar,
      desc: descriptions[i],
      imageURL: images[i],
      likes: Math.floor(Math.random() * 500),
    }
    posts.push(generatedPost);
  }
  for (const user of users) {
    const { username, avatar } = user;
    const profileData = {
      username,
      avatar,
    }
    profiles.push(profileData)
  }
  console.log(posts[0]);
}

scrapeProfileAndPosts();