import { getData } from '@/request/index';
const url = '/login.json';
const menuUrl = '/menu.json';
export function login(data: API.LoginParams) {
  const { username, password } = data;
  localStorage.setItem('userName', username);
  localStorage.setItem('pwd', password);
  return getData(url);
}
export function getMenu() {
  return getData(menuUrl);
}
export function loginOut() {
  localStorage.removeItem('userName');
  localStorage.removeItem('pwd');
}
