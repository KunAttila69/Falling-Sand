const grid = new Grid(Math.floor(0.15*window.innerHeight),Math.floor(0.05*window.innerWidth))
console.log(grid.height+","+grid.width)
let sandList = []
const sandColors = ["#D6C28A", "#E3BA7C", "#D9BF75", "#E5B96B", "#F0C987", "#F4B860", "#D9C08B", "#E8CD80", "#EED391", "#D3A85B", "#C9A15E", "#D7A851", "#D0B566", "#F3D78E"];
let isDown = false
let frameCount = 0;
const framesPerUpdate = 50; // Adjust this number to slow down the animation (higher = slower)

//Handle mouse status globaly
document.addEventListener("mousedown", () => {
    isDown = true
})
document.addEventListener("mouseup", () => {
    isDown = false
})

//Generates the grid
const GenerateGrid = () => {
    cont.innerHTML = ""
    //Creates row  
    for(let i = 0; i < grid.height; i++){
        let row = document.createElement("tr") 
        row.classList.add("row")
        //Creates tile
        for (let j = 0; j < grid.width; j++) {
            let tile = document.createElement("td")
            tile.classList.add("tile")
            tile.id = `tile-${i}-${j}`;
            tile.addEventListener("mouseover", () => {
                if (isDown) {
                    //Creates sand at the mouse and adjacent to it
                    CreateSand(i,j)
                    j < grid.width ? CreateSand(i,j+1) : ""
                    j > 0 ? CreateSand(i,j-1) : ""
                    i < grid.height ? CreateSand(i+1,j) : ""
                    i > 0 ? CreateSand(i-1,j) : ""
                }
            })
            tile.style.background = `${grid.grid[i][j] == 0 ? "#fff" :  sandColors[Math.floor(Math.random() * sandColors.length)]}`;
            row.appendChild(tile)
        }
        cont.appendChild(row)
    }
}

//Updates the color of each tile
const UpdateTile = (x, y) => {
    let tile = document.getElementById(`tile-${x}-${y}`);
    if (tile) {
        tile.style.background = `${grid.grid[x][y] == 0 ? "#fff" : sandColors[Math.floor(Math.random() * sandColors.length)]}`;
    }
};

const UpdateSand = () => {
    //Handles the animation speed
    frameCount++;    
    if (frameCount >= framesPerUpdate) {
        frameCount = 0;
        
        let sandMoved = false;
        sandList.forEach(sand => {
            if (sand.x < grid.height - 1 && grid.isEmpty(sand.x + 1, sand.y)) {
                //Swaps the tiles then updates both of them
                grid.swapTile(sand.x, sand.y, sand.x + 1, sand.y);
                UpdateTile(sand.x, sand.y);
                sand.x += 1;
                UpdateTile(sand.x, sand.y);
                sandMoved = true;
            }
        });

        // Only continue animating if something moved
        if (sandMoved) {
            requestAnimationFrame(UpdateSand);
        }
    } else {
        requestAnimationFrame(UpdateSand);
    }
};

//Used to control the animation more
let updateCounter = 0 
const CreateSand = (x,y) => {
    updateCounter++
    sandList.push({"x": x, "y": y})
    //Sorts by vertical position so the lower ones update first to avoid collision  
    sandList.sort((a, b) => b.x - a.x);
    grid.setTile(x,y)
    //Only updates on every 10th tick
    if (updateCounter == 10) {
        UpdateSand()
        updateCounter = 0
    }
    UpdateTile(x, y);
    if (sandList.length === 1) {
        requestAnimationFrame(UpdateSand)
    }
}
 

GenerateGrid()