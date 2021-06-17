const yup = require("yup")

const loginSchema = yup.object({
    name: yup.string().required("O nome é obrigatório") ,
    email: yup.string().email("É necessário ter @ no email.").required("O email é requirido"),
    password: yup.string().min(6, "Sua senha deve ter no mínimo 6 caracteres").required("A senha é obrigatória!")
});

module.exports = loginSchema;