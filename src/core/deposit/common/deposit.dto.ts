import z from 'zod'

export const depositCreateDtoSchema = z.object({
  crowdfunding_id: z.string({
    required_error: 'crowdfunding_id is required in body data',
    invalid_type_error: 'crowdfunding_id must be a string',
  }),
  amount: z.number({
    required_error: 'amount is required in body data',
    invalid_type_error: 'amount must be a number',
  }),
  payer: z
    .string({
      invalid_type_error: 'payer must be a string',
    })
    .optional()
    .nullable(),
})

export type DepositCreateDto = z.infer<typeof depositCreateDtoSchema>
