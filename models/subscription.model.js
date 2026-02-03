import mongoose from "mongoose";
const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'];
const FREQUENCY =['daily', 'weekly', ' monthly', 'quaterly', 'yearly']
const CATEGORIES = [
    'streaming', 
    'software', 
    'gaming', 
    'music', 
    'fitness', 
    'education', 
    'news', 
    'productivity', 
    'cloud_storage', 
    'communication', 
    'finance', 
    'food_delivery', 
    'transportation', 
    'shopping', 
    'other'
];

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'subscription name required'],
        trim: true,
        MinLength:2,
        MaxLength:23
        
    },
    price:{
        type: Number,
        required:[true, 'subscription price is needed'],
        min:[0, 'price must be greater than 0']
    },
    currency:{
        type:String,
        enum: CURRENCIES,
        default:'INR'
    },
    frequency:{
        type:Number,
        enum: FREQUENCY

    },
    catagory:{
        type: String,
        required:true,
        enum: CATEGORIES

    },
    paymentMethod:{
        type: String,
        required: true,
        trim:true
    },
    status:{
        type:String,
        enum:['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate:{
        type: Date,
        required:true,
        validate:{ 
            validator:(value)=>new Date(),
            message: 'start date future mai kaise hai?'

        }
    },
    renewalDate: {
        type: Date,
        validate:{ 
            validator: function(value){
                return value =>this.startDate;
            },
            message: 'start date ke baad ki renewal date daal'

        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        index:true
    }
},  {timestamps: true});
// Auto-calculate renewal date if missing
subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      quarterly: 90,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
});
