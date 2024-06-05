import * as z from 'zod'

export const HackFormSchema = z.object({
    title: z.string().min(3, 'Title must be atleast 3 characters'),
    description: z.string().min(3, 'Description must be atleast 3 characters').max(500, 'Description can not exceed 500 characters'),
    location: z.string().min(3, 'Location must be atleast 3 characters').max(400, 'Location must be less than 400 characters'),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
})