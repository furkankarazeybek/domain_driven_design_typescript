import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl: string = process.env.DB_URI || '';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            
        });
        console.log(`database connected`);
    } catch (error) {
        console.log(error);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;