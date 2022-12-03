import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  current_game_id: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ current_game_id: 2 })
}