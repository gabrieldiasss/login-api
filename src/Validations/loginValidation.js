const yup = require("yup")

const loginSchema = yup.object({
    email: yup.string().email("Formato do email está errado.").required("Para você se cadastar todos campos precisam estar preenchidos."),
    password: yup.string().required("Para você se cadastar todos campos precisam estar preenchidos.")
});

module.exports = loginSchema;