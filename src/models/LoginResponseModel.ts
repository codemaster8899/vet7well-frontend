import { UserModel } from 'src/models/UserModel';

export interface LoginResponseModel {
  token: string;
  user: UserModel;
}
