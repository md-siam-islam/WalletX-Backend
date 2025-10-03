import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './GlobalError/globalErrorhandle';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, WalletX!');
});


app.use(globalErrorHandler)


export default app;