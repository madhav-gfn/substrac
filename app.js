import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './Routes/user.routes.js';
import authrouter from './Routes/auth.routes.js';
import subscriptionRouter from './Routes/subscription.router.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './Middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(errorMiddleware);
app.use('/api/v1/auth', authrouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.get('/', (req,res)=>{
    res.send('Welcome to the subscription tracker');
});
app.listen(PORT, async() => {
    console.log(`Server running on port http://localhost:${PORT}`);
    await connectToDatabase();
});
export default app;