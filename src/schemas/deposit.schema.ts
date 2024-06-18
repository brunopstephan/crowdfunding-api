import z from 'zod'

export const depositSchema = z.object({
  id: z.string(),
  crowdfunding_id: z.string(),
  payer: z.string().nullable(),
  amount: z.number(),
  created_at: z.string(),
})

export type Deposit = z.infer<typeof depositSchema>
