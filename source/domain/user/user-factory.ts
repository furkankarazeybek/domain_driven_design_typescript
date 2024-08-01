import { injectable } from 'inversify';
import { IUser } from './user-model';

@injectable()
export class UserFactory {
  
  // createUser metodunun dönüş değerini IUser tipinde döndürmeliyiz.
  createUser(name: string, surname: string, email: string, password: string, roleId: string): IUser {
    return {
      _id: new ObjectId(), // MongoDB tarafından otomatik oluşturulur
      name: name,
      surname: surname,
      email: email,
      password: password,
      roleId: new ObjectId(roleId), // `roleId` string'ini `ObjectId`'ye dönüştürün
      rolePermissionIds: [] // Eğer başlangıçta boş bir dizi varsa
    } as IUser;
  }
}
