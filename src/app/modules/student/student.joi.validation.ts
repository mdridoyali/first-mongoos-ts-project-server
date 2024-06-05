import Joi from "joi";
import validator from "validator";

// creating a schema validation using joi
const UserNameValidationSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .max(20)
        .required()
        .regex(/^[A-Z][a-z]*$/)
        .messages({
            'string.empty': 'First name is required',
            'string.max': 'First name cannot be more than 20 characters',
            'string.pattern.base': '{#value} is not in capitalize format'
        }),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
        .required()
        .custom((value, helpers) => {
            if (!validator.isAlpha(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .messages({
            'string.empty': 'Last name is required',
            'any.invalid': '{#value} is not valid'
        }),
});

const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
        'string.empty': 'Father name is required'
    }),
    fatherOccupation: Joi.string().required().messages({
        'string.empty': 'Father occupation is required'
    }),
    fatherContactNo: Joi.string().required().messages({
        'string.empty': 'Father contact number is required'
    }),
    motherName: Joi.string().required().messages({
        'string.empty': 'Mother name is required'
    }),
    motherOccupation: Joi.string().required().messages({
        'string.empty': 'Mother occupation is required'
    }),
    motherContactNo: Joi.string().required().messages({
        'string.empty': 'Mother contact number is required'
    }),
});

const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Local guardian name is required'
    }),
    occupation: Joi.string().required().messages({
        'string.empty': 'Local guardian occupation is required'
    }),
    contactNo: Joi.string().required().messages({
        'string.empty': 'Local guardian contact number is required'
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Local guardian address is required'
    }),
});

const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
        'string.empty': 'Student ID is required'
    }),
    name: UserNameValidationSchema.required().messages({
        'any.required': 'Student name is required'
    }),
    gender: Joi.string().valid('male', 'female', 'others').required().messages({
        'any.only': '{#value} is not a valid gender',
        'string.empty': 'Gender is required'
    }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': '{#value} is not a valid email'
    }),
    contactNo: Joi.string().required().messages({
        'string.empty': 'Contact number is required'
    }),
    emergencyContactNo: Joi.string().required().messages({
        'string.empty': 'Emergency contact number is required'
    }),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
    presentAddress: Joi.string().required().messages({
        'string.empty': 'Present address is required'
    }),
    permanentAddress: Joi.string().required().messages({
        'string.empty': 'Permanent address is required'
    }),
    guardian: guardianValidationSchema.required().messages({
        'any.required': 'Guardian information is required'
    }),
    localGuardian: localGuardianValidationSchema.required().messages({
        'any.required': 'Local guardian information is required'
    }),
    profileImg: Joi.string().optional(),
    isActive: Joi.string().valid('active', 'blocked').default('active')
});

export default studentValidationSchema