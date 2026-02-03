import mongoose from 'mongoose';
import { dburi, NODE_ENV } from '../config/env.js';


if(!dburi){
    throw new Error('thik se uri daal');
}
const connectToDatabase = async()=>{
    try{
        await mongoose.connect(dburi);
        console.log(`connected to database in ${NODE_ENV} mode`);
    }
    catch(error){
        console.error('failure to connect mongodb');
        process.exit(1);
    }
}
export default connectToDatabase;


