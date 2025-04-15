import { PrismaClient } from '@prisma/client'
import express from 'express'

const client = new PrismaClient();
const app = express();

app.get("/todos/:id", async (req, res) => {
    const id = req.params.id as unknown as number;
    const user = await client.user.findFirst({
        where: {
            id: Number(id)
        },
        select: {
            username: true,
            city: true,
            age: true,
            todos: true,
        }
    })
    res.json({
        user
    })
})

app.listen(3000);

async function makeOperation() {
    try {
        await client.user.create({
            data: {
                username: "Amit",
                password: "demo@123",
                age: 20,
                city: "Aurangabad",
            }
        });
    } catch (error) {
        console.log('Error aa gya ji')
    }

    try {
        await client.user.delete({
            where: {
                id: 2
            }
        });
    } catch (error) {
        console.log('Error aa gya ji')
    }
    
    try {
        await client.user.update({
            where: {
                id: 1
            },
            data: {
                username: "Amit Gupta"
            }
        }); 
    } catch (error) {
        console.log('Error aa gya ji')
    }

    try {
        const user = await client.user.findFirst({
            where: {
                id: 1
            },
            include: {
                todos: true
            }
        }); 
        console.log(user);
    } catch (error) {
        console.log('Error aa gya ji')
    }
}

// makeOperation()