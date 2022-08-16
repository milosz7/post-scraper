import * as mongoDB from 'mongodb';
import dotenv from 'dotenv';

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