import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './GlobalError/globalErrorhandle';
import { router } from './app/route';


const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/v1',router);

app.get('/', (req, res) => {
    res.send('Hello, WalletX!');
});


app.use(globalErrorHandler)


export default app;