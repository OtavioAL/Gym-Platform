import { USER_STORAGE } from './storageConfig';

export function saveUser(user: unknown) {
  localStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem(USER_STORAGE);
  return user ? JSON.parse(user) : null;
}

export function removeUser() {
  localStorage.removeItem(USER_STORAGE);
}
