<script>
    import  Header  from '$lib/components/Header.svelte';
    import { redirect } from '@sveltejs/kit';

    let login = '';
    let password = '';
    let confpassValue = '';
    let fullName = '';

    async function register() {
        const formData = new FormData();
        formData.append('full_name', fullName);
        formData.append('login', login);
        formData.append('password', password);

        try {
            const response = await fetch('https://213.143.234.134/users/register', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                redirect(300, '/');
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    function ansValidation() {
            if(password != confpassValue) {
               window.alert("Passwords do not match!")
               password = "";
               confpassValue = "";
            }
        }

</script>


<form on:submit|preventDefault={register}>
<Header />
    <div class="back">
        <div class="form">
            <div class="attributes"><h1>Имя пользователя</h1></div>
            <input type="text" bind:value={login} id="username" required>
            
            <div class="attributes"><h1>Пароль</h1></div>
            <input type="password" class="password" bind:value={password} id="password" required>
            
            <div class="attributes"><h1>Подтвердите пароль</h1></div>
            <input type="password" class="password" bind:value={confpassValue} id="confirmPassword" required>
            <button on:click={ansValidation} class="attributes">Зарегистрироваться</button>
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
            overflow-y: hidden;
            margin: 0;
            padding: 0;
            min-height: 93.2vh;
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