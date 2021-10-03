import { UserAuthVo, UserVo } from "codeartist-core";
import userModel from '../model/users.model';
import userAuthModel from '../model/user-auth.model';

import bcrypt from 'bcrypt';

export class UserService {
    /* ************************************* Public Methods ******************************************** */
    public saveUser = async (user: UserVo): Promise<UserVo | null> => {
        try {
            await this._saveUserAuth(user);
            return await userModel.create(user);
        } catch (error) {
            throw error;
        }
    };

    /* ************************************* Private Methods ******************************************** */
    private _saveUserAuth = async (user: UserVo): Promise<void> => {
        if (!user._id) {
            const userAuth = {} as UserAuthVo;
            const password = await bcrypt.hash(user.cell.trim(), 3);
            userAuth.email = user.email ?? '';
            userAuth.password = password;
            userAuth.passwordTemp = true;
            await userAuthModel.create(userAuth);
        }
    }
}