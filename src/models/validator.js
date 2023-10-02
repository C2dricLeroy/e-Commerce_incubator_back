const yup = require('yup');

const userSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

module.exports = userSchema;
