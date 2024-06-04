import z from 'zod'

export const receiverCreateDtoSchema = z.object({
  name: z.string({
    required_error: 'name is required in body data',
    invalid_type_error: 'name must be a string',
  }),
})

export type ReceiverCreateDto = z.infer<typeof receiverCreateDtoSchema>

export const receiverUpdateDtoSchema = z.object({
  name: z.string({
    required_error: 'name is required in body data',
    invalid_type_error: 'name must be a string',
  }),
  id: z.string({
    required_error: 'id is required in body data',
    invalid_type_error: 'id must be a string',
  }),
})

export type ReceiverUpdateDto = z.infer<typeof receiverUpdateDtoSchema>
