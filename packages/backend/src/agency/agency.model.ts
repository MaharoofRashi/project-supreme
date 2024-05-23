import z from 'zod';

const agency_schema = z.object({
    name: z.string().min(3).max(50),
    address: z.string().min(3).max(50),
    phone: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(16),
});

export interface AgencyInterface extends z.infer<typeof agency_schema> {}

const user_schema = z.object({
    name: z.string().min(3).max(50),
    password: z.string().max(8).max(16),
    email: z.string().email(),
    role: z.enum(['admin', 'employee', 'rep', 'manager']),
});

export interface UserInterface extends z.infer<typeof user_schema> {}
