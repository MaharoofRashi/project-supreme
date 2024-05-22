import { PrismaClient } from '@prisma/client';

async function run_seed() {
    const prisma = new PrismaClient();

    await prisma.$connect();

    const seed = {
        agency: [],

        users: [],

        boards: [],

        columns: [],

        tasks: [],

        user_tasks: [],

        customers: [],
    };

    for (const model in seed) {
        for (const data of seed[model]) {
            await prisma[model].create({ data });
        }
    }
}

run_seed()
    .then((result) => {
        console.log('database seeded successfully');
    })
    .catch((err) => {
        console.log('error in seeding ', err);
    });
