import { where } from "sequelize";
import db from "../models/index";
require('dotenv').config();
import _ from 'lodash';
import { raw } from "body-parser";
import emailService from './emailService';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Phương Chi',
                    time: '8:30 - 9:00 Thứ năm 7/11/2024',
                    doctorName: 'Duy Tính',
                    redirectLink: 'https://www.youtube.com/watch?v=0GL--Adfqhc'
                });

                //up sert
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save infor patient succeed"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment
}