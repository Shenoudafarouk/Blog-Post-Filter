import NodeCache from 'node-cache';

let cache;

export default function getCache() {
  if (cache) {
    return cache;
  }

  return (cache = new NodeCache());
}
