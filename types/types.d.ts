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
      login: {
        username: string;
      };
      picture: {
        large: string;
      };
    }
  ];
}

interface filteredUserData {
  avatar: string;
  username: string;
}

export type usersDataArr = filteredUserData[];

export interface PostData {
  username: string;
  avatar: string;
  imageURL: string;
  desc: string;
  likes: number;
}

export interface profileData extends filteredUserData {
  followers: number,
  following: number,
}