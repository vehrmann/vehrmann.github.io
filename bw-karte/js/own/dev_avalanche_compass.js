// Get the canvas element and its 2d context
// coords start at lower left corner (?)
const canvas =              document.getElementById('canvas_avalanchecompass')
const ctx =                 canvas.getContext('2d')
ctx.textAlign =             'center'
ctx.textBaseline =          'middle'
const center_x =            canvas.width / 2
const center_y =            canvas.height / 2
const num_segments =        8
const angle_offset =        (Math.PI / num_segments)                // Needed to rotate to north
const segments_order =      [2,3,4,5,6,7,0,1]                       // Needed so that S-segment is drawn at the end and altitude-text is not covered by other segments
const segments_directions = ['SO','S','SW','W','NW','N','NO','O']
const directions_offset =   1.2                                     // How far segments_directions are away from outer circle stroke
const altitude_offset =     1.01                                    // How far altitude texts are away from their respective circle stroke

const circle_radii_list = [
    [],             // If no data is available, no circle is drawn
    [90],
    [90, 58],
    [90, 65, 40]
]


function drawDirectionText(i, radius, start_angle, end_angle) {
    let text_angle =    (start_angle + end_angle) / 2               // Radial angle for placing the text
    let text_x =        center_x + Math.cos(text_angle) * (radius * directions_offset)
    let text_y =        center_y + Math.sin(text_angle) * (radius * directions_offset)

    let text = segments_directions[i]

    ctx.font =          'bold 14px sans-serif'
    ctx.lineWidth =     1                       // Adjust the width of the contour
    ctx.strokeStyle =   '#000000'               // Contour color black
    ctx.fillStyle =     '#000000'               // Text color black

    //ctx.strokeText(text, text_x, text_y)
    ctx.fillText(text, text_x, text_y)
}

function drawAltitudeText(altitude, radius, start_angle, end_angle) {
    let text_angle =      (start_angle + end_angle) / 2       // Radial angle for placing the text
    let text_x =          center_x + Math.cos(text_angle) * (radius * altitude_offset)
    let text_y =          center_y + Math.sin(text_angle) * (radius * altitude_offset)

    ctx.font =          '14px sans-serif'
    ctx.lineWidth =     2                       // Adjust the width of the contour
    ctx.strokeStyle =   '#000000'               // Contour color black
    ctx.fillStyle =     '#ffffff'               // Text color white

    // Set shadow properties for outline
    ctx.shadowColor =   '#000000'               // Shadow color black
    ctx.shadowBlur =    3                       // Adjust the blur for the outline effect
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    ctx.strokeText(altitude, text_x, text_y)    // Draw the text contour, needs to be done first so it does not cover the actual text

    // Reset shadow properties for filling the actual text
    ctx.shadowColor =   'transparent'
    ctx.shadowBlur =    0

    ctx.fillText(altitude, text_x, text_y)      // Draw the actual text
}

