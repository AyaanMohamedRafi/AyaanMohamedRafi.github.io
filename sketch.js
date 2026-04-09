var sunDiameter = 65;
var moonDiameter = 2;
var baseSpeed = 0.02;
// assume 0.02 is earth year
// radius 100 = 1 AU

var planets = [
      { name: "Mercury", r: 39, size: 4, speed: baseSpeed / 0.24, angle: 0, colour:'#EAE8EB' },
      { name: "Venus", r: 72, size: 7, speed: baseSpeed / 0.62, angle: 0, colour:'#D9AF3C' },
      { name: "Earth", r: 100, size: 7.5, speed: 0.02, angle: 0, colour:'#48A42E' },
      { name: "Mars", r: 152, size: 5.5, speed: baseSpeed / 1.88, angle: 0, colour:'#C66554' },
      { name: "Jupiter", r: 320, size: 18.5, speed:baseSpeed / 11.86, angle: 0, colour:'#B17E0A' },
      { name: "Saturn", r: 390, size: 15, speed: baseSpeed / 29.46 , angle: 0, colour:'#D1BB79' },
      { name: "Uranus", r: 450, size: 10, speed: baseSpeed / 84.01, angle: 0, colour:'#919EDF' },
      { name: "Neptune", r: 610, size: 9.5, speed: baseSpeed / 164.08, angle: 0, colour:'#0A16AF' }
];
// i dont feel like making moons for all the planets
var moon = { r: 15, size: 2.5, speed: 0.1, angle: 0 };

function setup() {
  createCanvas(1500,1500);
  centerX = width / 2;
  centerY = height / 2;
  textSize(10);
  fill(255);
}


function draw(){
  
    background('rgb(0,0,0)');
    noStroke();
    fill ('yellow')
    circle(centerX,centerY, sunDiameter);
  
    planets.forEach(planet =>{
      planet.angle += planet.speed;

      var x = centerX + planet.r * cos(planet.angle);
      var y = centerY + planet.r * sin(planet.angle);

      noFill();
      stroke('gray');
      circle(centerX,centerY,planet.r*2);

      noStroke();
      fill(planet.colour);
      circle(x,y,planet.size);

      fill(255);
      if (planet.name != 'Saturn') {
      text(planet.name,x+15,y+15);
      }

             // The moon and Saturns rings
      if (planet.name === 'Earth') {
        moon.angle += moon.speed;

        var moonX = x + moon.r * cos(moon.angle);
        var moonY = y + moon.r * sin(moon.angle);

        fill ('rgb(112,112,112)')
        circle(moonX,moonY, moonDiameter)
      }
        if (planet.name === 'Saturn') {
          push();
          translate(x, y);
          rotate(0.6);
          
          

          noFill();
          stroke(200, 180, 120);
          strokeWeight(2);

          ellipse(0, 0, planet.size * 2.5, planet.size * 1);
          ellipse(0, 0, planet.size * 3.5, planet.size * 1.4);
          
          pop();
          text("Saturn",x+10,y+30);
        }
    noStroke();
    fill(planet.colour);
    circle(x,y,planet.size);
      
      });
}

           
