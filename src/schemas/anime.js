const z = require("zod")

exports.serieSchema = z.strictObject({
    title: z.string(),
    seasons: z.coerce.number().positive().optional(),
    chapters: z.coerce.number().positive().optional(),
    author: z.string(),
    watch_status: z.enum(['planned','watching','completed','on_hold','dropped']),
    description: z.string().optional(),
    review: z.string().optional(),
    idImage: z.coerce.number().optional()
})

exports.contentSchema = z.strictObject({
    id_serie: z.coerce.number().positive(),
    title: z.string(),
    type: z.enum(['season', 'film', 'ova']),
    watch_order: z.coerce.number().positive().optional(),
    chapters: z.coerce.number().positive().optional(),
    watch_status: z.enum(['planned','watching','completed','on_hold','dropped']),
    review: z.string().optional(),
    duration: z.coerce.number().positive().nullable().optional()
})