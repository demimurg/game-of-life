function Generation() {
	this.arrCeil = [];
	var m = {}; //координаты мыши


	function copyArr(arr) {				
		var arrCeilBuff = [];
		for (var i = 0; i < width/k; i++) {
			arrCeilBuff[i] = [];
			for (var j = 0; j < height/k; j++){
				arrCeilBuff[i][j] = arr[i][j];
			}
		}

		//расширяем массив, чтобы создать тор
		arrCeilBuff[-1] = [];
		arrCeilBuff[width/k] = [];

		arrCeilBuff[-1][-1] = arr[width/k-1][height/k-1];		//левый верхний угол
		arrCeilBuff[-1][height/k] = arr[width/k-1][0];			//левый нижний угол
		arrCeilBuff[width/k][-1] = arr[0][height/k-1]; 			//правый верхний угол
		arrCeilBuff[width/k][height/k] = arr[0][0];				//правый нижний угол

		for (var i = 0; i < width/k; i++) {
			arrCeilBuff[i][-1] = arr[i][height/k-1];
			arrCeilBuff[i][height/k] = arr[i][0];
		}

		for (var j = 0; j < height/k; j++) {
			arrCeilBuff[-1][j] = arr[width/k-1][j];
			arrCeilBuff[width/k][j] = arr[0][j];
		}

		return arrCeilBuff;		
	}



	this.allIsDead = function() {
		for (var i = 0; i < width/k; i++) {
			this.arrCeil[i] = [];
			for (var j = 0; j < height/k; j++){
				this.arrCeil[i][j] = 0;
				rect(i*k, j*k, k, k);
			}
		}
	}


	this.new = function() {
		var arrCeilBuff = copyArr(this.arrCeil);
		for (var i = 0; i < width/k; i++) {
			for (var j = 0; j < height/k; j++){
				
				//считаем живых/мертвых соседей
				var S = (
				arrCeilBuff[i-1][j-1]
				+ arrCeilBuff[i-1][j]
				+ arrCeilBuff[i-1][j+1]
				+ arrCeilBuff[i][j-1]					
				+ arrCeilBuff[i][j+1]
				+ arrCeilBuff[i+1][j-1]
				+ arrCeilBuff[i+1][j]
				+ arrCeilBuff[i+1][j+1]
				)	
				
				// меняем значения по правилам игры
				if (arrCeilBuff[i][j] == 1 && S < 2 || arrCeilBuff[i][j] == 1 && S > 3 ) {
					this.arrCeil[i][j] = 0;
				}	
				if (arrCeilBuff[i][j] == 0 && S == 3) {
					this.arrCeil[i][j] = 1;
				}
			}
		}
	}

	this.draw = function() {
		clear(0, 0, width, height);
		for (var i = 0; i < width/k; i++) {
			for (var j = 0; j < height/k; j++){
				if (this.arrCeil[i][j] == 1) {
					rect(i*k, j*k, k, k);
					var rx = (i*k+(i+1)*k)/2;
					var ry = (j*k+(j+1)*k)/2;
					fill("black");
					ellipse(rx, ry, k-4);
					noFill();
				}
				if (this.arrCeil[i][j] == 0)	{
					rect(i*k, j*k, k, k);
				}
			}
		}		
	}

	this.getAndDraw = function(arg) {	
		if (mouseX < width) m.x = mouseX;
		if (mouseY < height) m.y = mouseY;
		while (m.x%k != 0) m.x--;
		while (m.y%k != 0) m.y--;
		var i = m.x/k;
		var j = m.y/k;
		switch (this.arrCeil[i][j]) {
			case 1:
				if (arg == "can kill") { 
					this.arrCeil[i][j] = 0;
					fill("white");
					ellipse( (i*k+(i+1)*k)/2, (j*k+(j+1)*k)/2, k-4);
					noFill();
				}
				break;
			case 0:
				this.arrCeil[i][j] = 1;
				fill("black");
				ellipse( (i*k+(i+1)*k)/2, (j*k+(j+1)*k)/2, k-4);
				noFill();
				break;

		}
	}	
}
