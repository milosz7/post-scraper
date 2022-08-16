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
  picture: string;
  username: string;
}

export type usersDataArr = filteredUserData[];