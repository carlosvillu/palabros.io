export const onRequestGet: PagesFunction<unknown> = async (context) => {
  // Contents of context object
  const {
    // request, // same as existing Worker API
    // env, // same as existing Worker API
    params // if filename includes [id] or [[path]]
    // waitUntil, // same as ctx.waitUntil in existing Worker API
    // passThroughOnException, // same as ctx.passThroughOnException in existing Worker API
    // next, // used for middleware or to fetch assets
    // data // arbitrary space for passing data between middlewares
  } = context

  return await fetch(`https://dle.rae.es/${params.word as string}`).then(async resp => await resp.text())
}
