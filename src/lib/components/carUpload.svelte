<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import ImageCrop from '$lib/components/imageCrop.svelte';
    import { onMount } from 'svelte';

    let brand = '';
    let model = '';
    let year = '';
    let features = '';
    let rent = '';
    let inputImageWidth = 600;
    let file: File | null = null;
    let croppedFile: File | null = null;
    let notification = '';
    let showNotification = false;

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
        formData.append("features", features)
        formData.append("rent", rent)


        try {
            const response = await fetch('https://127.0.0.1:8080/cars/create_car', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                showNotification = true;
                notification = 'Car successfully added!';
                // setTimeout(() => {
                //     showNotification = false;
                //     location.reload();
                // }, 1000);
            } else {
                console.error('Error:', response.statusText);
                showNotification = true;
                notification = 'Failed to add car. Please try again.';
                setTimeout(() => showNotification = false, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification = true;
            notification = 'Failed to add car. Please try again.';
            setTimeout(() => showNotification = false, 1000);
        }
    }
</script>

<style>
    .carUpload {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 600px;
        margin: auto;
        margin-top: 50px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #f9f9f9;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    input[type="text"], input[type="number"], input[type="range"] {
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
    }

    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        width: 556px;
        height: 10px;
        background: #ddd;
        outline: none;
        opacity: 0.7;
        transition: opacity .15s ease-in-out;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        background: #4CAF50;
        cursor: pointer;
        border-radius: 50%;
    }

    button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #45a049;
    }

    .range-labels {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;
        margin-bottom: 10px;
    }

    .current-width {
        text-align: center;
        font-size: 14px;
        margin-bottom: 15px;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px;
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: none;
    }

    .notification.show {
        display: block;
    }
</style>

<div class="carUpload" style="width: {inputImageWidth}px;">
    <form>
        <input type="text" bind:value={brand} placeholder="Brand" required />
        <input type="text" bind:value={model} placeholder="Model" required />
        <input type="number" bind:value={year} placeholder="Year" required />
        <input type="number" bind:value={rent} placeholder="Rent" required />
        <input type="text" bind:value={features} placeholder="Features" required />
    </form>

    <input type="range" min=100 max=1920 step=10 bind:value={inputImageWidth}>
    <div class="range-labels">
        <span>Minimum: 100 px</span>
        <span>Maximum: 1920 px</span>
    </div>
    <div class="current-width">Current: {inputImageWidth} px</div>
    <ImageCrop inputImageWidth={inputImageWidth} on:crop={handleCrop} />

    <button type="submit" on:click={uploadFileAndData}>Upload</button>
</div>

<div class="notification {showNotification ? 'show' : ''}">
    {notification}
</div>
