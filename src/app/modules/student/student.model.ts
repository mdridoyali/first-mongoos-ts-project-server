import { Schema, model } from 'mongoose';


import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  TUserName,
  StudentModel,
} from './student.interface';
import { boolean } from 'joi';
import bcrypt from 'bcrypt'
import config from '../../config';

const UserNameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: { type: String, required: [true, 'Father occupation is required'] },
  fatherContactNo: { type: String, required: [true, 'Father contact number is required'] },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: { type: String, required: [true, 'Mother occupation is required'] },
  motherContactNo: { type: String, required: [true, 'Mother contact number is required'] },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local guardian name is required'] },
  occupation: { type: String, required: [true, 'Local guardian occupation is required'] },
  contactNo: { type: String, required: [true, 'Local guardian contact number is required'] },
  address: { type: String, required: [true, 'Local guardian address is required'] },
});







const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password can not be more then 20 characters']
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
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not a valid status'
    },
    default: "active"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: {
    virtuals: true
  }
});

// virtual
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + " " + this.name.middleName + " " + this.name.lastName
})



//pre save middleware / hook : will work on create() save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save data');
  // hashing password and save into DB
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  next()
})

//post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '',
    next()
})

// Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})



// creating a custom static method
studentSchema.statics.isUserExists = async function (id: String) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}


// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
