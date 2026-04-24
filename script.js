import * as THREE from "three";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger);


// ======
// ABELHA
// ======


// CENÁRIO
const cenario = new THREE.Scene();

// CÂMERA
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, .1, 1000);

camera.position.z = 10;

// RENDERIZADOR
const renderizador = new THREE.WebGLRenderer({alpha: true});
renderizador.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".abelha").appendChild(renderizador.domElement);

// ILUMINAÇÃO
const luzAmbiente = new THREE.AmbientLight("white", 1);
const luzDirecional = new THREE.DirectionalLight("white", 3);
luzDirecional.position.x = -3;
luzDirecional.position.z = 3;
cenario.add(luzAmbiente, luzDirecional)

// IMPORTAR ABELHA
let abelha;
let mixer;
const loader = new GLTFLoader();
loader.load("animacoes/bee.glb", (abelhaObjeto)=> {
    abelha = abelhaObjeto.scene;
    const abelhaAnimacao = abelhaObjeto.animations[0];

    // MIXER --> Controlador de reprodução
    mixer = new THREE.AnimationMixer(abelha);
    mixer.clipAction(abelhaAnimacao).play();
    cenario.add(abelha)
    abelha.position.z = -16;
    abelha.position.x = 9;
    abelha.position.y = -3.7;
    abelha.rotation.y = 2.6;
    abelha.rotation.x = -.2;
    rotacionar()
});

function rotacionar(){
    const tl = gsap.timeline({
        scrollTrigger: {
            start: "0% 0%",
            end: "50% 50%",
            scrub: 1
        }
    });

    tl.to(abelha.position, {
        x: -8
    })
    .to(abelha.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5
    }, 0)
    .to(abelha.rotation, {
        x: -0.7
    }, 0);
}


// =====
// STEVE
// =====


// NOVA CENA
const cenaSteve = new THREE.Scene();

// NOVA CAMERA
const cameraSteve = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);

cameraSteve.position.z = 6;

// RENDERIZADOR DO STEVE
const renderizadorSteve = new THREE.WebGLRenderer({ alpha: true });
renderizadorSteve.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".steve").appendChild(renderizadorSteve.domElement);

//  ILUMINAÇÃO STEVE
const luzAmbienteSteve = new THREE.AmbientLight("white", 1);
const luzDirecionalSteve = new THREE.DirectionalLight("white", 3);
luzDirecionalSteve.position.x = -3;
luzDirecionalSteve.position.z = 3;

cenaSteve.add(luzAmbienteSteve, luzDirecionalSteve);

// IMPORTAR STEVE
let steve;
loader.load("animacoes/steve.glb", (steveObjeto)=> {
    steve = steveObjeto.scene;
    cenaSteve.add(steve);
    steve.scale.set(0.31, 0.31, 0.31);
    steve.position.set(0, 0, 0);
    steve.position.y = -4;
});

// ANIMAR
function animar(){
    requestAnimationFrame(animar);
    if(mixer) mixer.update(0.02);

    // Abelha
    renderizador.render(cenario, camera);

    // Steve
    renderizadorSteve.render(cenaSteve, cameraSteve);
    if(steve){
        steve.rotation.y += (mouseX * 0.5 - steve.rotation.y) * 0.2;
        steve.rotation.x += (-mouseY * 0.3 - steve.rotation.x) * 0.2;
    }
}

animar();

// ANIMAR STEVE
let mouseX = 0;
let mouseY = 0;
window.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});



