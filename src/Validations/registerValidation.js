const yup = require("yup")

const loginSchema = yup.object({
    name: yup.string().required("O nome de usuário é obrigatório!").max(15, "Seu nome de usuário deve ter menos que 15 caracteres") ,
    email: yup.string().email("Formato do email está errado.").required("O Email é obrigatório!"),
    password: yup.string().required("A senha é obrigatória!").min(6, "Sua senha deve ter no mínimo 6 caracteres")
});

module.exports = loginSchema;