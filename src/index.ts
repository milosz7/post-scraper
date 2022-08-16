import * as mongoDB from 'mongodb';
import dotenv from 'dotenv';
import axios from 'axios';
import Post from './models/postModel';
import { Buffer } from 'buffer';
import {
  PEXELS_RANDOM_IMG_API_URL,
  POST_DESCRIPTION_URL,
  USER_DATA_API_URL,
  DEFAULT_QUOTES_AMOUNT_TO_FETCH,
  DEFAULT_USERS_AMOUNT_TO_FETCH,
} from './config';
import { fetchedImageResponse, fetchedPostDescData, fetchedUserData,  usersDataArr } from '../types/types';

const collections: { posts?: mongoDB.Collection } = {};

const connectToDb = async () => {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const postsCollection: mongoDB.Collection = db.collection(process.env.POSTS_COLLECTION_NAME);

  collections.posts = postsCollection;

  console.log(`Connected to ${db.databaseName}, collection: ${postsCollection.collectionName}`);
};

const scrapeProfileAndPosts = async () => {
  dotenv.config();
  const descriptions: string[] = [];
  try {
      const userData = await fetchUsers()
      const descriptionsData = await fetchDescriptions();
      const imagesData = await fetchImages();
  } catch (e) {
    console.error(e);
  }
  console.log((descriptions));
};

const fetchUsers = async () => {
  const usersData: usersDataArr = []
  for (let i = 0; i < DEFAULT_USERS_AMOUNT_TO_FETCH; i++) {
    const { data }: { data: fetchedUserData } = await axios.get(USER_DATA_API_URL);
    const desiredUserData = {
      username: data.results[0].login.username,
      picture: data.results[0].picture.large,
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
    console.log(url)
    const { data }: {data: ArrayBuffer} = await axios.get(url, {responseType: 'arraybuffer'});
    const base64img = Buffer.from(data).toString('base64');
    const imageURL = `data:image/jpeg;base64,${base64img}`;
    imageURLs.push(imageURL)
  }
  return imageURLs;
}

scrapeProfileAndPosts();
