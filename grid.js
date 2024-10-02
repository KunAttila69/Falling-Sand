class Grid{
    constructor(width, height){
        this.width = width;
        this.height = height;
        //Generate the matrix
        this.grid = Array.from({ length: height }, () => new Array(width).fill(0));
    }

    setTile(x,y){ 
        this.grid[x][y] = 1 
    }

    swapTile(x,y,a,b){
        let temp = this.grid[a][b] 
        this.grid[a][b] = this.grid[x][y]
        this.grid[x][y] = temp
    }

    isEmpty(x,y){
        return this.grid[x][y] == 0
    }
}