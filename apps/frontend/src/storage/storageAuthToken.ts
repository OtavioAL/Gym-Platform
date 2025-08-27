import { AUTH_STORAGE } from './storageConfig';

type StorageAuthTokenProps = {
  token: string;
};

export async function storageAuthTokenSave({ token }: StorageAuthTokenProps) {
  localStorage.setItem(AUTH_STORAGE, JSON.stringify({ token }));
}

export async function storageAuthTokenGet() {
  const response = localStorage.getItem(AUTH_STORAGE);

  const { token }: StorageAuthTokenProps = response ? JSON.parse(response) : {};

  return { token };
}

export async function storageAuthTokenRemove() {
  localStorage.removeItem(AUTH_STORAGE);
}
