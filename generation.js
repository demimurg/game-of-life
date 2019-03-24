class Generation {

	constructor() {
		this.field = []
	}

	copyArr(arr) {				
		let new_arr = []
		for (let i = 0; i < width/k; i++) {
			new_arr[i] = []
			for (let j = 0; j < height/k; j++){
				new_arr[i][j] = arr[i][j]
			}
		}

		new_arr[-1] = []
		new_arr[width/k] = []

		new_arr[-1][-1] = arr[width/k - 1][height/k - 1]		//левый верхний угол
		new_arr[-1][height/k] = arr[width/k - 1][0]					//левый нижний угол
		new_arr[width/k][-1] = arr[0][height/k - 1] 					//правый верхний угол
		new_arr[width/k][height/k] = arr[0][0]						//правый нижний угол

		for (let i = 0; i < width/k; i++) {
			new_arr[i][-1] = arr[i][height/k - 1]
			new_arr[i][height/k] = arr[i][0]
		}

		for (let j = 0; j < height/k; j++) {
			new_arr[-1][j] = arr[width/k - 1][j]
			new_arr[width/k][j] = arr[0][j]
		}

		return new_arr		
	}



	startCondition() {
		for (let i = 0; i < width/k; i++) {
			this.field[i] = []
			for (let j = 0; j < height/k; j++){
				this.field[i][j] = 0
				rect(i*k, j*k, k, k)
			}
		}
	}


	new() {
		let field_buffer = this.copyArr(this.field)
		for (let i = 0; i < width/k; i++) {
			for (let j = 0; j < height/k; j++){
				
				//считаем живых/мертвых соседей
				let S = (
				field_buffer[i-1][j-1]
				+ field_buffer[i-1][j]
				+ field_buffer[i-1][j+1]
				+ field_buffer[i][j-1]					
				+ field_buffer[i][j+1]
				+ field_buffer[i+1][j-1]
				+ field_buffer[i+1][j]
				+ field_buffer[i+1][j+1]
				)	
				
				// меняем значения по правилам игры
				if (field_buffer[i][j] == 1 && (S < 2 || S > 3)) {
					this.field[i][j] = 0
				}	
				if (field_buffer[i][j] == 0 && S == 3) {
					this.field[i][j] = 1
				}
			}
		}
	}

	draw() {
		for (let i = 0; i < width/k; i++) {
			for (let j = 0; j < height/k; j++){
				if (this.field[i][j] == 1) {
					rect(i*k, j*k, k, k)
					const rx = (i*k + (i+1)*k) / 2
					const ry = (j*k + (j+1)*k) / 2
					fill('black')
					ellipse(rx, ry, k - 4)
					noFill()
				}
				if (this.field[i][j] == 0)	{
					rect(i*k, j*k, k, k)
				}
			}
		}		
	}

	getAndDraw(arg) {
		let m = {}
		if (mouseX < width) m.x = mouseX
		if (mouseY < height) m.y = mouseY
		while (m.x % k != 0) m.x--
		while (m.y % k != 0) m.y--
		
		let i = m.x/k
		let j = m.y/k

		switch (this.field[i][j]) {
			case 1:
				if (arg == 'can kill') { 
					this.field[i][j] = 0
					fill('white')
					ellipse( (i*k + (i+1)*k) / 2, (j*k + (j+1)*k) / 2, k - 4)
					noFill()
				}
				break
			case 0:
				this.field[i][j] = 1
				fill('black')
				ellipse( (i*k + (i+1)*k) / 2, (j*k + (j+1)*k) / 2, k - 4)
				noFill()
				break

		}
	}	
}
