import { app } from './app';

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log('Server is up on port %s! 🚀🚀🚀', PORT);
});
