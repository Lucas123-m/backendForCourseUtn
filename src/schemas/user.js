const z = require("zod")

exports.userSchema = z.strictObject({
    username: z.string(),
    password: z.string()
})