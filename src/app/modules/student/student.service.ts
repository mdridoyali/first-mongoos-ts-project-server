import { StudentModel } from './student.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
    const result = await StudentModel.create(student);
    return result;
};

const getAllStudentsFormDb = async () => {
    const result = await StudentModel.find();
    return result;
};

const getSingleStudentFormDb = async (id: string) => {
    const result = await StudentModel.findOne({ id });
    return result;
};

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFormDb,
    getSingleStudentFormDb,
};

