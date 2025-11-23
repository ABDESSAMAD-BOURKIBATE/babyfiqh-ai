import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:3001/live');

ws.on('open', () => {
    console.log('✅ Connection successful!');
    ws.close();
});

ws.on('error', (error) => {
    console.error('❌ Connection failed:', error.message);
});
