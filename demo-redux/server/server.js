import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import appRouter from './routes/index.js';

// Config
const app = express();
const port = '4090';
ViteExpress.config({ printViteDevServerHost: true });

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));
app.use(appRouter)

const user = {
  id: 1,
  name: 'Morgan',
  role: 'Intern',
  level: 'mid'
};


ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));