const { PrismaClient } = require ("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Mathematics" },
                { name: "Physics" },
                { name: "Chemistry" },
                { name: "Biology" },
                { name: "Geography" },
                { name: "History" },
                { name: "Literature" },
            ]
        })
        console.log("Success!")
    } catch (error) {
        console.log("Error seeding the database categories", error)
    } finally {
        await database.$disconnect();
    }
}

main();