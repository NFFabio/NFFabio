
const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer : true, stencil: true});
let camera : BABYLON.UniversalCamera;
let car:BABYLON.AbstractMesh;



class Playground {
    static CreateScene(engine:BABYLON.Engine, canvas:HTMLCanvasElement):BABYLON.Scene    {
        /* cams*/
        let scene = new BABYLON.Scene(engine);
        
         camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0,20,0),scene);
        camera.attachControl(canvas,true)
        scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());

        camera.speed=3
        
    
        camera.angularSensibility = 1000;
        camera.inertia = 0.5;
        camera.inertia=.8;
        camera.ellipsoid = new BABYLON.Vector3(1, 3, 1);
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        scene.collisionsEnabled = true;
        camera.applyGravity = true;
        scene.collisionsEnabled=true;
        camera.checkCollisions
        
        
        // Accessing and controlling the "car" mesh
        

        let isLocked = false;
        scene.onPointerDown = function (_evt) {
            if (!isLocked) {
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock();
                }
            }
            
        }
        console.log("before loading car");



        BABYLON.SceneLoader.ImportMesh("", "../assets/", "car.glb", scene, (meshes) => {
            car =  meshes[0];
            meshes[0].position = new BABYLON.Vector3(0, 11.5,3.4);
            meshes[0].scaling= new BABYLON.Vector3(1.5,1.5,1.5);
            meshes[0].checkCollisions = true;
            camera.setTarget(camera.position.add(new BABYLON.Vector3(0,0,-1)))
        camera.attachControl(canvas,true)
        camera.speed=0.2
        camera.keysUp[0]= "W".charCodeAt(0)
        camera.keysDown[0]= "S".charCodeAt(0)
        camera.keysLeft[0]= "A".charCodeAt(0)
        camera.keysRight[0]= "D".charCodeAt(0)
            scene.addMesh(car);
            console.log("should be loaded now");
            if (car) {
            console.log("Car loaded");
            camera.position.x= camera.position.x + .5;
            camera.position.y= camera.position.y + .5;
            camera.position.z= camera.position.z + .5;
            car.checkCollisions = true; // Enable collision checks for car
            
            camera.setTarget(car.position); // Make the camera follow the car


            meshes.forEach(mesh => {
                mesh.checkCollisions = true;
            });
            
            }
        });
        
        BABYLON.SceneLoader.ImportMesh("", "../assets/", "newModel.glb", scene, (meshes) => {
            let newModel = meshes[0];
            newModel.checkCollisions=true;

            meshes[0].position = new BABYLON.Vector3(0, 10, 0);
            meshes[0].scaling= new BABYLON.Vector3(1,1, 1);
            meshes[0].checkCollisions = true;
            camera.attachControl(canvas, true)
          
            newModel.physicsImpostor = new BABYLON.PhysicsImpostor(newModel, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7, }, scene);
            scene.addMesh(newModel);
            meshes.forEach(mesh => {
                mesh.checkCollisions = true;
            });

        });

          
      
        return scene;
    }
}


const scene = Playground.CreateScene(engine, canvas);
// 
let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0,1,0), scene);
 light.intensity = 0.7;

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
})

// document.addEventListener("keyup", function() {
//     console.log("stop turning")
//     removeEventListener("keydown", turnListener);
// });

// let countRotation=0;
// const FULLROTATION= 63;

// type PressedKeys = {
//     [key: string]: boolean;
// };

// // Objekt zur Verfolgung der gedrückten Tasten
// const pressedKeys: PressedKeys = {};

// // Funktion zur Behandlung des Keydown-Ereignisses
// function handleKeyDown(event: KeyboardEvent): void {
//     pressedKeys[event.code] = true;
//     checkKeys(event);
// }

// // Funktion zur Behandlung des Keyup-Ereignisses
// function handleKeyUp(event: KeyboardEvent): void {
//     pressedKeys[event.code] = false;

// }

// // Funktion zur Überprüfung, ob die Tasten "a" und "b" gleichzeitig gehalten werden



// function checkKeys(event:KeyboardEvent): void {
//     if (pressedKeys['KeyW'] && pressedKeys['KeyA']) {
//         car.addRotation(0,-.1,0)
//         countRotation++;
//         if(countRotation>63)countRotation=0;
//         console.log(countRotation)
        
//         processRotationDataToMoveInTheRightDirection(countRotation,"RightTurn")


//         car.position.x -= 0.1;
//         camera.position.x -= 0.1;
//         //cam pos = car pos? 
//     }else if(pressedKeys['KeyW'] && pressedKeys['KeyD']) {
//         countRotation--;
//         if(countRotation<0)countRotation =63;
//         console.log(countRotation)

//         car.addRotation(0,.1,0)
//         car.position.x += 0.1;
//         camera.position.x += 0.1;
//         //camera.setTarget(car.position);

//     }else if (pressedKeys['KeyW']||event.key=="w") {
//        processRotationDataToMoveInTheRightDirection(countRotation,"foreward")
//     }else if (pressedKeys['KeyS']) {
//         camera.position.z += 0.1;
      
//     }else if(pressedKeys['KeyR']){
//         if(countRotation>63)countRotation=0;

//         car.addRotation(0,.1,0)
//         countRotation++;
//         console.log(countRotation)

//     }
// }
// function processRotationDataToMoveInTheRightDirection(currentRotation:number,direction:String){
//     console.log("currentRotation: "+currentRotation)
//     if(currentRotation>=0&&currentRotation<5&&direction=="foreward"){
//         car.position.z -= 0.1;
        
//     }
//     if(currentRotation>=5&&currentRotation<10&&direction=="foreward"){
//         car.position.z -= 0.1;
//         car.position.x -= 0.05
//     }
//     if(currentRotation>=10&&currentRotation<15&&direction=="foreward"){
//         car.position.z -= 0.1;
//         car.position.x -= 0.1
//     } if(currentRotation>=15&&currentRotation<20&&direction=="foreward"){
//         car.position.x -= 0.1
//     }if(currentRotation>=20&&currentRotation<25&&direction=="foreward"){
//         car.position.x -= 0.1
//         car.position.z += 0.05;
//     }if(currentRotation>=25&&currentRotation<32&&direction=="foreward"){
//         car.position.x -= 0.1
//         car.position.z += 0.1;
//     }if(currentRotation>=32&&currentRotation<37&&direction=="foreward"){
//         car.position.y += 0.1
//     }if(currentRotation>=37&&currentRotation<42&&direction=="foreward"){
//         car.position.x += 0.1
//         car.position.z += 0.05;
//     }if(currentRotation>=42&&currentRotation<47&&direction=="foreward"){
//         car.position.x += 0.1;
//     }if(currentRotation>=47&&currentRotation<52&&direction=="foreward"){
//         car.position.x += 0.1;
//         car.position.y += 0.1;

//     }


//     if(currentRotation==32&&direction=="foreward"){
//         car.position.z += 0.1;
//     }
//     if(currentRotation==48&&direction=="foreward"){
//         car.position.x += 0.1;
//     }
// }
// Event-Listener hinzufügen
// document.addEventListener('keydown', handleKeyDown);
// document.addEventListener('keyup', handleKeyUp);

   
