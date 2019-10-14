import { HTTP } from './http';

export const requestRegisterUser = (model) => new Promise((resolve, reject) => HTTP.post(`/auth/register`, model)
  .then(response => ((response.status === 201) ? resolve : reject)(response))
  .catch(error => reject(error.response)));

export const requestLogin = (model) => new Promise((resolve, reject) => HTTP.post(`/auth/login`, model)
  .then(response => ((response.status === 200) ? resolve : reject)(response))
  .catch(error => reject(error.response)));

export const requestResetPassword = (model) => new Promise((resolve, reject) => HTTP.post(`/auth/password_reset`, model)
  .then(response => ((response.status === 200) ? resolve : reject)(response))
  .catch(error => reject(error.response)));

export const requestConfirmPassword = (model) => new Promise((resolve, reject) => HTTP.post(`/auth/password_reset_confirm`, model)
  .then(response => ((response.status === 204) ? resolve : reject)(response))
  .catch(error => reject(error.response)));

export const requestCurrentUser = () => new Promise((resolve, reject) => HTTP.get(`/me`)
  .then(response => ((response.status === 200) ? resolve : reject)(response))
  .catch(error => reject(error.response)));
