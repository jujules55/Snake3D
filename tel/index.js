import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.module.js'
import Snake from './snake.js';

function main() {

    let fleche_haut = document.getElementById('haut');
    let fleche_bas = document.getElementById('bas');
    let fleche_gauche = document.getElementById('gauche');
    let fleche_droite = document.getElementById('droite');

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 100;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    let snake = new Snake(0, 0, 0, camera, scene);

    { // mur
        const loader = new THREE.TextureLoader();
        const materials = [
            new THREE.MeshPhongMaterial({ side: THREE.BackSide, map: loader.load('./image/arbre.png') }),
            new THREE.MeshPhongMaterial({ side: THREE.BackSide, map: loader.load('./image/arbre.png') }),
            new THREE.MeshPhongMaterial({ side: THREE.BackSide, map: loader.load('./image/ciel.png') }),
            new THREE.MeshPhongMaterial({ side: THREE.BackSide, map: loader.load('./image/sol.png') }),
            new THREE.MeshPhongMaterial({ side: THREE.BackSide, map: loader.load('./image/arbre.png') }),
            new THREE.MeshPhongMaterial({ side: THREE.BackSide, map: loader.load('./image/arbre.png') }),
        ];

        const BoxGeo = new THREE.BoxGeometry(12.5, 12.5, 12.5);
        const mesh = new THREE.Mesh(BoxGeo, materials);
        scene.add(mesh);
    }

    { //lumiere
        const color = 0xFFFFFF;
        const light = new THREE.PointLight( 0xffffff, 50 );
        const light2 = new THREE.AmbientLight(color, 1);
        scene.add(light);
        scene.add(light2);
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    
    fleche_haut.addEventListener('pointerdown', (event)=>{
        snake.checkEvent('ArrowUp');
    })
    fleche_bas.addEventListener('pointerdown', (event)=>{
        snake.checkEvent('ArrowDown');
    })
    fleche_gauche.addEventListener('pointerdown', (event)=>{
        snake.checkEvent('ArrowLeft');
    })
    fleche_droite.addEventListener('pointerdown', (event)=>{
        snake.checkEvent('ArrowRight');
    })

    let time_diff = 1000

    function render(time) {
        if (time - time_diff > 300) {

            time_diff = time
            snake.update()

        } else {
            if (snake.waitRotate.length != 0) {
                snake.updateCam()
            }
        }

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();