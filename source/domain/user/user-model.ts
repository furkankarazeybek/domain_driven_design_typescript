import mongoose, { Schema, Document } from 'mongoose';
import { IRole, Role } from '../role/role-model';

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  roleId: mongoose.Types.ObjectId;
  rolePermissionIds: IRole['permissionIds']; 
}



const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roleId: { type: mongoose.Types.ObjectId, required: true, ref: 'Role' },
});

UserSchema.virtual('role', {
  ref: 'Role',            // İlişkilendirilecek modelin adı
  localField: 'roleId',   // User modelindeki referans alanı
  foreignField: '_id',    // Role modelindeki referans alanı
  justOne: false           // Tek bir rol ile ilişkilendiriliyor
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

export const User = mongoose.model<IUser>('User', UserSchema);
