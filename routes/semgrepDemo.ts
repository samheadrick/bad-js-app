import { Request, Response } from 'express'

type Operation = 'add' | 'subtract' | 'multiply' | 'divide'

const operations: Record<Operation, (left: number, right: number) => number> = {
  add: (left, right) => left + right,
  subtract: (left, right) => left - right,
  multiply: (left, right) => left * right,
  divide: (left, right) => left / right
}

export function evaluateExpression (req: Request, res: Response) {
  const { operation, left, right } = req.body
  const leftNumber = Number(left)
  const rightNumber = Number(right)

  if (
    !Object.prototype.hasOwnProperty.call(operations, operation) ||
    !Number.isFinite(leftNumber) ||
    !Number.isFinite(rightNumber) ||
    (operation === 'divide' && rightNumber === 0)
  ) {
    return res.status(400).json({ error: 'Invalid calculation' })
  }

  const calculate = operations[operation as Operation]
  const result = calculate(leftNumber, rightNumber)

  return res.json({ result })
}