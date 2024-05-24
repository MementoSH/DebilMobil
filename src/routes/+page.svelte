<script>
    import Footer from "$lib/components/Footer.svelte";
    import Header from "$lib/components/Header.svelte";
    import Main from "$lib/components/Main.svelte";
    import "../app.css";
</script>
<body>
<div class="jopa">   
    <Header/>
    <Main />
    <Footer/>
</div>
</body>
<style>
    .jopa{
        background-color: #121417;
        
    }   
    :global(a){
        text-decoration: none;
        color: white;
    }
    :global(hr){
        margin: 0;
    }
    :global(body) {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
     
      
    } 
</style>