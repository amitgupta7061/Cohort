import { Client } from "pg";
import express, { response } from 'express';

const app = express();
app.use(express.json());

const pgClient = new Client({
    user : "neondb_owner",
    password : "npg_uw2iCbMhB4GU",
    host : "ep-young-sun-a54n173n-pooler.us-east-2.aws.neon.tech",
    port : 5432,
    database :"neondb",
    ssl : true,
});

async function main() {
    await pgClient.connect();

    // const response = await pgClient.query("INSERT INTO users(username, email, password) VALUES('demo2', 'demo2@gmail.com', 'demo@123');");
    // console.log(response);

    // const res = await pgClient.query("UPDATE users SET username='amitgupta' WHERE ID=1;");
    // console.log(res);
}

main();

app.post('/signup', async (req, res) => {
    try {
        const {username, email, password, city, country, street, pincode} = req.body;

        // This is not a good way because user can inject their own query through - any field => sql injection

        // const response = await pgClient.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}');`) 


        // Best way
        const insertQuary = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`
        const addressQuary = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1, $2, $3, $4, $5);`


        // adding Begin and commit make it Transaction => that means if any one will failed then the one who is completed get reversed

        await pgClient.query("BEGIN;");
        const response = await pgClient.query(insertQuary, [username, email, password]);
        const userId = response.rows[0].id;
        const addResponse = await pgClient.query(addressQuary, [city, country, street, pincode, userId]);
        await pgClient.query("COMMIT;");


        res.json({
            message:"You Have Signup successfully!",
            addResponse,
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"Internal server Error"
        })
    }
})

app.get('/metadata', async (req, res) => {
    try {
        const id = req.query.id;

        const dataQueary = `SELECT users.username, users.email, addresses.city, addresses.country FROM users JOIN addresses ON users.id = addresses.user_id WHERE users.id = ${id}`;

        const response = await pgClient.query(dataQueary);

        res.json({
            message:"Data fetched successfully",
            response
        })

    } catch (error) {
        console.log(error);
        res.json({
            message:"Internal server Error"
        })
    }
})

app.listen(3000);