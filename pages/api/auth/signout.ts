import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import { serialize } from 'cookie';

const url = 'http://' + env.API_ENDPOINT + '/api/logout';

export default async function signOut(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    Object.entries(response.headers).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    );
    res.setHeader('Set-Cookie', [
      serialize('access_token_cookie', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(),
        path: '/',
      }),
      serialize('refresh_token_cookie', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(),
        path: '/',
      }),
    ]);
    res.status(200).send('Success');
  } catch {
    res.status(401).json('Error');
  }
}