import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/tag';

export default async function ListTasks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${url}`, {
    method: 'POST',
    body: req.body,
    headers: { 'content-type': 'application/json' },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}