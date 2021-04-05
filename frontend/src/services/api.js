import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:8081/api/",
});

export function Auth(user) {
  return api.post('user/signin', {
    email: user.email,
    password: user.password
  }).then(function (response) {
    api.defaults.headers.common['x-access-token'] = response.data.token;
    return response;
  }).catch(function (error) {
    return error;
  });
}

export default api;
