import { Filter } from './strings'

export const search = async (filters: Filter): Promise<string[]> => {
  const params = []
  if (filters.pattern) params.push('query=' + filters.pattern)
  if (filters.start) params.push('start=' + filters.start)
  if (filters.ends) params.push('ends=' + filters.ends)
  if (filters.contains) params.push('contains=' + filters.contains)
  if (filters.length) params.push('length=' + filters.length)

  const results = await fetch(import.meta.env.VITE_API_HOST + 'search?' + params.join('&'))
    .then(async resp => await resp.json())

  return results.flat(Infinity)
}
