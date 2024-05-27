<body>
			<div class="block">
				<input
					type="file"
					id="file-uploader"
					accept="image/*"
					style="display:none;"
				/>
			<div class="tabs">
				<label class="text" for="name">Фамилия и имя:</label>
				<input
					type="text"
					id="name"
					
					placeholder="Popka Petrovich"
					
				/>
				<label for="email" class="text">Email</label>
				<input type="email" id="name" placeholder="popka1337@zhopa.sru" />
            </div>
	
</body>
<style>
    input {
        color: white;
    }
	body {
        display: flex;
        justify-content: center;
        align-items: center;
		border-radius: 30px;
		border-width: 1px;
		border-color: black;
        margin-top: 280px;
	}
	input[type='text'],
	input[type='email'] {
		width: 100%;
		padding: 12px;
		border-radius: 30px;
		box-sizing: border-box;
		margin-bottom: 16px;
		margin-top: 10px;
	}
	.text{
        color: white;
    }
</style>