interface Env {
  NODE_VERSION: string
}

export const handler = (words: string) => async (context) => {
  const url = new URL(context.request.url)
  const query = url.searchParams.get('query') as unknown as string
  const pattern = query
    .replaceAll('?', '.')
    .replaceAll(' ', '.')

  const matches = words.matchAll(new RegExp('\n' + pattern + '\n', 'g')) // eslint-disable-line 
  const solution = [...matches]
    .map(match => match[0])
    .map(match => match.replaceAll('\n', ''))

  const response = Response.json(solution)

  // TODO: migrar esto a un middleware
  const origin = context.request.headers.get('origin')
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin.includes('localhost') === true ? origin : 'palabros.io')
  // Append to/Add Vary header so browser will cache response correctly
  response.headers.append('Vary', 'Origin')

  return response
}
