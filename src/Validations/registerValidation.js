const yup = require("yup")

const loginSchema = yup.object({
    name: yup.string().required("Para você se cadastar todos campos precisam estar preenchidos.").max(15, "Seu nome de usuário deve ter menos que 15 caracteres") ,
    email: yup.string().email("Formato do email está errado.").required("Para você se cadastar todos campos precisam estar preenchidos."),
    password: yup.string().required("Para você se cadastar todos campos precisam estar preenchidos.").min(6, "Sua senha deve ter no mínimo 6 caracteres")
});

module.exports = loginSchema;

