import z from 'zod'

export const crowdfundingSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  goal: z.number().nullable(),
  total_amount: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Crowdfunding = z.infer<typeof crowdfundingSchema>
