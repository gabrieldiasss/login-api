const yup = require("yup")

const loginSchema = yup.object({
    name: yup.string().max(15, "Seu nome de usuário deve ter menos que 15 caracteres").required("O nome de usuário é obrigatório!") ,
    email: yup.string().email("Formato do email está errado.").required("O Email é obrigatório!"),
    password: yup.string().min(6, "Sua senha deve ter no mínimo 6 caracteres").required("A senha é obrigatória!")
});

module.exports = loginSchema;