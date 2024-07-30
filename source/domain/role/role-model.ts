import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  roleName: string;
  permissionIds: Array<string>; 
}

const RoleSchema: Schema = new Schema({
  roleName: { type: String, required: true },
  permissionIds: { type: [String], required: true } 
});

export const Role = mongoose.model<IRole>('Role', RoleSchema);
