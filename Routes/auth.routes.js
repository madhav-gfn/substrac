import { Router } from "express";

const authrouter= Router();
authrouter.post('/sign-up', (req,res)=> res.send({title:'sign-up'}));
authrouter.post('/sign-in', (req,res)=> res.send({title:'sign-in'}));
authrouter.post('/sign-out', (req,res)=> res.send({title:'sign-out'}));
export default authrouter
