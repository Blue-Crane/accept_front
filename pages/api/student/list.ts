import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/user-by-role';

export default async function ListStudents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url + '/student');
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
