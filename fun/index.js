import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.module.js'
// import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js"
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
    scene.background = new THREE.Color('black');

    let snake = new Snake(0,0,0, camera, scene)

    {
        const planeSize = 40;

        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        mesh.position.y = -10
        scene.add(mesh);
    }

    {
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

    for(let i = 0; i<100; i++){
        snake.add()
    }

    document.body.addEventListener('keydown',(e)=>{
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