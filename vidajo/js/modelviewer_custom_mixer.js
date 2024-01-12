import * as THREE from 'three';

/* START: DEVELOPMENT STUFF */
function getAllKeys(object) { 
    return Object.getOwnPropertyNames(object)//.filter(item => typeof object[item] === 'function');
}  

function getKeys(object) {
    let keys = Object.keys(object);
    let keys_list;
    keys.forEach( function ( key ) {
        keys_list += `${key}\n`
    });
    return(keys_list)
}

function cons(text) {
    document.getElementById('cons').textContent = text;
}
/* END: DEVELOPMENT STUFF */

// needed to change mesh positions followed by model-update for meshes such as korpus, laptophalter etc.
function changeMeshPosition(mesh, axis, value, needs_update = false) {
    mesh.position[axis] = value;
    needs_update && updateModelViewer(total_duration);                                // updateModelViewer() is only triggered when needed
}

// needed for conversion from angle in degree to radians
function degToRad(value_in_degree) {
    return value_in_degree * Math.PI/180;
}

// needed to make model's animation work when loading initially
function toggleAnimation() {
    modelviewer.play();
    modelviewer.pause();
}

// used to update model (shadows etc.)
function updateModelViewer(duration) {
    //modelviewer.currentTime = modelviewer.currentTime
    modelviewer.currentTime = duration - 0.0000001
}

// needed to hide/show model controls and respective toggle-buttons
function toggleModelControls(control_type) {
    document.getElementById(`toggle-${control_type}-controls-open`).classList.toggle(`toggle-${control_type}-controls-invisible`);  // hide/show toggle-button open for model-control
    document.getElementById(`toggle-${control_type}-controls-close`).classList.toggle(`toggle-${control_type}-controls-invisible`); // hide/show toggle-button close for model-control
    document.querySelector(`.${control_type}-controls`).classList.toggle(`${control_type}-controls-visible`);                       // hide/show actual model-control
}


///////////////////////////////
//// SETTING UP THE SCENE /////
///////////////////////////////
const loader =                              document.getElementById('loader');
const modelviewer =                         document.querySelector('model-viewer');

// registering animations
const slider_animation_all_updown =         document.getElementById('slider-animation-all-updown');
const slider_animation_korpus_updown =      document.getElementById('slider-animation-korpus-updown');
const slider_animation_klappe_openclose =   document.getElementById('slider-animation-klappe-openclose');

// registering constants and initial setup
const needs_update =                true;                   // const for improving readability in function-calls
const klappe_rotation_max =         -105;                   // in degree
//let klappe_offen =                  getKlappeRotation('deg') == klappe_rotation_max;

