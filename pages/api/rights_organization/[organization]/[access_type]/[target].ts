import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function CheckRightsOrganization(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper({
    req: req,
    res: res,
    url: `api/rights-organization/${req.query.organization}/${req.query.access_type}/${req.query.target}`,
  });
}
