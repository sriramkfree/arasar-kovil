import { NextResponse } from 'next/server';
import { EdgeTTS } from 'node-edge-tts';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const voiceMap: Record<string, string> = {
  'en': 'en-US-AriaNeural',
  'ta': 'ta-IN-PallaviNeural',
  'hi': 'hi-IN-SwaraNeural',
  'te': 'te-IN-ShrutiNeural',
  'kn': 'kn-IN-SapnaNeural',
  'ru': 'ru-RU-SvetlanaNeural',
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get('text');
    const lang = searchParams.get('lang') || 'en';

    if (!text) {
      return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
    }

    const voice = voiceMap[lang] || voiceMap['en'];

    // Initialize EdgeTTS
    const tts = new EdgeTTS({
      voice: voice,
      lang: lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : `${lang}-IN`,
      outputFormat: 'audio-24khz-48kbitrate-mono-mp3'
    });

    // Create a temporary file path
    const tmpDir = os.tmpdir();
    const fileName = `tts-${Date.now()}-${Math.random().toString(36).substring(7)}.mp3`;
    const tmpPath = path.join(tmpDir, fileName);

    // Generate and save to temp file
    await tts.ttsPromise(text, tmpPath);

    // Read the file back as a buffer
    const audioBuffer = await fs.readFile(tmpPath);

    // Clean up the temp file
    await fs.unlink(tmpPath).catch(err => console.error('Error cleaning up temp file:', err));

    // Return the audio response
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('TTS Error:', error);
    return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
  }
}
