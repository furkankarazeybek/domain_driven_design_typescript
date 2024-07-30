import mongoose, { Schema, Document } from 'mongoose';




export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  roleId: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
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
