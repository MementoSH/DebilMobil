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
            <a href=/carcard>
                <img class="image" src="/matizz.png" alt="" />
            </a>
            <div class="pizda">
                <div><h1>Марка:</h1> ДЕО МАТИЗ</div>
                <div><h1>Характеристики:</h1> 500 сил, мкпп, жопа</div>
                <div><h1>Описание:</h1> LADA Priora — компактный автомобиль семейного класса, выпускавшийся российской компанией «АвтоВАЗ» с 2007 по 2018 год. Этот переднеприводный автомобиль оснащается бензиновым двигателем объемом 1.8 литра и мощностью 123 лошадиных сил.</div>

            </div>
        </div>
        <div class="car">
            <a href=/carcard>
                <img class="image" src="/matizz.png" alt="" />
            </a>
            <div class="pizda">
                <div><h1>Марка:</h1> ДЕО МАТИЗ</div>
                <div><h1>Характеристики:</h1> 500 сил, мкпп, жопа</div>
                <div><h1>Описание:</h1> УЗБЕКСКИЙ МОНСТР</div>
            </div>
        </div>
        <div class="car">
            <a href=/carcard>
                <img class="image" src="/matizz.png" alt="" />
            </a>
            <div class="pizda">
                <div><h1>Марка:</h1> ДЕО МАТИЗ</div>
                <div><h1>Характеристики:</h1> 500 сил, мкпп, жопа</div>
                <div><h1>Описание:</h1> УЗБЕКСКИЙ МОНСТР</div>
            </div>
        </div>
        <div class="car">
            <a href=/carcard>
                <img class="image" src="/matizz.png" alt="" />
            </a>
            <div class="pizda">
                <div><h1>Марка:</h1> ДЕО МАТИЗ</div>
                <div><h1>Характеристики:</h1> 500 сил, мкпп, жопа</div>
                <div><h1>Описание:</h1> УЗБЕКСКИЙ МОНСТР</div>
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
        margin: 10px;
        margin-right: 80px;
        width: 25%;
        border-radius: 10px;
    }
    
    .car{
        display: grid;
        grid-template-columns: repeat(1 , 1fr);
         grid-auto-rows: minmax(100px, auto);
        justify-content: center;
        color: white;
        margin: 15px;
        padding: 10px;
    }
    .pizda{
        height: 450px;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        max-width: 800px;
        border-radius: 10px;
        background-color: #292E38;
        display: grid;
        padding: 15px;
    }

    .cars {
        display: grid;
    }
</style>