modelviewer.addEventListener('load', function() {
    // Hide the loader and show the model viewer
    loader.style.display =      'none';
    modelviewer.style.display = 'block';
    
    // registering scene and meshes, can only be done after modelviewer loaded
    // makes it possible to manipulate the mesh of the glb-model (translation, rotation and animation-mixer)
    const scene_graph = modelviewer[Object.getOwnPropertySymbols(modelviewer).find(e => e.description === 'scene')];

    // Eventlistener: hide/show-button for animation- and variant-controls
    const addToggleModelControlsListener = (model_controls, control_type) => {
        for (const child of model_controls.children) {
            child.addEventListener('click', () => toggleModelControls(control_type));
        }
    };
    addToggleModelControlsListener(document.querySelector('.toggle-animation-controls'),    'animation');
    addToggleModelControlsListener(document.querySelector('.toggle-variant-controls'),      'variant');


    // Animation-EventListener: slider-animation-all-updown & slider-animation-korpus-updown
    slider_animation_all_updown.addEventListener('input', function() {
        //changeMeshPosition(meshes['wallti_origin'], 'y', parseInt(this.value)/100, needs_update);
        let mesh = scene_graph.getObjectByName('controller_schreibtisch');
        changeMeshPosition(mesh, 'y', this.value/this.max * 0.8, false)
        updateModelViewer(total_duration);
    });

    slider_animation_korpus_updown.addEventListener('input', function() {
        [action_korpus, action_fuesse_mitte, action_energiekette].forEach(action => {
            action.timeScale = this.value / this.max;
        });
        updateModelViewer(total_duration);
    });

    // Animation-EventListener: slider-animation-klappe-openclose
    slider_animation_klappe_openclose.addEventListener('input', function() {
        [action_klappe, action_klappenhalter_unten, action_klappenhalter_oben].forEach(action => {
            action.timeScale = this.value / this.max;
        });
        updateModelViewer(total_duration);
    });

    // Initial scene setup
    toggleAnimation();                                                                                            // start and stop animation so it is toggled and can be altered
    // do this after initializing everything
    // https://threejs.org/docs/#manual/en/introduction/Animation-system

    // empty the existing mixer
    const mixer = scene_graph.mixer
    let default_action = mixer._actions[0]                        // first animation of the model is already added to mixer by default

    mixer._deactivateAction( default_action );                      // remove this default action as it might not be obvious which action is added to mixer by default
    mixer._removeInactiveAction( default_action );
    let action_korpus =                 registerAnimations('korpusAction')
    let action_fuesse_mitte =           registerAnimations('fuesse_mitte')
    let action_energiekette =           registerAnimations('energiekette_r_armature')

    let action_klappe =                 registerAnimations('klappeAction')
    let action_klappenhalter_unten =    registerAnimations('klappenhalter_r_strebe_unten_armature')
    let action_klappenhalter_oben =     registerAnimations('klappenhalter_r_strebe_oben_armature')

    modelviewer.currentTime = 0
    const total_duration = action_klappe._clip.duration

    function registerAnimations(animation_name) {
        let animation = THREE.AnimationClip.findByName(scene_graph.animations, animation_name);     // calling animations by name seems much safer than calling by index, especially when uploading new model which might have new animation order
                                                                                                    // index-method: let animation_y = scene_graph.animations[2]
        let action = mixer.clipAction( animation )                                                  // add animation to mixer
        action.play()                                   // needed to activate actions, .play() increases mixer._nActiveActions
        action.timeScale = 0                            // is later set via control sliders to value between 0-1
        return action

        // further stuff which might be useful
        //action_y.weight = 0.2     // setting a weight causes strange behaviour, at least to complicated stuff like curves (with non-applied transformations(?))
        //action_y.reset()          // sets action to .enabled = true & .time = 0, does not seem to affect weight
    }
    document.getElementById('myButton1').addEventListener('click', function() {
    });

    document.getElementById('myButton2').addEventListener('click', function() {
    });

});


/*
BUGS
    - prevent pan in not-ar-mode only
IMPLEMENT
    - display griff name somewhere
    - hotspot / dynamic dim-line for height of table
    - use const center = modelViewer.getBoundingBoxCenter();
    - AutoRotate-Button
    - Closer Zoom-Level
    - Egger-Dekore direkt laden
Model & Controls
    - Monitorarm
    - Zubehör (Tastatur, Maus, Handy, Kabel, Laptop, Tasse)
    - verschiedene Räume / Böden / Wände
    - weitere Gegenstände (Siedboard, Stuhl, Pflanze)
UX
    - size bluetooth-image
    - adapt menu and window to different screen sizes
    - draw circular-border and toggle-buttons as svgs
    - Vidajo-Logo or similar as poster.webp when loading
    - fullscreen
    - Screenshot
    - save/share selected variants/position/view
    - Hotspots Erklärungen
    - Hotspots Dimensions
Animations Usage
    - show monitorarm usage
    - show laptophalter usage
    - show energiekette usage
    - show kabelkasten inside
    - show bilderrahmen usage
Animations assembly
    - show griff assembly
    - show monitorarm assembly
    - show bluetooth assembly
    - show wall assembly
    - show unboxing

MAYBE USEFUL
*/
    // buttons for development

/*
// needed for getting mesh/material directly when clicking object (maybe useful for direct animation such as flap movement, button touch etc.)
const get_material = (event) => {
    const material = modelviewer.materialFromPoint(event.clientX, event.clientY);
    if (material != null) {
        alert(material.name)
        //material.pbrMetallicRoughness.setBaseColorFactor([Math.random(), Math.random(), Math.random()]);
    }
};
modelviewer.addEventListener("click", get_material);

const get_node = (event) => {
    //scene.getNDC(pixelX, pixelY);
    const nod = modelviewer.positionAndNormalFromPoint(event.clientX, event.clientY);
    if (nod != null) {
        alert(nod)
    }
};
modelviewer.addEventListener("click", get_node);

//scene.queueRender();                                  // only updates threejs-specifics such as position etc., but not modelviewer-specifics such as shadows etc.
*/