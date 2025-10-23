import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './GlobalError/globalErrorhandle';
import { router } from './app/route';
import cookieParser from 'cookie-parser';
import { env } from 'process';


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.set('trust proxy', 1);

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
   })
);

app.use('/api/v1',router);

app.get('/', (req, res) => {
    res.send('Hello, WalletX!');
});


app.use(globalErrorHandler)


export default app;