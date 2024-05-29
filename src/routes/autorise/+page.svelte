<script>
    import { goto } from '$app/navigation';
    import  Header  from '$lib/components/Header.svelte';
    import {isAuth} from "$lib/store"

    let login = '';
    let password = '';

        async function autorise() {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "login": login,
                    "password": password
                })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.status == 401) {
                    alert('Неверный логин или пароль')
                } 
                else {
                console.log('Success:', result);
               alert('Вы успешно авторизованы!');
               isAuth.set(true);
               goto ('/')
                }
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>
    <Header />
    <form on:submit>
            <div class="back">
                <div class="form">
                    <div class="attributes"><h1>Имя пользователя</h1></div>
                    <input type="text" bind:value={login} id="username" required>
                    
                    <div class="attributes"><h1>Пароль</h1></div>
                    <input type="password" class="password" bind:value={password} id="password" required>
                    <button on:click={autorise} class="attributes">Войти</button>
                </div>
            </div>
        </form>
<style>
h1, input, button {
    text-align: center;
    color: white;
}

.back {
    background-color: #121417;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 93.2vh;
    overflow-y: hidden;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    margin: 0 auto;
}

input {
    height: 40px;
    width: 300px;
    margin: 10px 0;
    padding: 5px;
    border-radius: 10px;
    outline: none;
    background-color: rgba(255, 255, 255, 0.5);
}

button {
    margin-top: 20px;
    padding: 10px;
    width: 315px;
    border: none;
    background-color: #1A69E5;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 10px;
}

input::placeholder {
    color: #121417;
}

button:hover {
    background-color: #45a049;
}
</style>