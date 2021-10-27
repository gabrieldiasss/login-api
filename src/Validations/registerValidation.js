const yup = require("yup")

const loginSchema = yup.object({
    name: yup.string().required("Preenche todos os campos.").max(30, "Seu nome de usuário deve ter menos que 30 caracteres.") ,
    email: yup.string().email("Formato do email está errado.").required("Preenche todos os campos."),
    password: yup.string().required("Preenche todos os campos.").min(6, "Sua senha deve ter no mínimo 6 caracteres.")
});

module.exports = loginSchema;

