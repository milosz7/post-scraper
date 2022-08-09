import { ObjectId } from "mongodb";

export default class Post {
  constructor(public name: string, public test: string, public id?: ObjectId) {}
}