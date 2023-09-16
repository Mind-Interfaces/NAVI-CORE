import 'uneeq-js'

/**
 * yoga-layout trys to use TextDecoder('utf-16le')
 * It can handle TextDecoder===undefiend itself
 * But uneeq-js uses a polyfill so yoga-layout trys to use that
 * We need to swap TextDecoder('utf8') to TextDecoder('utf-8') to get around the fact
 *    that uneeq-js version of fast-text-encoding is outdated and can't handle 'utf8'
 * We also need to handle TextDecoder('utf-16le')
 *    yoga-layout sees that TextDecoder exists but doen't realise it's a minimal polyfill
 *    and tries to use it. If if did not exist yoga-layout would be fine. Luckily returning
 *    undefeind from `new TextDecoder('utf-16le')` triggers yoga-layout's fallback code
 */

// Prevent "must contain at least one test"
test.skip('skip', () => {})

try {
  // try to use 'utf-16le' (fast-text-encoding polyfill can't handle it, real encoder can)
  new TextDecoder('utf-16le')
} catch (e) {
  // replace with fake encoder
  class HackTextDecoder extends TextDecoder{
    constructor(encoding, ...args){
      if(encoding === 'utf8'){
        // swap TextDecoder('utf8') to TextDecoder('utf-8')
        return super('utf-8', ...args)}
      if(encoding === "utf-16le"){
        // return undefeind from new TextDecoder('utf-16le')
        super('utf-8', ...args)
        return undefined
      }
      // else proceed as normal
      return super(encoding, ...args)
    }
  }
  Object.assign(global, { TextDecoder: HackTextDecoder })
}
