<script>
    import Header from "$lib/components/Header.svelte";
</script>
<Header />
<div class="main">
    <div class="header">
        <a href="/">
            <img src="/arrow.png" alt="">
        </a>
    </div>
    <div class="cars">
        <div class="car">
            <img class="image" src="/matizz.png" alt="">
            <div class="pizda">
                <div>Марка: ДЕО МАТИЗ</div>
                <div>Характеристики: 500 сил, мкпп, жопа</div>
                <div>Описание: УЗБЕКСКИЙ МОНСТР</div>
                <div>Контакт для связи: <a href="tel:+79227699080">главный дизайнер</a></div>
            </div>
        </div>
        <div class="car">
            <img class="image" src="/matizz.png" alt="">
            <div class="pizda">
                <div>Марка: ДЕО МАТИЗ</div>
                <div>Характеристики: 500 сил, мкпп, жопа</div>
                <div>Описание: УЗБЕКСКИЙ МОНСТР</div>
                <div>Контакт для связи: <a href="tel:+79227699080">главный дизайнер</a></div>
            </div>
        </div>
        <div class="car">
            <img class="image" src="/matizz.png" alt="">
            <div class="pizda">
                <div>Марка: ДЕО МАТИЗ</div>
                <div>Характеристики: 500 сил, мкпп, жопа</div>
                <div>Описание: УЗБЕКСКИЙ МОНСТР</div>
                <div>Контакт для связи: <a href="tel:+79227699080">главный дизайнер</a></div>
            </div>
        </div>
        <div class="car">
            <img class="image" src="/matizz.png" alt="">
            <div class="pizda">
                <div>Марка: ДЕО МАТИЗ</div>
                <div>Характеристики: 500 сил, мкпп, жопа</div>
                <div>Описание: УЗБЕКСКИЙ МОНСТР</div>
                <div>Контакт для связи: <a href="tel:+79227699080">главный дизайнер</a></div>
            </div>
        </div>
    </div>
</div>


<style>

.main{


    background-color: #121417;
    }
    .header {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .image{
        margin-right: 80px;
        width: 25%;
        border-radius: 10px;
    }
    
    .car{
        display: flex;
        justify-content: center;
        color: white;
        margin: 15px;
        padding: 10px;
    }
    .pizda{
        border-radius: 10px;
        background-color: #292E38;
        display: grid;
        padding: 15px;
    }

    .cars {
        display: grid;
    }
</style>