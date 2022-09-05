interface photoData {
  src: {
    large: string;
  };
}

export interface fetchedImageResponse {
  photos: photoData[];
}

export interface fetchedPostDescData {
  content: string;
}

export interface fetchedUserData {
  results: [
    {
      email: string;
      login: {
        username: string;
        password: string;
      };
      picture: {
        large: string;
      };
    }
  ];
}

export interface filteredUserData {
  avatar: ArrayBuffer;
  username: string;
  email: string;
  password: string;
}

export type usersDataArr = filteredUserData[];

export interface PostData {
  username: string;
  avatar: ArrayBuffer;
  imageURL: ArrayBuffer;
  desc: string;
  likes: number;
}

export interface profileData extends filteredUserData {
  followers: number,
  following: number,
}