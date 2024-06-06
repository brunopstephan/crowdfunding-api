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
})

export type CrowdfundingUpdateDto = z.infer<typeof crowdfundingUpdateDtoSchema>
