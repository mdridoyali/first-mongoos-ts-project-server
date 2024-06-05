import { Schema, model } from 'mongoose';


import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const UserNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'first name can not be more then 20 characters'
    ],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  }
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: { type: String, required: [true, 'Father occupation is required'] },
  fatherContactNo: { type: String, required: [true, 'Father contact number is required'] },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: { type: String, required: [true, 'Mother occupation is required'] },
  motherContactNo: { type: String, required: [true, 'Mother contact number is required'] },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'Local guardian name is required'] },
  occupation: { type: String, required: [true, 'Local guardian occupation is required'] },
  contactNo: { type: String, required: [true, 'Local guardian contact number is required'] },
  address: { type: String, required: [true, 'Local guardian address is required'] },
});







const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true
  },
  name: {
    type: UserNameSchema,
    required: [true, 'Student name is required']
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: "{VALUE} is not a valid gender"
    },
    required: [true, 'Gender is required']
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: { type: String, required: [true, 'Emergency contact number is required'] },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: [true, 'Present address is required'] },
  permanentAddress: { type: String, required: [true, 'Permanent address is required'] },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required']
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: "active"
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
