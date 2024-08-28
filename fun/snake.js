import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.module.js'

export default function Snake(x, y, z, camera, scene) {

    const SphereGeometry = new THREE.SphereGeometry(0.5, 32, 16)
    const CorpsMesh = new THREE.MeshPhongMaterial({ color: '#0000ff' })
    let tete = new THREE.Mesh(SphereGeometry, CorpsMesh)
    let part = new THREE.Mesh(SphereGeometry, CorpsMesh)
    tete.position.set(x, y, z)
    part.position.set(x, y, z + 1)
    tete.add(camera)
    camera.position.set(x, y, z + .5)

    const PommeMesh = new THREE.MeshPhongMaterial({ color: '#ff0000' })
    this.pomme = new THREE.Mesh(SphereGeometry, PommeMesh)
    this.pomme.position.set(
        Math.floor(Math.random() * 10 - 5),
        Math.floor(Math.random() * 10 - 5),
        Math.floor(Math.random() * 10 - 5)
    )

    this.corps = [tete, part]
    this.scene = scene
    this.scene.add(tete)
    this.scene.add(part)
    this.scene.add(this.pomme)


    this.directionX = 0
    this.directionY = 0
    this.directionZ = -1
    this.rotateX = 0
    this.rotateY = 0

    this.waitRotate = []

    this.add = function () {

        let part = new THREE.Mesh(SphereGeometry, CorpsMesh)
        let pos = this.corps[this.corps.length - 1].position
        part.position.set(pos.x, pos.y, pos.z)

        this.corps.push(part)
        this.scene.add(part)

    }

    this.move = function (x, y, z) {

        let queue = this.corps.pop()
        let tete = this.corps.shift()
        queue.position.set(tete.position.x, tete.position.y, tete.position.z)
        tete.translateX(x)
        tete.translateY(y)
        tete.translateZ(z)
        this.corps = [tete, queue].concat(this.corps)

    }

    this.movePomme = function () {
        this.pomme.position.set(
            Math.floor(Math.random() * 10 - 5),
            Math.floor(Math.random() * 10 - 5),
            Math.floor(Math.random() * 10 - 5)
        )
    }

    this.checkEvent = function (key) {

        if (key == 'ArrowDown') {
            // this.corps[0].rotateX(Math.PI * -0.5)
            this.rotateX = Math.PI * -0.5
            this.rotateY = 0

            this.directionY = -1
            this.directionX = 0
            this.directionZ = 0
        } else {
            if (key == 'ArrowUp') {
                // this.corps[0].rotateX(Math.PI * 0.5)
                this.rotateX = Math.PI * 0.5
                this.rotateY = 0

                this.directionY = 1
                this.directionX = 0
                this.directionZ = 0
            } else {
                if (key == 'ArrowLeft') {
                    // this.corps[0].rotateY(Math.PI * 0.5)
                    this.rotateX = 0
                    this.rotateY = Math.PI * 0.5

                    this.directionY = 0
                    this.directionX = -1
                    this.directionZ = 0
                } else {
                    if (key == 'ArrowRight') {
                        // this.corps[0].rotateY(Math.PI * -0.5)
                        this.rotateX = 0
                        this.rotateY = Math.PI * -0.5

                        this.directionY = 0
                        this.directionX = 1
                        this.directionZ = 0
                    }
                }
            }
        }
    }

    this.updateCam = function () {

        this.corps[0].rotateX(this.waitRotate.shift())
        this.corps[0].rotateY(this.waitRotate.shift())

    }

    this.waitRotateAdd = function (x, y) {

        for (let i = 0; i < 6; i++) {
            this.waitRotate.push(x / 6)
            this.waitRotate.push(y / 6)
        }

    }

    this.update = function () {

        this.move(this.directionX, this.directionY, this.directionZ)
        this.directionY = 0
        this.directionX = 0
        this.directionZ = -1

        this.waitRotateAdd(this.rotateX, this.rotateY)
        this.rotateX = 0
        this.rotateY = 0

        let posT = this.corps[0].position
        let posP = this.pomme.position

        if ((posT.x - posP.x) * (posT.x - posP.x) + (posT.y - posP.y) * (posT.y - posP.y) + (posT.z - posP.z) * (posT.z - posP.z) < 0.99) {
            this.add()
            this.movePomme()
        } 
    }
}

