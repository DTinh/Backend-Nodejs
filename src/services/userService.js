import { where } from "sequelize";
import db from "../models/index";
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exist
                // compare password
                let user = await db.User.findOne({ //tim 1 user
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                });
                if (user) { //neu co user, ss password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {//neu co user
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;//xoa password
                        userData.user = user;//tra lai user
                    } else {//password sai
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';//tra ve message nay
                    }
                } else {// ko tim thay user
                    userData.errCode = 2;
                    userData.errMessage = 'User not found'
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other email`;
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin, checkUserEmail
}