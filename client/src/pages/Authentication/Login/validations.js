import * as yup from 'yup';

// doing necessary validations for log in

const Validations = yup.object().shape({
    email: yup.string().email('Enter a valid e-mail address.').required('* Required'),
    password: yup.string().min(6, 'Password must include at least 6 characters.').required('* Required'),
});

export default Validations;