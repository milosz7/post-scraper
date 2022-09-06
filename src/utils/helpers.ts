import { PEXELS_RANDOM_IMG_API_URL, RESULTS_PER_PAGE } from "../config";

export const validateEmail = (email: string) => {
  const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegexp.test(email);
};

export const validateUsername = (username: string) => {
  const usernameRegexp = /([A-Z]|[a-z]|[0-9]|[._-])\w+/;
  return usernameRegexp.test(username);
};

export const randomizeUrl = () => {
  const randomPage = Math.floor(Math.random() * 15) + 1;
  return PEXELS_RANDOM_IMG_API_URL + `?page=${randomPage}&per_page=${RESULTS_PER_PAGE}`
}
