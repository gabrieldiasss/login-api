const yup = require("yup")

const loginSchema = yup.object({
    email: yup.string().email("Formato do email está errado.").required("Campo email é requirido"),
    password: yup.string().required("Campo senha é requirido!")
});

module.exports = loginSchema;