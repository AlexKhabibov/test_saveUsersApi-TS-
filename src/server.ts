import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3000;

type User = {
    name: string;
    email: string;
};

let users: User[] = [];

app.use(cors());
app.use(express.json());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/register', (req: Request, res: Response) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Должны быть указаны имя и почта' })
    }

    users.push({ name, email });
    res.status(201).json({ message: 'Пользователь успешно зарегестрирован' });
});

app.get('/api/users', (req: Request, res: Response) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запустился на адресе: http://localhost:${PORT}`);
});