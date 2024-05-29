<script>
    import { goto } from "$app/navigation";

  export let brand;
  export let model;
  export let year;
  export let price;
  export let features;
  export let imageUrl;
  export let id;

  let isFavourite = false;

  function toggleFavourite() {
      isFavourite = !isFavourite;
  }
</script>

<style>
  .card {
      cursor: pointer;
      max-width: 400px;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
      background: #fff;
      text-align: center;
      position: relative;
  }

  .card img {
      width: 100%;
      height: auto;
  }

  .card-body {
      padding: 20px;
  }

  .card-title {
      font-size: 1.5em;
      margin-bottom: 10px;
  }

  .card-year {
      color: #888;
      margin-bottom: 15px;
  }

  .card-price {
      font-size: 1.2em;
      color: #f60;
      margin-bottom: 15px;
  }

  .card-features {
      list-style: none;
      padding: 0;
      margin: 0;
  }

  .card-features li {
      background: #f4f4f4;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
  }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card" on:click={() => goto(`/cars/${id}`)}>
  <img src={imageUrl} alt={model} />
  <div class="card-body">
      <div class="card-title">{brand} {model}</div>
      <div class="card-year">Year: {year}</div>
      <div class="card-price">Rent: ${price}/day</div>
      <ul class="card-features">
          {#each features as feature}
          <li>{feature}</li>
          {/each}
      </ul>
  </div>
</div>
