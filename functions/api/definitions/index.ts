interface Env {
  NODE_VERSION: string
}

export const onRequest: PagesFunction<Env> = async (context) => {
  debugger // eslint-disable-line 
  // Contents of context object
  const {
    request // same as existing Worker API
    // env, // same as existing Worker API
    // params, // if filename includes [id] or [[path]]
    // waitUntil, // same as ctx.waitUntil in existing Worker API
    // passThroughOnException, // same as ctx.passThroughOnException in existing Worker API
    // next, // used for middleware or to fetch assets
    // data // arbitrary space for passing data between middlewares
  } = context

  return new Response(request.url)
}
