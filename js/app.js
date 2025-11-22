
const mario = document.getElementById("mario");
const pipe = document.getElementById("pipe");
const telaMorreu = document.getElementById("telaMorreu");
const numeroPlacar = document.getElementById("numeroPlacar");

telaMorreu.style.visibility = "hidden";

pipe.style.right = "-80px";
mario.classList.add("parado")
let pontos = 0;
let valor = -80;

let andando = false;
let vivo = true;
let altura = 0;


document.addEventListener("keydown", async (e) => {
    console.log(e);
    if (vivo) {
        if ((e.key == " ") && !e.repeat) {
            pular();
        } else if ((e.key === "d") && !e.repeat) {
            andando = true;
            andar(true);
        } else if ((e.key === "a") && !e.repeat) {
            andando = true;
            andar(false);
        }
    }
})

document.addEventListener("keyup", async (e) => {
    if (vivo) {
        if ((e.key === "d") || (e.key === "a")) {
            mario.src = "./images/mario-parado.png";
            mario.classList.add("parado")
            mario.classList.remove("andando")
            andando = false;
        }
    }
})


const pular = () => {
    mario.src = "./images/mario-pulando.png";
    mario.classList.add("pular")
    mario.classList.add("andando")
    mario.classList.remove("parado")

    setTimeout(() => {
        mario.classList.remove("pular");
        if (!andando) {
            mario.classList.add("parado")
            mario.classList.remove("andando")
        }
        if (andando) {
            mario.src = "./images/mario.gif";
        } else {
            mario.src = "./images/mario-parado.png";
        }
    }, 2000)
}

const getRandom = (min, max) => {
    let res = Math.random();
    res = res * (min - max + 1) + min
    res = Math.floor(res)
    return res * 1
}

const andar = async (frente) => {
    mario.classList.add("andando")
    mario.classList.remove("parado")
    mario.src = "./images/mario.gif";

    while (andando) {

        if (frente) {
            valor = valor + 2;
            mario.classList.remove("inverter");
        } else {
            valor = valor - 2;
            mario.classList.add("inverter");
        }
        pipe.style.right = `${valor}px`
        await new Promise(resolve => setTimeout(resolve, 2));
        if (valor > 1000) { 
            pontos++;
            numeroPlacar.innerHTML = pontos;
            valor = -80;
            altura = getRandom(1, 30);
            pipe.style.bottom = `${altura}px`
        }
    }
}

const mostrarTelaReset = () => {
    if (!vivo) {
        mario.classList.add("morrer")
        telaMorreu.style.visibility = "visible";
    }
}

const reiniciar = () => {
    telaMorreu.style.visibility = "hidden";
    mario.src = "./images/mario-parado.png";
    mario.classList.remove("morrer");
    pipe.style.right = "-80px";
    mario.classList.add("parado")
    valor = -80;
    andando = false;
    vivo = true;
    altura = 0;
    pontos = 0;
    numeroPlacar.innerHTML = pontos;

}

function loop() {
    const localPipe = pipe.getBoundingClientRect();
    const localMario = mario.getBoundingClientRect();

    if (localPipe.left > 200) {
        const test1 = (localMario.right + 70) >= localPipe.right;
        const test2 = (localMario.left + 70) >= localPipe.left;
        const test4 = (localMario.top + 140) >= localPipe.top;
        const diferenca = localPipe.left - localMario.left;
        const test5 = diferenca < 80;
        
        const test = test1 && test2 && test4 && test5;

        // console.log({
        //     rightCheck: test1,
        //     leftCheck: test2,
        //     topCheck: test4,
        //     finalResult: test
        // });
        // console.log(localPipe.left)
        if (test) {
            vivo = false;
            mostrarTelaReset();
            console.log(diferenca);
            // console.log(localPipe.left)
            andando = false;
            mario.src = "images/game-over.png"
        }
    }

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);