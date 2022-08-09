import * as mongoDB from 'mongodb';
import dotenv from 'dotenv';
import axios from 'axios';
import Post from './models/postModel';


const collections: {posts?: mongoDB.Collection} = {};

interface imageResponse {
  photos: photoData[]
}

interface photoData {
  src: {
    large: string
  }
}

interface postDescData {
  content: string;
}

const connectToDb = async () => {
  dotenv.config();
  
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const postsCollection: mongoDB.Collection = db.collection(process.env.POSTS_COLLECTION_NAME);

  collections.posts = postsCollection

  console.log(`Connected to ${db.databaseName}, collection: ${postsCollection.collectionName}`)
}