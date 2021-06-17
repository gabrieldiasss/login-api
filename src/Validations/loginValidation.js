const yup = require("yup")

const loginSchema = yup.object({
    email: yup.string().email("É necessário ter @ no email.").required("Campo email é requirido"),
    password: yup.string().required("Campo senha é requirido!")
});

module.exports = loginSchema;