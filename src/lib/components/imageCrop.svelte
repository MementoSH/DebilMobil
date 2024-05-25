<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    let sourceImage: HTMLImageElement | null = null;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let startX = 50, startY = 50, cropSize = 400;
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

        if (mouseX > startX + cropSize - 10 && mouseX < startX + cropSize + 10 &&
            mouseY > startY + cropSize - 10 && mouseY < startY + cropSize + 10) {
            isResizing = true;
        } else if (mouseX > startX && mouseX < startX + cropSize &&
            mouseY > startY && mouseY < startY + cropSize) {
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
            cropSize = Math.max(20, Math.min(mouseX - startX, mouseY - startY));
            draw();
        } else if (isDragging) {
            startX = mouseX - dragStartX;
            startY = mouseY - dragStartY;
            draw();
        } else {
            if (mouseX > startX + cropSize - 10 && mouseX < startX + cropSize + 10 &&
                mouseY > startY + cropSize - 10 && mouseY < startY + cropSize + 10) {
                canvas.style.cursor = 'nwse-resize';
            } else if (mouseX > startX && mouseX < startX + cropSize &&
                mouseY > startY && mouseY < startY + cropSize) {
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
            ctx.fillRect(0, startY, startX, cropSize);
            ctx.fillRect(startX + cropSize, startY, canvas.width - startX - cropSize, cropSize);
            ctx.fillRect(0, startY + cropSize, canvas.width, canvas.height - startY - cropSize);

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.strokeRect(startX, startY, cropSize, cropSize);

            ctx.fillStyle = 'black';
            ctx.fillRect(startX + cropSize - 5, startY + cropSize - 5, 10, 10);
        }
    }

    function cropImage() {
        if (startX !== undefined && startY !== undefined && cropSize !== undefined) {
            draw(false); // Рисуем без рамки и маски

            const imageData = ctx.getImageData(startX, startY, cropSize, cropSize);

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = cropSize;
            tempCanvas.height = cropSize;
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
</style>

<input type="file" id="upload" accept="image/*" on:change="{handleFileUpload}">
<br>
<img id="sourceImage" style="display: none;" alt="">
<br>
<canvas id="canvas" bind:this="{canvas}" on:mousedown="{handleMouseDown}" on:mousemove="{handleMouseMove}" on:mouseup="{handleMouseUp}" width={inputImageWidth}></canvas>
<br>
<button on:click="{cropImage}">Обрезать Изображение</button>
<br>
{#if croppedImageSrc}
    <img id="croppedImage" src="{croppedImageSrc}" style="border: 1px solid black;" alt="">
{/if}
