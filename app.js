import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './Routes/user.routes.js';
import authrouter from './Routes/auth.routes.js';
import subscriptionRouter from './Routes/subscription.router.js';


const app = express();
app.get('/', (req,res)=>{
    res.send('Welcome to the subscription tracker');
});
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
export default app;