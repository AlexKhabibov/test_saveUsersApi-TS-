import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

type User = {
    name: string;
    email: string;
};

const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

function readUsers(): User[] {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
}

function saveUsers(users: User[]) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/api/register', (req: Request, res: Response) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Указаны имя и почту обязятельно' })
    }

    const users = readUsers();
    const newUser: User = { name, email };
    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: 'Пользователь успешно зарегестрирован' });
});

app.get('/api/users', (req: Request, res: Response) => {
    const users = readUsers()
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запустился на адресе: http://localhost:${PORT}`);
});