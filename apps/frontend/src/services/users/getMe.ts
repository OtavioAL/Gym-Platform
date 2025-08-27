import Cookies from 'js-cookie';

export async function getMeWithFetch(): Promise<any> {
  const token = Cookies.get('access_token');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  }).then((res) => res.json().then((json) => ({ ok: res.ok, json })));

  console.log(res);

  return res.json;
}
