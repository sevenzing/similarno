import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  lemma: string,
  rank: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let word = (req.body.word || "").toLowerCase()
  const rank = Math.floor(Math.random() * 1000)
  res.status(200).json({ lemma: word, rank: rank })
}

