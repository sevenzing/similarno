import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  word: String
}
const words = [
    "телевизор", "университет", "памятник", "деньги", "ноутбук",
    "диван", "жена", "слон", "акробат", "небо", "удача", "болезнь", 
    "путешественник", "палатка", "иероглиф", "олигарх", "наука",
    "бумага", "рубашка", "конфета"

]
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const rank = parseInt(req.body.rank || "0") - 1
  let word = ""
  if (rank >= 0 && rank < words.length) {
    word = words[rank]
  } else {
    word = "рандомслово"
  }
  res.status(200).json({ word: word})
}

