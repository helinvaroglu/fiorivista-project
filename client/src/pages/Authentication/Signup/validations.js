import * as yup from 'yup';

// doing necessary validations for signup

const Validations = yup.object().shape({
    fullName: yup.string('Enter a valid full name.').required('* Required'),
    email: yup.string().email('Enter a valid e-mail address.').required('* Required'),
    password: yup.string().min(6, 'Password must include at least 6 characters.').required('* Required'),
    reenterPassword: yup.string().oneOf([yup.ref('password'), 'Passwords do not match.']).required('* Required'),
});

export default Validations;