<script>
    import Footer from "$lib/components/Footer.svelte";
    import Header from "$lib/components/Header.svelte";
    import "../app.css";
</script>
<body>
<div class="jopa">   
    <Header/>
    <Footer/>
</div>
</body>
<style>
    .jopa{
        background-color: black;
        
    }   
    :global(body) {
      gap: 0;
      margin: 0;
      overflow-y: hidden;
    } 
</style>