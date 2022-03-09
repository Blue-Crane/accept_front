import { ITag } from '@custom-types/ITag';
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/tag';

export default async function ListTasks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url);
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}