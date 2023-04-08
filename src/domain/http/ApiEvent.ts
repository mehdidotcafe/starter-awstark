import {
  z, ZodObject, ZodRawShape,
} from 'zod'

type ApiEvent<EventSchema extends ZodObject<ZodRawShape> = ZodObject<ZodRawShape>> = {
  headers: Record<string, string>
} & Pick<z.infer<EventSchema>, 'body' | 'queryStringParameters'>

export default ApiEvent
