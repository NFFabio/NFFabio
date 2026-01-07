"use strict";
const Canvas = document.getElementById('RenderCanvas');
const Engine = new BABYLON.Engine(Canvas, true, { preserveDrawingBuffer: true, stencil: true });
let Camera;
let JGate = null;
class Playground1 {
    static CreateScene(Engine, _Canvas) {
        /* cams*/
        let Scene = new BABYLON.Scene(Engine);
        Camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), Scene);
        BABYLON.SceneLoader.ImportMesh("", "../assets/", "car2.glb", Scene, (meshes) => {
            JGate = meshes[0];
            meshes[0].position = new BABYLON.Vector3(2.5, -2, 1);
            meshes[0].scaling = new BABYLON.Vector3(5, 5, 5);
            Scene.addMesh(JGate);
            if (JGate) {
                console.log("Gate loaded");
                Camera.setTarget(JGate.position); // Make the camera follow the car
            }
        });
        Scene.clearColor = new BABYLON.Color4(1, 1, 1, 0);
        Scene.registerBeforeRender(function () {
            if (JGate) { // Ensure JGate is defined before accessing it
                JGate.rotate(new BABYLON.Vector3(0, 1, 0), .5 * .1);
            }
        });
        return Scene;
    }
}
const Scene = Playground1.CreateScene(Engine, Canvas);
let Light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), Scene);
Light.intensity = 0.7;
Engine.runRenderLoop(() => {
    Scene.render();
});
window.addEventListener("resize", () => {
    Engine.resize();
});
