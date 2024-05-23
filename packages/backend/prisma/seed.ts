import { PrismaClient } from '@prisma/client';

async function run_seed() {
    const prisma = new PrismaClient();

    await prisma.$connect();

    const seed = {
        agency: [
            {
                id: 1,
                email: 'pranavofficial404@gmail.com',
                name: 'dbx visa consultancy',
                password: 'password',
                address: 'dubai',
                phone: '9567296056',
                refresh_token: null,
            },
            {
                id: 2,
                email: 'connectmaharoof@gmail.com',
                name: 'supreme visa consultancy',
                password: 'password',
                address: 'dubai',
                phone: '9567296056',
                refresh_token: null,
            },
        ],

        users: [
            {
                id: 1,
                email: 'pranavofficial404@gmail.com',
                password: 'PranavaPassword',
                name: 'pranav',
                role: 'employee',
                agency_id: 1,
            },
            {
                id: 2,
                email: 'connectmaharoof@gmail.com',
                password: 'PranavaPassword',
                name: 'mahroof',
                role: 'employee',
                agency_id: 2,
            },
        ],

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
