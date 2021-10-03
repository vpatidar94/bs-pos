import { UserVo } from "codeartist-core";
import userModel from '../model/users.model';

export class UserService {
    /* ************************************* Public Methods ******************************************** */
    // public getContact = async (): Promise<Array<ContactVo>> => {
    //     try {
    //         const query = `SELECT * FROM ${TABLE.CONTACT}`;
    //         const snapshot = await DbService.fetch(query);
    //         return snapshot.rows as Array<ContactVo>;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // public getContactById = async (contactId: string): Promise<ContactVo | null> => {
    //     try {
    //         const query = `SELECT * FROM ${TABLE.CONTACT} WHERE sfid = '${contactId}'`;
    //         const snapshot = await DbService.fetch(query);
    //         if (snapshot.rows?.length > 0) {
    //             return snapshot.rows[0] as ContactVo;
    //         }
    //         return null;

    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public saveUser = async (user: UserVo): Promise<UserVo | null> => {
        try {
            return await userModel.create(user);
        } catch (error) {
            throw error;
        }
    };

    /* ************************************* Private Methods ******************************************** */
}