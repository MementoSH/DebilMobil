<script>
import  Header  from '$lib/components/Header.svelte';
</script>
    <Header />
<div class="back">
    <div class="form">
        <div class="attributes"><h1>Имя пользователя</h1></div>
        <input type="text" id="username">
        
        <div class="attributes"><h1>Пароль</h1></div>
        <input class="password" id="password">
        
        <button class="attributes">Авторизоваться</button>
    </div>
</div>

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
    height: 100vh;
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