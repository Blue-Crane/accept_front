import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function ConnectedAssignments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(
    req,
    res,
    `api/task-connected-assignments/${req.query.spec}`
  );
}
