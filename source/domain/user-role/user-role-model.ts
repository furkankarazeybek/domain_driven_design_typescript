import mongoose, { Schema, Document } from 'mongoose';

export interface IUserRole extends Document {
  userId: String;
  roleId: String;
}

const UserRoleSchema: Schema = new Schema({
  userId: { type: String, required: true, ref: 'User' },
  roleId: { type: String, required: true, ref: 'Role' }
});

export const UserRole = mongoose.model<IUserRole>('UserRole', UserRoleSchema);
