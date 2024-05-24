import z from 'zod';

export const board_schema = z.object({
    name: z.string().min(3).max(50),
});

export interface BoardInterface extends z.infer<typeof board_schema> {}

export const column_schema = z.object({
    name: z.string(),
    position: z.number(),
    board_id: z.number(),
});

export const update_column_schema = z.object({
    name: z.string().optional(),
    position: z.number().optional(),
    board_id: z.number().optional(),
});

export interface CloumnInterface extends z.infer<typeof column_schema> {}
