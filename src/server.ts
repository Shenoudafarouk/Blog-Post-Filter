import http from 'http';
import app from './app';

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening @ http://localhost:${port}`);
  console.log(`Docs @ http://localhost:${port}/api-docs`);
});

export default server;
