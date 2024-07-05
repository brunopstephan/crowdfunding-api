import z from 'zod'

export const receiverSchema = z.object({
  id: z.string(),
  name: z.string(),
  crowdfundings_limit: z.number(),
  createdAt: z.string(),
  email: z.string(),
  password: z.string(),
})

export type Receiver = z.infer<typeof receiverSchema>
