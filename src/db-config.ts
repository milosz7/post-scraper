import * as mongoDB from 'mongodb';
import dotenv from 'dotenv';

export const collections: { posts?: mongoDB.Collection, profiles?: mongoDB.Collection } = {};

export const connectToDb = async () => {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  await db.command({
    "collMod": process.env.POSTS_COLLECTION_NAME,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "avatar", "imageURL", "desc", "likes"],
        additionalProperties: false,
        properties: {
          _id: {},
          username: {
            bsonType: "string",
            description: "'name' is required, type: string",
          },
          avatar: {
            bsonType: "string",
            description: "'avatar' is required, type: string",
          },
          imageURL: {
            bsonType: "string",
            description: "'imaegURL' is required, type: string",
          },
          desc: {
            bsonType: "string",
            description: "'desc' is required, type: string",
          },
          likes: {
            bsonType: "number",
            description: "'likes' is required, type: number",
          }
        }
      }
    }
  });

  await db.command({
    "collMod": process.env.PROFILES_COLLECTION_NAME,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["avatar", "username", "followers", "following"],
        additionalProperties: false,
        properties: {
          _id: {},
          username: {
            bsonType: "string",
            description: "'username' is required, type: string'",
          },
          avatar: {
            bsonType: "string",
            description: "'avatar' is required, type: string'",
          },
          followers: {
            bsonType: "number",
            description: "'followers' is required, type: number'",
          },
          following: {
            bsonType: "number",
            description: "'following' is required, type: number'",
          }
        }
      }
    }
  });

  const postsCollection: mongoDB.Collection = db.collection(process.env.POSTS_COLLECTION_NAME);
  const profilesCollection: mongoDB.Collection = db.collection(process.env.PROFILES_COLLECTION_NAME);

  collections.profiles = profilesCollection;
  collections.posts = postsCollection;

  console.log(`Connected to ${db.databaseName}, collections: ${postsCollection.collectionName}, ${profilesCollection.collectionName}`);
};