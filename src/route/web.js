import express from "express";
import homeController, { getHomePage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putCRUD, deleteCRUD } from "../controllers/homeController";
import userController, {
    handleLogin, handleGetAllUsers, handleCreateNewUser, handleEditUser, handleDeleteUser,
    getAllCode
} from "../controllers/userController";
import doctorController, {
    getTopDoctorHome, getAllDoctors, postInforDoctor, getDetailDoctorById, bulkCreateSchedule, getScheduleByDate,
    getExtraInforDoctorById, getProfileDoctorId, getListPatientForDoctor
} from "../controllers/doctorController"
import patientController, { postBookAppointment, postVerifyBookAppointment } from "../controllers/patientController";
import specialtyController, { createSpecialty, handleGetAllSpecialty, getDetailSpecialtyById } from "../controllers/specialtyController";
import clinicController, { createClinic, handleGetAllClinic, getDetailClinicById } from "../controllers/clinicController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', getHomePage);
    router.get('/crud', getCRUD);

    router.post('/post-crud', postCRUD);
    router.get('/get-crud', displayGetCRUD);
    router.get('/edit-crud', getEditCRUD);
    router.post('/put-crud', putCRUD);
    router.get('/delete-crud', deleteCRUD);

    router.post('/api/login', handleLogin)
    router.get('/api/get-all-users', handleGetAllUsers);
    router.post('/api/create-new-user', handleCreateNewUser);
    router.put('/api/edit-user', handleEditUser);
    router.delete('/api/delete-user', handleDeleteUser);
    router.get('/api/allcode', getAllCode);

    router.get('/api/top-doctor-home', getTopDoctorHome);
    router.get('/api/get-all-doctors', getAllDoctors);
    router.post('/api/save-infor-doctors', postInforDoctor);
    router.get('/api/get-detail-doctor-by-id', getDetailDoctorById);
    router.post('/api/bulk-create-schedule', bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', getScheduleByDate);
    router.get('/api/get-extra-infor-doctor-by-id', getExtraInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', getProfileDoctorId);

    router.get('/api/get-list-patient-for-doctor', getListPatientForDoctor)


    router.post('/api/patient-book-appointment', postBookAppointment);
    router.post('/api/verify-book-appointment', postVerifyBookAppointment);


    router.post('/api/create-new-specialty', createSpecialty);
    router.get('/api/get-all-specialty', handleGetAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', getDetailSpecialtyById);

    router.post('/api/create-new-clinic', createClinic);
    router.get('/api/get-all-clinic', handleGetAllClinic);
    router.get('/api/get-detail-clinic-by-id', getDetailClinicById);

    return app.use("/", router);
}

module.exports = initWebRoutes;