function drawCircleSegment(circle_radius, avalanche_risk, critical_zones, altitude, draw_directions, x) {

    for (const i of segments_order) {
        ctx.lineWidth =     1                   // Reset lineWidth as it might be changed from textContour-drawing
        const start_angle = (i * 2 * Math.PI) / num_segments + angle_offset
        const end_angle =   ((i + 1) * 2 * Math.PI) / num_segments + angle_offset

        ctx.beginPath()
        ctx.moveTo(center_x, center_y)
        ctx.arc(center_x, center_y, circle_radius, start_angle, end_angle)
        ctx.closePath()

        const prev_neighbour_index = (i + (num_segments-1)) % num_segments  // prev_neighbour is ccw
        const next_neighbour_index = (i + 1) % num_segments                 // next_neighbour is cw
        let ctx_fill, higher_neighbour_is_clockwise

        if (x == 'circle1' && i == 8) { //6) {
            //alert(critical_zones[i])
            
            let gradient = ctx.createRadialGradient(center_x, center_y, 0, center_x, center_y, 90);
            gradient.addColorStop(58/90, color_avalancherisk_3);  // Inner color
            gradient.addColorStop(73/90, color_avalancherisk_2);  // Outer color
            ctx_fill = gradient
        } else {



            if (
                    ( critical_zones[i] == critical_zones[prev_neighbour_index] && critical_zones[i] == critical_zones[next_neighbour_index] )  //  prev neighbour equal    /   next neighbour equal
                ||  ( critical_zones[i] >  critical_zones[prev_neighbour_index] && critical_zones[i] >  critical_zones[next_neighbour_index] )  //  prev neighbour smaller  /   next neighbour smaller
                ||  ( critical_zones[i] >  critical_zones[prev_neighbour_index] && critical_zones[i] == critical_zones[next_neighbour_index] )  //  prev neighbour smaller  /   next neighbour equal
                ||  ( critical_zones[i] == critical_zones[prev_neighbour_index] && critical_zones[i] >  critical_zones[next_neighbour_index] )  //  prev neighbour equal    /   next neighbour smaller
                ) {
                    //  gradients:  - / -
                    ctx_fill = critical_zones[i] === 0 ? colors_avalancherisk[Math.max(1, avalanche_risk - 1)] : colors_avalancherisk[avalanche_risk]

            } else if (
                    ( critical_zones[i] <  critical_zones[prev_neighbour_index] && critical_zones[i] >  critical_zones[next_neighbour_index] )  //  prev neighbour higher   /   next neighbour smaller
                ||  ( critical_zones[i] <  critical_zones[prev_neighbour_index] && critical_zones[i] == critical_zones[next_neighbour_index] )  //  prev neighbour higher   /   next neighbour equal
                ) {
                    //  gradients:  ccw / -
                    higher_neighbour_is_clockwise = false

            } else if (
                    ( critical_zones[i] >  critical_zones[prev_neighbour_index] && critical_zones[i] <  critical_zones[next_neighbour_index] )  //  prev neighbour smaller  /   next neighbour higher
                ||  ( critical_zones[i] == critical_zones[prev_neighbour_index] && critical_zones[i] <  critical_zones[next_neighbour_index] )  //  prev neighbour equal    /   next neighbour higher
                ) {
                    //  gradients:  - / cw
                    higher_neighbour_is_clockwise = true

            } else if (
                    ( critical_zones[i] < critical_zones[prev_neighbour_index] && critical_zones[i] < critical_zones[next_neighbour_index] )    //  prev neighbour higher   /   next neighbour higher
                ) {
                    //  gradients:  ccw / cw, special case
                    ctx_fill = 'red'   // correct this
            }
            

            if (!ctx_fill) {
                let gradient;
                if (i == 2) {           // SW
                    gradient = ctx.createLinearGradient(0, 0, center_x*2, center_y*2)
                } else if (i == 3) {    // W
                    gradient = ctx.createLinearGradient(0, 0, 0, center_y*2)
                } else if (i == 4) {    // NW
                    gradient = ctx.createLinearGradient(center_x*2, 0, 0, center_y*2)
                } else if (i == 5) {    // N
                    gradient = ctx.createLinearGradient(center_x*2, 0, 0, 0)
                } else if (i == 6) {    // NO
                    gradient = ctx.createLinearGradient(center_x*2, center_y*2, 0, 0)
                } else if (i == 7) {    // O
                    gradient = ctx.createLinearGradient(0, center_y*2, 0, 0)
                } else if (i == 0) {    // SO
                    gradient = ctx.createLinearGradient(0, center_y*2, center_x*2, 0)
                } else if (i == 1) {    // S
                    gradient = ctx.createLinearGradient(0, 0, center_x*2, 0)
                }

                const gradientColor1 = colors_avalancherisk[avalanche_risk]                     // Starting color
                const gradientColor2 = colors_avalancherisk[Math.max(1, avalanche_risk - 1)]    // Ending color

                // Add color stops to the gradient
                if (higher_neighbour_is_clockwise) {
                    gradient.addColorStop(0.45, gradientColor1)
                    gradient.addColorStop(0.55, gradientColor2)
                    ctx_fill = gradient
                } else {
                    gradient.addColorStop(0.45, gradientColor2)
                    gradient.addColorStop(0.55, gradientColor1)
                    ctx_fill = gradient
                }
            }
        }

        ctx.fillStyle = ctx_fill
        ctx.fill()
        ctx.stroke()

        if (i == 1) {
            drawAltitudeText(altitude, circle_radius, start_angle, end_angle)
        }
        if (draw_directions) {
            drawDirectionText(i, circle_radius, start_angle, end_angle)
        }
    }
}

