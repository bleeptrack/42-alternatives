//First things first: here are your global settings for rendering
//most of these settings can also be changed live via keyboard shortcuts
function setGlobals() {
    pointsPerFrame     = 50000;

    cameraPosition = new THREE.Vector3(0, 0, 150);
    cameraFocalDistance = 150;

    minimumLineSize = 0.005;

    bokehStrength = 0.02; 
    focalPowerFunction = 1;
    exposure = 0.009;
    distanceAttenuation = 0.0962;

    useBokehTexture = true;
    bokehTexturePath = "assets/bokeh/pentagon2.png";

    backgroundColor[0] *= 0.8;
    backgroundColor[1] *= 0.8;
    backgroundColor[2] *= 0.8;
}

//seed: this variable defines the randomness of your image. 
//If you want the image to stay the same, assign seed a number of your choice like 174872927
let myseed = Math.random()*99999999;

//Don't edit these 4 lines. I'm setting up some helpers for you here :)
noise.seed(myseed);
Utils.setRandomSeed(""+myseed);
let rand  = function() { return Utils.rand(); };
let vec3      = function(x,y,z) { return new THREE.Vector3(x,y,z) };

//Here we have 4 colors from the official 42 corporate design for your easy usage
let blue42 = vec3(0, 186, 188);
let pink42 = vec3(209, 1, 191);
let yellow42 = vec3(241, 202, 55);
let white42 = vec3(255, 255, 255);


//createScene is your main function. The rendering process enters here
function createScene() {
    
    sparkeOrb(vec3(0,0,0), 5, 0, yellow42);
    
    for(let i = 0; i< 5; i++){
            sparkeOrb(pointOnOrb().multiplyScalar(20), 2, 1, pink42);
    }
    
    for(let i = 0; i<50; i++){
        line(pointOnOrb().multiplyScalar(3), blue42);
    }
}

//From here on I have added some functions and helpers to draw cool things

//draws a swirly line that starts/ends at lastPos
// (vec3) lastPos: position there the line should start/end
// (vec3) color: line color
function line(lastPos, color){
    let mainDir = lastPos.clone()
    let scale = 50
    
    for(let i = 0; i<40; i++){
        
        let dirx = noise.simplex3(lastPos.x / scale, lastPos.y / scale, lastPos.z / scale)
        let diry = noise.simplex3(lastPos.x / scale + 100, lastPos.y / scale + 100, lastPos.z / scale + 100)
        let dirz = noise.simplex3(lastPos.x / scale + 200, lastPos.y / scale + 200, lastPos.z / scale + 200)
        
        let dir = mainDir.clone()
        dir = dir.applyAxisAngle(vec3(1,0,0), dirx  * Math.PI - Math.PI/2)
        dir = dir.applyAxisAngle(vec3(0,1,0), diry  * Math.PI - Math.PI/2)
        dir = dir.applyAxisAngle(vec3(0,0,1), dirz  * Math.PI - Math.PI/2)
        
        lines.push(
            new Line({
                v1: lastPos,
                v2: dir.multiplyScalar(0.5).add(lastPos),
                c1: color,
                c2: color,
                weight: 1
            })
        );
        
        lastPos = dir;
    }
}


//generates a random point on a sphere with radius 1
// return: (vec3) point position
function pointOnOrb(){
    let phi2 = rand() * Math.PI * 2;
    let theta2 = rand() * Math.PI - Math.PI * 0.5;


    let x2 = Math.sin(phi2) * Math.cos(theta2);
    let y2 = Math.sin(theta2);
    let z2 = Math.cos(phi2) * Math.cos(theta2);
    
    return vec3(x2, y2, z2);
}

//draws a sparkly orb/sphere at a certain Position
// (vec3) pos: orb center position
// (Number) radius: radius/size of the orb
// (Number) scatter: larger numbers make the orb mre fuzzy looking
// (vec3) color: color of sparkes on orb
function sparkeOrb(pos, radius, scatter, color){
    
    for(let j = 0; j < 500; j++) {

            let center = pointOnOrb();
            center.add(vec3(rand()*scatter, rand()*scatter, rand()*scatter))

            lines.push(
                new Line({
                    v1: center.clone().multiplyScalar(radius).add(pos),
                    v2: center.clone().multiplyScalar(radius + 0.1).add(pos),
                    c1: color,
                    c2: color,
                    weight: 1
                })
            );
    }
}






