import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req,res)=> res.send('title: get all subscription'));

subscriptionRouter.get('/:id', (req,res)=> res.send('title: get all by id subscription'));

subscriptionRouter.post('/', (req,res)=> res.send('title: create all subscription'));

subscriptionRouter.put('/', (req,res)=> res.send('title: update all subscription'));

subscriptionRouter.delete('/', (req,res)=> res.send('title: deleet all subscription'));

subscriptionRouter.get('/user/:id', (req,res)=> res.send('title: get all uiser subscription'));

subscriptionRouter.get('/:id/cancel', (req,res)=> res.send('title: cancel uiser subscription'));

subscriptionRouter.get('/upcoming-renewals', (req,res)=> res.send('title: cancel subscription'));




export default subscriptionRouter;
