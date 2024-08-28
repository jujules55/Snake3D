import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.module.js'
import Snake from './snake.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 100;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    const scene = new THREE.Scene();
    const axes = new THREE.AxesHelper();
    axes.setColors(0xff0000, 0x00ff00, 0x0000ff);
    scene.add(axes);
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

    document.body.addEventListener('keydown', (e) => {
        snake.checkEvent(e.key)
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