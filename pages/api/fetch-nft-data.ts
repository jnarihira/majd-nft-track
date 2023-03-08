// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const address = JSON.parse(req.body).address;
    const chain = JSON.parse(req.body).chain;

    const options = { method: 'GET', headers: { accept: 'application/json', AccessKey: 'bf4ef3a46a70e0b48e5170fee5b2f28995916258' } };

    await fetch(`https://pro-openapi.debank.com/v1/user/nft_list?id=${address}&chain_id=${chain}`, options)
        .then(response => response.json())
        .then(response => res.json(response))
        .catch(err => console.error(err));
}
