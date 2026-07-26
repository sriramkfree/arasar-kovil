const { EdgeTTS } = require('node-edge-tts');

async function test() {
  const tts = new EdgeTTS({
    voice: 'en-US-AriaNeural'
  });
  // I need to see the available methods on EdgeTTS
  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(tts)));
}

test();
