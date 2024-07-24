import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  roleId: number;
  roleName: string;
}

const RoleSchema: Schema = new Schema({
  roleId: { type: Number, required : true},
  roleName: { type: String, required: true }
});

export const Role = mongoose.model<IRole>('Role', RoleSchema);
