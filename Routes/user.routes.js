import { Router } from "express";

const userRouter =Router();

userRouter.get('/', (req,res)=> {
    res.send('title:fetch all users');
});

userRouter.get('/:id', (req,res)=> {
    res.send('title:fetch all users by  id');
});

userRouter.post('/', (req,res)=> {
    res.send('title:CREATE all users');
});

userRouter.put('/', (req,res)=> {
    res.send('title:update all users');
});

userRouter.delete('/', (req,res)=> {
    res.send('title:delete all users');
});
export default userRouter;


