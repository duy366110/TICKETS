import { required, regex } from 'react-admin';

export const RULES = {
    notEmpty: required('Must not be empty'),
    email: regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),
    phone: regex(/^(\+84)?[0-9]{10,11}$/, 'Invalid phone number')
}
