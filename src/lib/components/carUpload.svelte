<script lang="ts">

    import ImageCrop from '$lib/components/imageCrop.svelte';

    let brand = '';
    let model = '';
    let year = '';
    let hp = '';
    let kmstand = '';
    let inputImageWidth = 600;
    let file: File | null = null;
    let croppedFile: File | null = null;

    function handleCrop(event: CustomEvent<string>) {
        const dataUrl = event.detail;

        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        croppedFile = new File([u8arr], 'cropped-image.png', { type: mime });
    }

    async function uploadFileAndData() {
        const formData = new FormData();
        formData.append('file', croppedFile || file!);
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('year', year);
        formData.append('hp', hp);
        formData.append('kmstand', kmstand);

        try {
            const response = await fetch('http://82.147.71.252:8000/cars/create_car', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>

<div class="carUpload">
    <form on:submit|preventDefault={uploadFileAndData}>
        <input type="text" bind:value={brand} placeholder="Brand" required />
        <input type="text" bind:value={model} placeholder="Model" required />
        <input type="number" bind:value={year} placeholder="Year" required />
        <input type="number" bind:value={hp} placeholder="Horsepower" required />
        <input type="number" bind:value={kmstand} placeholder="Kilometer Stand" required />
        <button type="submit">Upload</button>
    </form>

    <input type="range" min=100 max=1920 step=10 bind:value={inputImageWidth} style="width:400px">
    <div>Minimum: 100 px</div><br />
    <div>Maximum: 1920 px</div><br />
    <div>Current: {inputImageWidth} px</div><br />
    <ImageCrop inputImageWidth={inputImageWidth} on:crop={handleCrop} />
</div>

