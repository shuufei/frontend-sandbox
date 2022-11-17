export {};

// cloudflare/workers-types
// https://github.com/cloudflare/workers-types#using-bindings
declare global {
  const RAINDROP_CACHE: KVNamespace;
}
