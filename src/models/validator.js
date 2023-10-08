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

const cartSchema = yup.object({
  cart_name: yup.string().required(),
  user_id: yup.number().required(),
});

const cartItemSchema = yup.object({
  cart_id: yup.number().required(),
  product_id: yup.number().required(),
  quantity: yup.number().required(),
});

module.exports = {
  userSchema, loginSchema, cartSchema, cartItemSchema,
};
