function cons(text) {
    document.getElementById('cons').textContent = text;
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
function updateModelViewer() {
    modelviewer.currentTime = modelviewer.currentTime
}

// needed to hide/show model controls and respective toggle-buttons
function toggleModelControls(control_type) {
    document.getElementById(`toggle-${control_type}-controls-open`).classList.toggle(`toggle-${control_type}-controls-invisible`);  // hide/show toggle-button open for model-control
    document.getElementById(`toggle-${control_type}-controls-close`).classList.toggle(`toggle-${control_type}-controls-invisible`); // hide/show toggle-button close for model-control
    document.querySelector(`.${control_type}-controls`).classList.toggle(`${control_type}-controls-visible`);                       // hide/show actual model-control
}

// needed to hide/show bluetooth-image dependent on status of hoehenverstellbar- and bluetooth-checkboxes
function toggleBluetoothImageOverlay() {
    document.getElementById('bluetooth-image-overlay').style.display = 
        hoehenverstellbar_selected && bluetooth_selected ? 'block' : 'none';
}

//
function getKlappeRotation(deg_or_rad) {
    let klappe_rotation = slider_animation_klappe_openclose.value / slider_animation_klappe_openclose.max * klappe_rotation_max;
    return deg_or_rad === 'deg' ? klappe_rotation : 
           deg_or_rad === 'rad' ? degToRad(klappe_rotation) : 
           null;
}


// needed to change all necessary variants after color-korpus was changed
function getColorKorpus() {
    return select_color_korpus.value.split('_')[1];
}

// needed to toggle griff-color-options
function toggleGriffDropdown() {
    div_color_griff_selected.classList.toggle('toggle-current-selection-griff-invisible');  // hide/show div with currently selected griff-color
    div_color_griff_options.classList.toggle('toggle-select-color-griff-options-visible');  // hide/show griff-color options
}

// needed to change div with currently selected griff-color
function changeCurrentSelectionGriff(new_variant, new_title, new_bg_img_src) {
    div_color_griff_selected.setAttribute('bg-src', new_bg_img_src);                        // add new bg-src to div
    div_color_griff_selected.setAttribute('title', new_title);                              // set title of div
    div_color_griff_selected.style.backgroundImage = `url('${new_bg_img_src}')`;            // set bg-img of div
    modelviewer.variantName = new_variant;                                                  // apply variant to model
}

// needed to apply multiple variants within one function/click
function changeVariantAsync(variant_name) {
    return new Promise((resolve, reject) => {
        modelviewer.variantName = variant_name;                                             // change to the new variant
        modelviewer.addEventListener('variant-applied', () => {                             // add event listener to know when the change is complete
            resolve();
        }, { once: true });                                                                 // 'once: true' ensures the listener is removed after it fires once
    });
}

async function updateVariants(variant_list) {
    let variant;
    for (variant of variant_list) {
        await changeVariantAsync(variant);
    }
}

// needed to change object's color
function updateBaseColorFactor(texture_name, bcf) {
    let tx = modelviewer.model.getMaterialByName(texture_name);
    let alpha = tx.pbrMetallicRoughness.baseColorFactor[3]
    bcf.push(alpha)
    tx.pbrMetallicRoughness.setBaseColorFactor(bcf);
}

// needed to hide/show objects by changing visibility through alpha-value
function updateAlphaValue(texture_name, alpha) {
    let tx = modelviewer.model.getMaterialByName(texture_name);
    let bcf = tx.pbrMetallicRoughness.baseColorFactor;

    tx.setAlphaMode('MASK');
    tx.pbrMetallicRoughness.setBaseColorFactor([bcf[0], bcf[1], bcf[2], alpha]);
}

// needed to change mesh positions followed by model-update for meshes such as korpus, laptophalter etc.
function changeMeshPosition(mesh, axis, value, needs_update = false) {
    mesh.position[axis] = value;
    needs_update && updateModelViewer();                                // updateModelViewer() is only triggered when needed
}

// needed to change mesh rotation followed by model-update for meshes such as klappe, laptophalter etc.
function changeMeshRotationRad(mesh, axis, value_in_rad, needs_update = false) {
    mesh.rotation[axis] = value_in_rad;
    needs_update && updateModelViewer();                                // updateModelViewer() is only triggered when needed
}

// needed to hide/show objects. Scaling to 0 prevents shadow casting (in contrast to changing alphavalue where shadow is still visible)
function changeMeshScale(mesh, scale_factor, needs_update = false) {
    mesh.scale.set(scale_factor, scale_factor, scale_factor);
    needs_update && updateModelViewer();                                // updateModelViewer() is only triggered when needed
}

///////////////////////////////
//// SETTING UP THE SCENE /////
///////////////////////////////
const mesh_names =              [   'wallti_origin', 'korpus_origin', 'klappe_origin',
                                    'kabelkasten80', 'kabelkasten100', 'kabelkasten120',
                                    'korpus80', 'korpus100', 'korpus120',
                                    'mittelboden80', 'mittelboden100', 'mittelboden120',
                                    'klappe80', 'klappe100', 'klappe120',
                                    'fuss_innen_l', 'fuss_innen_r', 'fuss_aussen_l', 'fuss_aussen_r',
                                    'griff',
                                    'laptophalter_l', 'laptophalter_r',
                                    'plexiglas80', 'plexiglas100', 'plexiglas120',
                                    'plexiglas100_poster',                                      // later add 'plexiglas80_poster', 'plexiglas120_poster',
                                    'plexiglas_abdeckkappen',                                   // is an empty in the model. When scaled, also covers plexiglas_abdeckkappen_x (child-elements)  
                                    'plexiglas_abdeckkappen_l', 'plexiglas_abdeckkappen_r',     // only needed for positioning, therefore plexiglas_abdeckkappen_m not listed
                                    'zubehoer'//, 'raum_wand', 'raum_boden'
                                ];

const mesh_names_fuesse =       [   'fuss_innen_l', 'fuss_innen_r', 'fuss_aussen_l', 'fuss_aussen_r'];
const mesh_names_abdeckkappen = [   'plexiglas_abdeckkappen_l', 'plexiglas_abdeckkappen_r'];
const mesh_names_hidden_onload =    [   'laptophalter_l', 'laptophalter_r',
                                        'plexiglas_abdeckkappen',
                                        'plexiglas80', 'plexiglas100', 'plexiglas120',
                                        'plexiglas100_poster',
                                        'zubehoer'
                                    ]

const modelviewer =                         document.querySelector('model-viewer');

// registering animations
const slider_animation_all_updown =         document.getElementById('slider-animation-all-updown');
const slider_animation_korpus_updown =      document.getElementById('slider-animation-korpus-updown');
const slider_animation_klappe_openclose =   document.getElementById('slider-animation-klappe-openclose');

// registering variants
const select_width_korpus =                 document.getElementById('select-width-korpus');
const checkbox_bluetooth =                  document.getElementById('checkbox-bluetooth');
const select_color_fuesse =                 document.getElementById('select-color-fuesse');
const select_color_korpus =                 document.getElementById('select-color-korpus');
const div_color_griff_selected =            document.querySelector('.select-color-griff-current-selection div');
const div_color_griff_options =             document.querySelector('.select-color-griff-options');
//const input_bilderrahmen_upload =           document.getElementById('input-bilderrahmen-upload');

// registering positions
const korpus_parts_positions =  {   '80':   {   scales:     {   'kabelkasten80':    1,  'kabelkasten100':   0,  'kabelkasten120':   0,
                                                                'korpus80':         1,  'korpus100':        0,  'korpus120':        0,
                                                                'mittelboden80':    1,  'mittelboden100':   0,  'mittelboden120':   0,
                                                                'klappe80':         1,  'klappe100':        0,  'klappe120':        0,
                                                                'plexiglas80':      1,  'plexiglas100':     0,  'plexiglas120':     0
                                                            },
                                                z_adjust:   -0.1
                                                },
                                    '100':  {   scales:     {   'kabelkasten80':    0,  'kabelkasten100':   1,  'kabelkasten120':   0,
                                                                'korpus80':         0,  'korpus100':        1,  'korpus120':        0,
                                                                'mittelboden80':    0,  'mittelboden100':   1,  'mittelboden120':   0,
                                                                'klappe80':         0,  'klappe100':        1,  'klappe120':        0,
                                                                'plexiglas80':      0,  'plexiglas100':     1,  'plexiglas120':     0
                                                            },
                                                z_adjust:   0
                                            },
                                    '120':  {   scales:     {   'kabelkasten80':    0,  'kabelkasten100':   0,  'kabelkasten120':   1,
                                                                'korpus80':         0,  'korpus100':        0,  'korpus120':        1,
                                                                'mittelboden80':    0,  'mittelboden100':   0,  'mittelboden120':   1,
                                                                'klappe80':         0,  'klappe100':        0,  'klappe120':        1,
                                                                'plexiglas80':      0,  'plexiglas100':     0,  'plexiglas120':     1
                                                            },
                                                z_adjust:   0.1
                                            }
                                };


const laptophalter_abbr =   {   'laptophalter_l': 'lh_l',
                                'laptophalter_r': 'lh_r'
                            };
const material_d =          0.018;
const lh_open_x =           0.46;
const lh_closed_x =         0.15;
const lh_open_y =           0.2;
const lh_closed_y =         0.12845;
const lh_l_80_closed_y =    lh_closed_y + material_d;
const lh_open_z =           0.46;

const lh_open_r_y =         50;
const lh_closed_r_y =       0;
const lh_open_r_z =         -50;
const lh_closed_r_z =       0;

const laptophalter_positions =  {   '80':   {   open:   {   lh_l: {x: [lh_open_x],      y: [lh_open_y],             z: [lh_open_z - 0.1],       r_y: [lh_open_r_y],     r_z: [lh_open_r_z]},
                                                            lh_r: {x: [lh_open_x],      y: [lh_open_y],             z: [-1*lh_open_z + 0.1],    r_y: [-1*lh_open_r_y],  r_z: [lh_open_r_z]}
                                                        },
                                                closed: {   lh_l: {x: [lh_closed_x],    y: [lh_l_80_closed_y],      z: [0.01],                  r_y: [lh_closed_r_y],   r_z: [lh_closed_r_z]},
                                                            lh_r: {x: [lh_closed_x],    y: [lh_closed_y],           z: [-0.01],                 r_y: [lh_closed_r_y],   r_z: [lh_closed_r_z]}
                                                        }
                                            },
                                    '100':  {   open:   {   lh_l: {x: [lh_open_x],      y: [lh_open_y],             z: [lh_open_z],             r_y: [lh_open_r_y],     r_z: [lh_open_r_z]},
                                                            lh_r: {x: [lh_open_x],      y: [lh_open_y],             z: [-1*lh_open_z],          r_y: [-1*lh_open_r_y],  r_z: [lh_open_r_z]}
                                                        },
                                                closed: {   lh_l: {x: [lh_closed_x],    y: [lh_closed_y],           z: [0.18],                  r_y: [lh_closed_r_y],   r_z: [lh_closed_r_z]},
                                                            lh_r: {x: [lh_closed_x],    y: [lh_closed_y],           z: [-0.18],                 r_y: [lh_closed_r_y],   r_z: [lh_closed_r_z]}
                                                        }
                                            },
                                    '120':  {   open:   {   lh_l: {x: [lh_open_x],      y: [lh_open_y],             z: [lh_open_z + 0.1],       r_y: [lh_open_r_y],     r_z: [lh_open_r_z]},
                                                            lh_r: {x: [lh_open_x],      y: [lh_open_y],             z: [-1*lh_open_z - 0.1],    r_y: [-1*lh_open_r_y],  r_z: [lh_open_r_z]}
                                                        },
                                                closed: {   lh_l: {x: [lh_closed_x],    y: [lh_closed_y],           z: [0.25],                  r_y: [lh_closed_r_y],   r_z: [lh_closed_r_z]},
                                                            lh_r: {x: [lh_closed_x],    y: [lh_closed_y],           z: [-0.25],                 r_y: [lh_closed_r_y],   r_z: [lh_closed_r_z]}
                                                        }
                                            }
                                };

const zubehoer_open_x =     0.641159;   
const zubehoer_closed_x =   0.231177;
const zubehoer_open_y =     0.136519;
const zubehoer_closed_y =   0.158766;
const zubehoer_open_z =     0;
const zubehoer_closed_z =   0.4;

const zubehoer_open_r_y =   15;
const zubehoer_closed_r_y = 50;

const zubehoer_positions =      {   '80':   {   open:   {   x: [zubehoer_open_x],   y: [zubehoer_open_y],   z: [zubehoer_open_z],           r_y: [zubehoer_open_r_y]},
                                                closed: {   x: [zubehoer_closed_x], y: [zubehoer_closed_y], z: [zubehoer_closed_z - 0.1],   r_y: [zubehoer_closed_r_y]}
                                            },
                                    '100':  {   open:   {   x: [zubehoer_open_x],   y: [zubehoer_open_y],   z: [zubehoer_open_z],           r_y: [zubehoer_open_r_y]},
                                                closed: {   x: [zubehoer_closed_x], y: [zubehoer_closed_y], z: [zubehoer_closed_z],         r_y: [zubehoer_closed_r_y]},
                                            },
                                    '120':  {   open:   {   x: [zubehoer_open_x],   y: [zubehoer_open_y],   z: [zubehoer_open_z],           r_y: [zubehoer_open_r_y]},
                                                closed: {   x: [zubehoer_closed_x], y: [zubehoer_closed_y], z: [zubehoer_closed_z + 0.1],   r_y: [zubehoer_closed_r_y]},
                                            }
                                };

// registering constants and initial setup
const needs_update =                true;                   // const for improving readability in function-calls
const black_value =                 0.024222470819950104;   // needed for fuss-material
const klappe_rotation_max =         -105;                   // in degree
let klappe_offen =                  getKlappeRotation('deg') == klappe_rotation_max;
let korpus_width =                  '100';
let hoehenverstellbar_selected =    true;
let bluetooth_selected =            false;
let bilderrahmen_selected =         true;
let zubehoer_selected =             false;
let raum_selected =                 false;

modelviewer.addEventListener('load', function() {
    // registering scene and meshes, can only be done after modelviewer loaded
    // makes it possible to manipulate the mesh of the glb-model (translation, rotation and maybe animation-mixer)
    const threeJsScene = modelviewer[Object.getOwnPropertySymbols(modelviewer).find(e => e.description === 'scene')];
    const meshes = mesh_names.reduce((acc, mesh_name) => {
        acc[mesh_name] = threeJsScene.getObjectByName(mesh_name);
        return acc;
    }, {});
    // registering position data of some meshes
    [...mesh_names_fuesse, ...mesh_names_abdeckkappen, 'griff'].forEach(mesh_name => {                  // concatenate mesh_names_fuesse, mesh_names_abdeckkappen and griff temporarily
        meshes[`${mesh_name}_origin_z`] = meshes[mesh_name].position.z;
    });

    // needed to place laptopholder_l, laptopholder_r and zubehoer according to korpus_width and klappe_offen-status
    function placeLaptophalterAndZubehoer() {
        let laptophalter_current_positions =    laptophalter_positions[korpus_width][klappe_offen ? 'open' : 'closed'];
        let zubehoer_current_positions =        zubehoer_positions[korpus_width][klappe_offen ? 'open' : 'closed'];

        let lh_l_y_offset = (korpus_width == '80' && !klappe_offen && meshes['laptophalter_l_scale'] == 1 && meshes['laptophalter_r_scale'] == 0) ? material_d : 0;   // offset for laptophalter_l in case it is stacked midair onto invisible laptophalter_r

        ['laptophalter_l', 'laptophalter_r'].forEach(mesh_name => {            
            const current_position = laptophalter_current_positions[laptophalter_abbr[mesh_name]];
            changeMeshPosition(meshes[mesh_name], 'x', current_position.x);
            changeMeshPosition(meshes[mesh_name], 'y', current_position.y - (mesh_name === 'laptophalter_l' ? lh_l_y_offset : 0));      // for laptophalter_r, no offset is used
            changeMeshPosition(meshes[mesh_name], 'z', current_position.z);
            changeMeshRotationRad(meshes[mesh_name], 'y', degToRad(current_position.r_y));
            changeMeshRotationRad(meshes[mesh_name], 'z', degToRad(current_position.r_z));
        });

        changeMeshPosition(meshes['zubehoer'], 'x', zubehoer_current_positions.x);
        changeMeshPosition(meshes['zubehoer'], 'z', zubehoer_current_positions.z);
        changeMeshRotationRad(meshes['zubehoer'], 'y', degToRad(zubehoer_current_positions.r_y));
        updateModelViewer();                                                                                    // update all changes in one go
    }

    // needed to scale and place korpus-parts correctly according to korpus_width
    function changeKorpusWidth(korpus_width) {

        let korpus_parts_current_positions = korpus_parts_positions[korpus_width];

        // change scale of korpus, mittelboden, klappe, kabelkasten, plexiglas
        Object.entries(korpus_parts_current_positions.scales).forEach(([mesh_name, scale_factor]) => {
            changeMeshScale(meshes[mesh_name], scale_factor);
        });

        !bilderrahmen_selected && changeMeshScale(meshes[`plexiglas${korpus_width}`], 0);                       // hide plexiglas if bilderrahmen not selected

        // change positions of fuesse, abdeckkappen and griff
        [...mesh_names_fuesse, ...mesh_names_abdeckkappen, 'griff'].forEach(mesh_name => {                      // concatenate mesh_names_fuesse, mesh_names_abdeckkappen and griff temporarily
            let z_adjust =  mesh_name.endsWith('_l')
                                ? korpus_parts_current_positions.z_adjust 
                                : korpus_parts_current_positions.z_adjust * -1;
            changeMeshPosition(meshes[mesh_name], 'z', meshes[`${mesh_name}_origin_z`] + z_adjust);
        });

        // change position of laptophalter_l, laptophalter_r and zubehoer
        placeLaptophalterAndZubehoer();
    }


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
        changeMeshPosition(meshes['wallti_origin'], 'y', parseInt(this.value)/100, needs_update);
    });

    slider_animation_korpus_updown.addEventListener('input', function() {
        changeMeshPosition(meshes['korpus_origin'], 'y', parseInt(this.value)/100, needs_update);
    });

    // Animation-EventListener: slider-animation-klappe-openclose
    slider_animation_klappe_openclose.addEventListener('input', function() {
        changeMeshRotationRad(meshes['klappe_origin'], 'z', getKlappeRotation('rad'));
        klappe_offen = getKlappeRotation('deg') == klappe_rotation_max;
        placeLaptophalterAndZubehoer();
    });


    // Variant-EventListener: Korpus-Breite
    select_width_korpus.addEventListener('input', function() {
        korpus_width = this.value;          // needs to be updated explicitly as this variable is used by other functions 
        changeKorpusWidth(korpus_width)
    });

    // Variant-EventListener: Höhenverstellbarkeit
    document.getElementById('checkbox-hoehenverstellbarkeit').addEventListener('change', function() {

        hoehenverstellbar_selected = this.checked;

        // Controls (de-)aktivieren 
        checkbox_bluetooth.disabled =               !hoehenverstellbar_selected;    // Bluetooth-Option ausgrauen oder aktivieren
        select_color_fuesse.disabled =              !hoehenverstellbar_selected;    // Dropdown für Fußfarbe ausgrauen oder aktivieren
        slider_animation_korpus_updown.disabled =   !hoehenverstellbar_selected;    // Slider für Auf-Ab ausgrauen oder aktivieren

        // Bluetooth- und Fußfarbe-Labels (de-)aktivieren durch Ausgrauen
        let select_labels = ['label[for="checkbox-bluetooth"]', 'label[for="select-color-fuesse"]'];
        select_labels.forEach(label_selector => {
            let select_label = document.querySelector(label_selector);
            select_label.classList.toggle('label-inactive', !hoehenverstellbar_selected);
        });

        // arrow-updown-icon: CSS-Opacity-Filter entfernen/setzen
        document.getElementById('icon-arrow-updown').classList.toggle('icon-arrow-inactive', !hoehenverstellbar_selected);

        // Variants am Model und im Viewer ein-/ausblenden
        toggleBluetoothImageOverlay();                                                                                  // Bluetooth-Overlay ein-/ausblenden

        mesh_names_fuesse.forEach(mesh_name => {                                                                        // Füße ein-/ausblenden
            changeMeshScale(meshes[mesh_name], hoehenverstellbar_selected ? 1 : 0);
        });

        let hv_color = `hv_${hoehenverstellbar_selected ? 'ti' : 'flex'}_${getColorKorpus()}`;                          // wähle Ti-/Flex-Variante in entsprechender Korpus-Farbe (Kabelkasten und passender Mittelboden)
        let hv_position = parseInt( hoehenverstellbar_selected ? 
                                    slider_animation_korpus_updown.value : slider_animation_korpus_updown.min) / 100;   // wähle Korpus-Position
        modelviewer.variantName = hv_color;
        changeMeshPosition( meshes['korpus_origin'], 'y', hv_position, needs_update);
    });

    // Variant-EventListener: Bluetooth
    checkbox_bluetooth.addEventListener('change', function() {
        bluetooth_selected = this.checked;
        toggleBluetoothImageOverlay();
    });

    // Variant-EventListener: Fuß-Farbe
    select_color_fuesse.addEventListener('input', function() {
        let bcf = this.value == 'fuesse_schwarz' 
            ? [black_value, black_value, black_value] 
            : [1 - black_value, 1 - black_value, 1 - black_value];
    
        updateBaseColorFactor('fuss', bcf);
    });

    // Variant-EventListener: Korpus-Farbe
    select_color_korpus.addEventListener('input', function() {
        let farbe_korpus = getColorKorpus();                                                                    // schwarz oder weiss
        let hv_variant = hoehenverstellbar_selected ? 'hv_ti' : 'hv_flex';
        let variant_list = [`korpus_${farbe_korpus}`, `${hv_variant}_${farbe_korpus}`];
        updateVariants(variant_list);
    });

    // Variant-EventListener: Griff-Color (current selection as well as options-div)
    document.querySelectorAll('.variant-container.select-color-griff div[bg-src]').forEach(function(div) {                                  // go through all griff-divs which have a bg-src
        div.style.backgroundImage = `url('${div.getAttribute('bg-src')}')`;                                                                 // set bg-image of all divs
        div.addEventListener('click', function() {                                                                                          // add eventlistener to all divs
            toggleGriffDropdown();                                                                                                          // toggle the griff-color-options-grid
            if (div != div_color_griff_selected) {                                                                                          // only for divs from the options-grid
                changeCurrentSelectionGriff(this.getAttribute('data-value'), this.getAttribute('title'), this.getAttribute('bg-src'));      // change modelviewer-variant as well as bg-src and title of current-selection-div according to clicked option
                let griff_circular_border = document.getElementById('current-selection-griff-circular-border');                             // find the circular border (used to display currently selected option in the griff-color-options-grid)
                if (griff_circular_border) {
                    griff_circular_border.parentElement.removeChild(griff_circular_border);                                                 // if found, remove the circular border from the current div
                }
                this.appendChild(griff_circular_border);                                                                                    // add the circular border to the clicked div
            }
        });
    });

    // Variants-EventListener: Laptophalter-rechts-Farbe, Laptophalter-links-Farbe
    ['laptophalter_l', 'laptophalter_r'].forEach(mesh_name => {
        document.getElementById(`select-color-${mesh_name}`).addEventListener('input', function() {     // html-id-selector includes mesh-name
            let scale_factor = this.value === 'keinen' ? 0 : 1;                                         // determine scale-factor dependent on chosen color
            changeMeshScale(meshes[mesh_name], scale_factor);                                           // apply scale-factor to laptophalter-mesh
            scale_factor === 1 && (modelviewer.variantName = this.value);                               // apply color as model-variant if scale === 1
            meshes[`${mesh_name}_scale`] = scale_factor;                                                // store scale of current laptophalter for later use
            placeLaptophalterAndZubehoer();
        });
    });

    // Variant-EventListener: Bilderrahmen
    document.getElementById('checkbox-bilderrahmen').addEventListener('change', function() {
        bilderrahmen_selected = this.checked;
        let scale_factor = bilderrahmen_selected ? 1 : 0;
        [`plexiglas${korpus_width}`, 'plexiglas100_poster', 'plexiglas_abdeckkappen'].forEach(mesh_name => {
            changeMeshScale(meshes[mesh_name], scale_factor);
        });
        updateModelViewer();
    });

    /*
    input_bilderrahmen_upload.addEventListener('change', async () => {
        let uri = URL.createObjectURL(input_bilderrahmen_upload.files[0]);
        let texture = await modelviewer.createTexture(uri);
        modelviewer.model.getMaterialByName('plexiglas100_poster').pbrMetallicRoughness.baseColorTexture.setTexture(texture);
    });

    document.getElementById('button-bilderrahmen-upload').addEventListener('click', () => {
        input_bilderrahmen_upload.click();          // Trigger file input
    });
    */

    // Variant-EventListener: Sichtbarkeit Zubehör
    document.getElementById('select-visibility-zubehoer').addEventListener('change', function() {
        zubehoer_selected = this.checked;
        changeMeshScale(meshes['zubehoer'], zubehoer_selected ? 1 : 0, needs_update);
    });

    // Variant-EventListener: Sichtbarkeit Raum
    document.getElementById('select-visibility-raum').addEventListener('change', function() {
        raum_selected = this.checked;
        updateAlphaValue('raum_wand',   raum_selected ? 1 : 0);         // split mesh into wand and boden and apply scale individually
        updateAlphaValue('raum_boden',  raum_selected ? 1 : 0);
    });


    // Initial scene setup
    //toggleAnimation();                                                                                            // start and stop animation so it is toggled and can be altered
    changeMeshPosition(meshes['wallti_origin'], 'y', parseInt(slider_animation_all_updown.value)/100);              // set initial wallti-height (as set by slider)
    changeMeshPosition(meshes['korpus_origin'], 'y', parseInt(slider_animation_korpus_updown.value)/100);           // set initial korpus-height (as set by slider)
    changeMeshRotationRad(meshes['klappe_origin'], 'z', getKlappeRotation('rad'));                                  // set initial klappe-rotation (as set by slider)
    changeKorpusWidth(select_width_korpus.value);                                                                   // set initial korpus_width (as set in dropdown)
    mesh_names_hidden_onload.forEach(mesh_name => {
        changeMeshScale(meshes[mesh_name], 0);                                                                      // initially, hide these meshes
        if (mesh_name.includes('laptophalter')) {
            meshes[`${mesh_name}_scale`] = 0;                                                                       // needed for later use when determining lh_l_y_offset @ korpus-width = 80
        }
    });
    [`plexiglas${korpus_width}`, 'plexiglas100_poster', 'plexiglas_abdeckkappen'].forEach(mesh_name => {
        changeMeshScale(meshes[mesh_name], 1);
    });
    placeLaptophalterAndZubehoer();

    // AR
    let ar_message = modelviewer.canActivateAR
                        ? "On this device, you can view the 3D model in AR mode"
                        : "On this device, you <strong>unfortunately can't</strong> view the 3D model in AR mode";

    // Prevent controls interactions from affecting the XR scene
    document.querySelectorAll('.model-controls').forEach((model_control) => {
        model_control.addEventListener('beforexrselect', function() {
            this.preventDefault();
        });
    });
    //alert(modelviewer.exportScene(animations)) //getAttribute('ar-status'));

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
    // buttons for development
    document.getElementById('myButton1').addEventListener('click', function() {

    });
    document.getElementById('myButton2').addEventListener('click', function() {

    });

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