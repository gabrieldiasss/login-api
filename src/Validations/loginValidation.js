const yup = require("yup")

const loginSchema = yup.object({
    email: yup.string().email("Formato do email está errado.").required("Preenche todos os campos."),
    password: yup.string().required("Preenche todos os campos.")
});

module.exports = loginSchema;