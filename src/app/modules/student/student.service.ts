import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {

    if (await Student.isUserExists(studentData.id)) {
        throw new Error('User already exists')
    }
    const result = await Student.create(studentData); //built in static methodd

    // const student = new Student(studentData); //create an instance
    // if (await student.isUserExists(studentData.id)) {
    //     throw new Error('User already exists')
    // }

    // const result = await student.save() //built in instance method
    return result;
};

const getAllStudentsFormDb = async () => {
    const result = await Student.find();
    return result;
};

const getSingleStudentFormDb = async (id: string) => {
    // const result = await Student.findOne({ id });
    const result = await Student.aggregate([{ $match: { id: id } }])
    return result;
};

const deleteStudentFormDb = async (id: string) => {
    const result = await Student.updateOne({ id }, { isDeleted: true });
    return result;
};

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFormDb,
    getSingleStudentFormDb,
    deleteStudentFormDb,
};

