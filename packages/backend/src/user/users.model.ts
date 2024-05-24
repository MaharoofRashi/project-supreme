import z from 'zod';

export const user_schema = z.object({
    name: z.string().min(3).max(50),
    password: z.string().min(8).max(16),
    email: z.string().email(),
    role: z.enum(['admin', 'employee', 'rep', 'manager']),
});

export const users_login_schema = user_schema.pick({
    email: true,
    password: true,
});
export interface UserInterface extends z.infer<typeof user_schema> {}
