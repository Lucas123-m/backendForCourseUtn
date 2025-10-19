const z = require("zod")

exports.serieSchema = z.object({
    title: z.string(),
    seasons: z.coerce.number().positive().optional(),
    chapters: z.coerce.number().positive().optional(),
    author: z.string(),
    watch_status: z.enum(['planned','watching','completed','on_hold','dropped']),
    description: z.string().optional(),
    review: z.string().optional(),
    idImage: z.coerce.number().optional()
})