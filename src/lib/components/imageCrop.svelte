<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    let sourceImage: HTMLImageElement | null = null;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let startX = 50, startY = 50, cropWidth = 400, cropHeight = 225; // 16:9 aspect ratio
    let isDragging = false;
    let isResizing = false;
    let dragStartX: number, dragStartY: number;
    let croppedImageSrc = '';

    const dispatch = createEventDispatcher();

    export let inputImageWidth: number;

    function handleFileUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const img = new Image();
                img.src = e.target?.result as string;
                img.onload = () => {
                    sourceImage = img;
                    const maxWidth = inputImageWidth;
                    const aspectRatio = img.width / img.height;
                    const newWidth = maxWidth;
                    const newHeight = newWidth / aspectRatio;

                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = newWidth;
                    tempCanvas.height = newHeight;
                    const tempCtx = tempCanvas.getContext('2d')!;
                    tempCtx.drawImage(img, 0, 0, newWidth, newHeight);

                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    ctx = canvas.getContext('2d')!;
                    ctx.drawImage(tempCanvas, 0, 0);
                    draw();
                };
            };
            reader.readAsDataURL(file);
        }
    }

    function handleMouseDown(event: MouseEvent) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (mouseX > startX + cropWidth - 10 && mouseX < startX + cropWidth + 10 &&
            mouseY > startY + cropHeight - 10 && mouseY < startY + cropHeight + 10) {
            isResizing = true;
        } else if (mouseX > startX && mouseX < startX + cropWidth &&
            mouseY > startY && mouseY < startY + cropHeight) {
            isDragging = true;
            dragStartX = mouseX - startX;
            dragStartY = mouseY - startY;
        }
    }

    function handleMouseMove(event: MouseEvent) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (isResizing) {
            const newWidth = Math.max(20, mouseX - startX);
            const newHeight = newWidth * 9 / 16;
            cropWidth = newWidth;
            cropHeight = newHeight;
            draw();
        } else if (isDragging) {
            startX = mouseX - dragStartX;
            startY = mouseY - dragStartY;
            draw();
        } else {
            if (mouseX > startX + cropWidth - 10 && mouseX < startX + cropWidth + 10 &&
                mouseY > startY + cropHeight - 10 && mouseY < startY + cropHeight + 10) {
                canvas.style.cursor = 'nwse-resize';
            } else if (mouseX > startX && mouseX < startX + cropWidth &&
                mouseY > startY && mouseY < startY + cropHeight) {
                canvas.style.cursor = 'move';
            } else {
                canvas.style.cursor = 'crosshair';
            }
        }
    }

    function handleMouseUp() {
        isDragging = false;
        isResizing = false;
    }

    function draw(includeOverlay: boolean = true) {
        if (!ctx || !sourceImage) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);

        if (includeOverlay) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, startY);
            ctx.fillRect(0, startY, startX, cropHeight);
            ctx.fillRect(startX + cropWidth, startY, canvas.width - startX - cropWidth, cropHeight);
            ctx.fillRect(0, startY + cropHeight, canvas.width, canvas.height - startY - cropHeight);

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.strokeRect(startX, startY, cropWidth, cropHeight);

            ctx.fillStyle = 'black';
            ctx.fillRect(startX + cropWidth - 5, startY + cropHeight - 5, 10, 10);
        }
    }

    function cropImage() {
        if (startX !== undefined && startY !== undefined && cropWidth !== undefined && cropHeight !== undefined) {
            draw(false); // Рисуем без рамки и маски

            const imageData = ctx.getImageData(startX, startY, cropWidth, cropHeight);

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = cropWidth;
            tempCanvas.height = cropHeight;
            const tempCtx = tempCanvas.getContext('2d')!;
            tempCtx.putImageData(imageData, 0, 0);

            croppedImageSrc = tempCanvas.toDataURL();

            dispatch('crop', croppedImageSrc);

            draw(); // Восстанавливаем отрисовку с рамкой и маской
        }
    }
</script>

<style>
    #canvas {
        border: 1px solid black;
        cursor: crosshair;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    input[type="file"] {
        margin-bottom: 10px;
    }

    button {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }

    img {
        margin-top: 10px;
        border: 1px solid black;
        max-width: 100%;
    }
</style>

<div class="container">
    <input type="file" id="upload" accept="image/*" on:change="{handleFileUpload}">
    <br>
    <img id="sourceImage" style="display: none;" alt="">
    <br>
    <canvas id="canvas" bind:this="{canvas}" on:mousedown="{handleMouseDown}" on:mousemove="{handleMouseMove}" on:mouseup="{handleMouseUp}" width={inputImageWidth}></canvas>
    <br>
    <button on:click="{cropImage}">Обрезать Изображение</button>
    <br>
    {#if croppedImageSrc}
        <img id="croppedImage" src="{croppedImageSrc}" alt="">
    {/if}
</div>
