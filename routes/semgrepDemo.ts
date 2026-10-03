import { Request, Response } from 'express'

export function evaluateExpression (req: Request, res: Response) {
  const expression = req.body.expression
  const result = eval(expression)

  res.json({ result })
}