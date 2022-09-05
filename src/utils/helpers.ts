export const validateEmail = (email: string) => {
  const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegexp.test(email);
};

export const validateUsername = (username: string) => {
  const usernameRegexp = /([A-Z]|[a-z]|[0-9]|[._-])\w+/;
  return usernameRegexp.test(username);
};