function drawCircleSegments(circles) {
    let num_circles =   Object.keys(circles).length
    let circle_radii =  circle_radii_list[num_circles]

    let i = 0
    for (const key in circles) {
        const circle =              circles[key]
    
        let altitude =              circle.altitude
        let avalanche_risk =        circle.avalanche_risk
        let avalanche_problems =    circle.avalanche_problems
        let critical_zones =        circle.critical_zones
        let draw_directions =       (i === 0) ? true : false
        drawCircleSegment(circle_radii[i], avalanche_risk, critical_zones, altitude, draw_directions, key)
        i += 1
    }
}


// example: https://www.sais.gov.uk/northern-cairngorms/?report_id=11464
// https://www.lukasruetz.at/2022/12/28-12-2022-weitere-lawinenausloesungen-lampsenspitze-rietzer-grieskogel-verbreitung-momentanes-altschneeproblem/


// https://lawinen.report/bulletin/2023-04-24?region=AT-07-22#32c0dc8f-901b-497b-be91-f6db461690cb
let circles_1 = {
    circle1:    {   altitude:           '',
                    avalanche_risk:     1,
                    //avalanche_risk:     2,
                    avalanche_problems: [''],
                    critical_zones:   [0, 0, 0, 0, 1, 1, 1, 0]
                    //critical_zones:   [0, 0, 0, 0, 1, 1, 1, 0]
                },
    circle2:    {   altitude:           2400,
                    avalanche_risk:     3,
                    avalanche_problems: ['persistent_weak_layers', 'wind_slab'],
                    critical_zones:   [0, 0, 0, 0, 1, 1, 1, 0]
                    //critical_zones:   [0, 0, 0, 0, 0, 0, 1, 0]
                }
}


// https://lawinen.report/bulletin/2023-05-01?region=AT-07-15#33795fa1-fecf-4078-bbe4-277eb616efb8
let circles_2 = {
    circle1:    {   altitude:           '',
                    avalanche_risk:     3,
                    avalanche_problems: ['wet_snow'],
                    critical_zones:     [1, 1, 1, 1, 1, 1, 1, 1]
                },
    circle2:    {   altitude:           2600,
                    avalanche_risk:     2,
                    avalanche_problems: ['persistent_weak_layers'],
                    critical_zones:     [0, 0, 0, 0, 1, 1, 1, 0]
                }
}


// https://lawinen.report/bulletin/2023-04-24?region=IT-32-TN-19#492cbeca-14fa-45fe-9659-5c0640a9b26b
let circles_3 = {
    circle1:    {   altitude:           '',
                    avalanche_risk:     1,
                    avalanche_problems: ['wet_snow'],
                    critical_zones:     [1, 1, 1, 1, 1, 1, 1, 1]
                },
    circle2:    {   altitude:           2000,
                    avalanche_risk:     3,
                    avalanche_problems: ['wind_slab'],
                    critical_zones:     [1, 1, 1, 1, 1, 1, 1, 1]
                }
}

// https://lawinen.report/bulletin/2023-04-24?region=AT-07-14-01#2ffa6cc4-2bc4-4268-8fa6-180be09da4ef
let circles_4 = {
    circle1:    {   altitude:           '',
                    avalanche_risk:     1,
                    avalanche_problems: [],
                    critical_zones:     [1, 1, 1, 1, 1, 1, 1, 1]
                },
    circle2:    {   altitude:           2400,
                    avalanche_risk:     2,
                    avalanche_problems: ['persistent_weak_layers', 'wind_slab'],
                    critical_zones:     [0, 0, 0, 0, 1, 1, 1, 0]
                }
}

drawCircleSegments(circles_1)






/* DEV, if altitude text should be arced on circle stroke
function drawArchedAltitudeText(altitude, start_angle, end_angle, circle_radius, letter_spacing) {
    const text_angle = (end_angle - start_angle)       // Radial angle for placing the text
    const characters = altitude.split('')
    const anglePerChar = text_angle / (characters.length -1)   // one gap less than chars available

    characters.forEach((char, index) => {
        const charAngle = end_angle - index * anglePerChar
        const char_x = center_x + circle_radius * Math.cos(charAngle)
        const char_y = center_y + circle_radius * Math.sin(charAngle)

        //ctx.save()
        //ctx.translate(char_x, char_y)
        //ctx.rotate(charAngle + Math.PI / 2)  // Adjust rotation as needed
        ctx.lineWidth =     3           // Adjust the width of the contour
        ctx.font =          '16px Tahoma'
        ctx.textAlign =     'center'
        ctx.textBaseline =  'middle'
        ctx.strokeText(char, char_x, char_y)
        ctx.fillText(char, char_x, char_y)
        ctx.restore()
    })
}
*/