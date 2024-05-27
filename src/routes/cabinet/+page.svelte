<script>
	import Header from "$lib/components/Header.svelte";
	import Cabinet from "$lib/components/Cabinet.svelte";
</script>
<Header />
<div class="main">	
	<Cabinet />
</div>
<style>
	.main{
		display: grid;
		justify-content: center;
	}
</style>