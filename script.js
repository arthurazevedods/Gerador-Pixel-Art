let containerGrid = document.querySelector(".containerGrid");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let submitGrid = document.getElementById("modal-submit-grid");
var paintIcon = document.getElementById('paint-roller');


let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        mobe: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();



// Função para gerar a grade com as dimensões especificadas
function generateGrid(width, height) {
    containerGrid.innerHTML = "";
    let countId = 0;
    if (height > 64) {
        height = 64;
    }
    if (width > 64) {
        width = 64;
    }
    for (let i = 0; i < height; i++) {
        countId += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");
        
        for (let j = 0; j < width; j++) {
            countId += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${countId}`);
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }
        containerGrid.appendChild(div);
    }
}


// Evento para submeter as dimensões do grid a partir do modal
submitGrid.addEventListener("click", () => {
    let width = document.getElementById("modal-width-range").value;
    let height = document.getElementById("modal-height-range").value;
    generateGrid(width, height);

    $('#gridModal').modal('hide');
});

function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}



clearGridButton.addEventListener("click", () => {
    containerGrid.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
    erase = true;
});

paintBtn.addEventListener("click", () => {
    erase = false;
});


window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};