import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/assignment_tag';

export default async function DeleteAssignmentTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const spec = JSON.parse(req.body)['spec'];
  const response = await fetch(`${url}/${spec}`, {
    method: 'DELETE',
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}