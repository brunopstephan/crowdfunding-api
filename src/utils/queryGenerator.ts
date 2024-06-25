export function queryGenerator(data: any) {
  const entries = Object.entries(data)

  const values = Array.from({ length: entries.length }, (_, i) => `$${i + 1}`)

  const fields = entries.map(([key]) => key).join(', ')

  const dataArr = entries.map(([, value]) => value)

  return { fields, values, dataArr }
}
