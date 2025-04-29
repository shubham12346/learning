export const Signout = () => {
  localStorage.removeItem('logged');
  localStorage.removeItem('accessToken');
};
