import { words as xaa } from './xaa'
import { words as xab } from './xab'
import { words as xac } from './xac'
import { words as xad } from './xad'
import { words as xae } from './xae'
import { words as xaf } from './xaf'
import { words as xag } from './xag'
import { words as xah } from './xah'
import { words as xai } from './xai'

interface Env {
  NODE_VERSION: string
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const words = xaa + xab + xac + xad + xae + xaf + xag + xah + xai
  const url = new URL(context.request.url)
  const query = url.searchParams.get('query') as unknown as string
  const pattern = query
    .replaceAll('?', '.')
    .replaceAll(' ', '.')

  const matches = words.matchAll(new RegExp('\n' + pattern + '\n', 'g')) // eslint-disable-line 
  const solution = [...matches]
    .map(match => match[0])
    .map(match => match.replaceAll('\n', ''))

  const response = Response.json({
    data: { words: solution }
  })

  // TODO: migrar esto a un middleware
  const origin = context.request.headers.get('origin')
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin.includes('localhost') ? origin : 'palabros.io')
  // Append to/Add Vary header so browser will cache response correctly
  response.headers.append('Vary', 'Origin')

  return response
}
