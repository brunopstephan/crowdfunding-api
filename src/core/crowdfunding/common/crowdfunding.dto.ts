import z from 'zod'

export const crowdfundingCreateDtoSchema = z.object({
  receiver_id: z.string({
    required_error: 'receiver_id is required in body data',
    invalid_type_error: 'receiver_id must be a string',
  }),
  title: z.string({
    required_error: 'title is required in body data',
    invalid_type_error: 'title must be a string',
  }),
  expire_at: z
    .string({
      invalid_type_error: 'expire_at must be a string',
    })
    .nullable()
    .optional()
    .superRefine((data, ctx) => {
      if (!data) return true

      if (isNaN(new Date(data).getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'expire_at must be a valid date',
        })
        return false
      }

      if (new Date(data) < new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'expire_at must be a future date',
        })
        return false
      }

      return true
    })
    .transform((data) => (data ? new Date(data) : null)),
  goal: z
    .number({
      invalid_type_error: 'goal must be a number',
    })
    .optional()
    .nullable(),
  description: z
    .string({
      invalid_type_error: 'description must be a string',
    })
    .optional()
    .nullable(),
})

export type CrowdfundingCreateDto = z.infer<typeof crowdfundingCreateDtoSchema>

export const crowdfundingUpdateDtoSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'title must be a string',
    })
    .nullable()
    .optional(),
  description: z
    .string({
      invalid_type_error: 'description must be a string',
    })
    .nullable()
    .optional(),
  goal: z
    .number({
      invalid_type_error: 'goal must be a number',
    })
    .nullable()
    .optional(),
  id: z.string({
    required_error: 'id is required in body data',
    invalid_type_error: 'id must be a string',
  }),
  expire_at: z
    .string({
      invalid_type_error: 'expire_at must be a string',
    })
    .nullable()
    .optional()
    .superRefine((data, ctx) => {
      if (!data) return true

      if (isNaN(new Date(data).getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'expire_at must be a valid date',
        })
        return false
      }

      if (new Date(data) < new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'expire_at must be a future date',
        })
        return false
      }

      return true
    })
    .transform((data) => (data ? new Date(data) : null)),
})

export type CrowdfundingUpdateDto = z.infer<typeof crowdfundingUpdateDtoSchema>
