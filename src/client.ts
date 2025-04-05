const form = document.querySelector('#registration-form') as HTMLFormElement;
const userList = document.querySelector('#user-list') as HTMLUListElement;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = (document.querySelector('#name') as HTMLInputElement).value;
    const email = (document.querySelector('#email') as HTMLInputElement).value;
    
    await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
    });

    form.reset();
    loadUsers();
});

async function loadUsers() {
    const res = await fetch('/api/users');
    const users = await res.json();

    userList.innerHTML = '';
    users.forEach((user: { name: string; email: string }) => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        userList.appendChild(li);
    });
}

loadUsers();