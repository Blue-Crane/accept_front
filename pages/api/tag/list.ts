import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function ListTags(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper({ req: req, res: res, url: 'api/task_tag' });
}
