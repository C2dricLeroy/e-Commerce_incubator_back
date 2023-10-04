const yup = require('yup');

const userSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('Le mot de passe est requis.')
    .min(8, 'Le mot de passe doit comporter au moins 8 caractères.')
    .max(255, 'Le mot de passe ne peut pas dépasser 255 caractères.')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule.')
    .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/, 'Le mot de passe doit contenir au moins un caractère spécial.'),
});

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().max(255),
});

module.exports = { userSchema, loginSchema };
