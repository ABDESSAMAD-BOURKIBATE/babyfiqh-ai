import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { GoogleGenAI, Modality } from '@google/genai';

const PORT = process.env.LIVE_PROXY_PORT || 3001;

console.log('--- Server Startup ---');
console.log('Loading .env.local...');
console.log('API Key present:', !!(process.env.GEMINI_API_KEY || process.env.API_KEY));
console.log('Port:', PORT);


const app = express();
app.get('/', (req, res) => res.send('Live proxy running'));

const server = createServer(app);

const wss = new WebSocketServer({ server, path: '/live' });

wss.on('connection', (ws, req) => {
  console.log('New WS connection from', req.socket.remoteAddress, 'url', req.url);
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    ws.send(JSON.stringify({ type: 'error', message: 'API key missing on server' }));
    ws.close();
    return;
  }

  const url = req.url || '';
  const search = new URL('http://localhost' + url).searchParams;
  const voiceName = search.get('voice') || 'Fenrir';

  const liveAi = new GoogleGenAI({ apiKey });

  const session = liveAi.live.connect({
    model: 'gemini-2.0-flash-exp',
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName } },
      },
      outputAudioTranscription: {},
    },
    callbacks: {
      onopen: () => {
        ws.send(JSON.stringify({ type: 'open' }));
      },
      onmessage: (message) => {
        try {
          const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (base64Audio) ws.send(JSON.stringify({ type: 'audio', data: base64Audio }));

          const textPart = message.serverContent?.modelTurn?.parts?.find((p) => p.text);
          if (textPart && textPart.text) ws.send(JSON.stringify({ type: 'transcription', text: textPart.text }));

          if (message.serverContent?.outputTranscription?.text) {
            ws.send(JSON.stringify({ type: 'transcription', text: message.serverContent.outputTranscription.text }));
          }
        } catch (e) {
          ws.send(JSON.stringify({ type: 'error', message: String(e) }));
        }
      },
      onclose: () => {
        try { ws.send(JSON.stringify({ type: 'close' })); } catch (e) { }
      },
      onerror: (e) => {
        try { ws.send(JSON.stringify({ type: 'error', message: e?.message || String(e) })); } catch (err) { }
      },
    },
  });

  ws.on('message', (msg) => {
    console.log('WS message from client:', msg.toString().slice(0, 200));
    try {
      const parsed = JSON.parse(msg.toString());
      if (parsed?.type === 'input' && parsed.media) {
        session.sendRealtimeInput({ media: parsed.media });
      }
    } catch (e) {
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    try { session.close(); } catch (e) { }
  });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Live proxy listening on http://localhost:${PORT}/live`);
});
