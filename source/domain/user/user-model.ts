import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../user-role/user-role-model';
import { injectable } from 'inversify';


export interface IUser extends Document {
  userName: string;
  roleId: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true },
  roleId: { type: mongoose.Types.ObjectId, required: true, ref: 'Role' },
});

// UserSchema.virtual('role', {
//     ref: 'Role',            
//     localField: 'roleId',   
//     foreignField: 'roleId',    
//     justOne: true           
//   });


//   UserSchema.post<IUser>('save', async function (doc) {
//     try { 
//       await UserRole.create({ userId: doc._id, roleId: doc.roleId });
//     } catch (error) {
//       console.error('Error adding userRole:', error);
//     }
//   });
export const User = mongoose.model<IUser>('User', UserSchema);
