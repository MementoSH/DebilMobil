<script>
    //@ts-nocheck
    import Header from "$lib/components/Header.svelte";
    import CarCard from '$lib/components/CarCard.svelte';
    import {goto} from "$app/navigation"
    import { onMount } from "svelte";

    // let cars = [
    // {
    //     brand: "Tesla",
    //     model: "Model S",
    //     year: 2022,
    //     price: "79",
    //     features: ["Autopilot", "Electric", "0-60 mph in 2.4s", "Full Self-Driving"],
    //     imageUrl: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg"
    // },
    // {
    //     brand: "Ford",
    //     model: "Mustang Mach-E",
    //     year: 2021,
    //     price: "50",
    //     features: ["Electric", "0-60 mph in 3.5s", "Ford Co-Pilot360", "Panoramic Roof"],
    //     imageUrl: "https://media.ford.com/content/fordmedia/fna/us/en/news/2020/11/17/all-electric-ford-mustang-mach-e-delivers/jcr:content/image.img.781.439.jpg"
    // },
    // {
    //     brand: "Audi",
    //     model: "e-tron",
    //     year: 2022,
    //     price: "65",
    //     features: ["Electric", "Quattro All-Wheel Drive", "0-60 mph in 5.5s", "Virtual Cockpit"],
    //     imageUrl: "https://www.audiusa.com/content/dam/audiusa/models/e-tron/2022/overview/2022-audi-e-tron-suv.jpg"
    // },
    // {
    //     brand: "BMW",
    //     model: "iX",
    //     year: 2022,
    //     price: "85",
    //     features: ["Electric", "0-60 mph in 4.4s", "Driving Assistant Professional", "Panoramic Sky Lounge LED Roof"],
    //     imageUrl: "https://cdn.bmwblog.com/wp-content/uploads/2021/06/2022-bmw-ix-exterior-00.jpg"
    // },
    // {
    //     brand: "Chevrolet",
    //     model: "Bolt EV",
    //     year: 2022,
    //     price: "36",
    //     features: ["Electric", "0-60 mph in 6.5s", "Regen on Demand", "Advanced Safety Features"],
    //     imageUrl: "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2022/ev/bolt-ev/mov/01-images/2022-chevrolet-bolt-ev-masthead-01.jpg"
    // },
    // {
    //     brand: "Nissan",
    //     model: "Leaf",
    //     year: 2022,
    //     price: "31",
    //     features: ["Electric", "0-60 mph in 7.4s", "ProPILOT Assist", "e-Pedal"],
    //     imageUrl: "https://cdn.motor1.com/images/mgl/8mzO1/s1/2022-nissan-leaf.jpg"
    // },
    // {
    //     brand: "Hyundai",
    //     model: "Ioniq 5",
    //     year: 2022,
    //     price: "45",
    //     features: ["Electric", "0-60 mph in 5.2s", "Augmented Reality HUD", "Solar Roof"],
    //     imageUrl: "https://www.hyundaiusa.com/us/en/images/2022/ioniq5/gallery/ext-01.jpg"
    // },
    // {
    //     brand: "Kia",
    //     model: "EV6",
    //     year: 2022,
    //     price: "42",
    //     features: ["Electric", "0-60 mph in 5.1s", "Highway Driving Assist 2", "Ultra-Fast Charging"],
    //     imageUrl: "https://www.kia.com/content/dam/kwcms/kme/uk/en/assets/vehicles/ev6/discover/kia-ev6-my22-ev6-key-visual.jpg"
    // },
    // {
    //     brand: "Porsche",
    //     model: "Taycan",
    //     year: 2022,
    //     price: "150",
    //     features: ["Electric", "0-60 mph in 2.6s", "Porsche Active Suspension Management", "Adaptive Cruise Control"],
    //     imageUrl: "https://files.porsche.com/filestore/image/multimedia/none/992-c2s-modelimage-sideshot/model/6b658b73-2c32-11ea-80c5-005056bbdc38/porsche-model.png"
    // },
    // {
    //     brand: "Jaguar",
    //     model: "I-PACE",
    //     year: 2022,
    //     price: "71",
    //     features: ["Electric", "0-60 mph in 4.5s", "All-Wheel Drive", "Meridian Audio System"],
    //     imageUrl: "https://cdn.jaguar.com/content/dam/jdx/global/27-model-year/2021/i-pace/reveal/jdx-my21-i-pace-reveal-hero.jpg"
    // }
// ];
    async function getCars() {
        try {
            const response = await fetch('/api/cars/get_cars', {
                method: 'GET'
            });
            if (response.ok) {
                const cars = await response.json();
                console.log(cars)
                cars.forEach(car => {
                    car.features = car.features.split(",").map(feature => feature.trim()).filter(item => item.length > 0);
                })
                console.log(cars)
                return cars
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    let cars = [];
    onMount(async () => {
        cars = await getCars();
    });
</script>
<Header />
<div class="bg">
    <div class="main">
        {#each cars as car}
            <CarCard 
            brand={car.brand} 
            model={car.model} 
            year={car.year} 
            price={car.price} 
            features={car.features} 
            imageUrl={`/api/files/download/cars/${car.path_to_image}`} 
            id={car.id}
            />
        {/each}
    </div>
</div>


<style>
.main {
    margin: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
}
</style>