import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:8081/api/",
});

export async function Auth(user) {
  return api.post('user/signin', {
    email: user.email,
    password: user.password
  }).then(function (response) {
    api.defaults.headers.common['x-access-token'] = response.data.token;
    
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}

export default api;