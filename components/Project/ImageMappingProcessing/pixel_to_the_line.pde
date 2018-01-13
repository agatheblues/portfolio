PImage img;
int sliderStep = 2;
void setup() {
 size(600, 600);
 img = loadImage("debut.jpg");
}

void draw() { 
 background(255); 
 // int step = round(map(mouseX, 0, 600, 2 + sliderStep, 40) / sliderStep) * sliderStep;
int step = 4;
 for (int x = 0; x < width; x+=step) {
   for (int y = 0; y < height; y+=step) {
     color c = img.get(x, y);
     float b = brightness(c);
     float rot =  map(b, 0, 255, 0, TWO_PI);
     
     pushMatrix();
     translate(x, y);
     rotate(rot);
     stroke(c);
     line(- step, - step, step, step);
     popMatrix();
   }
 }
 
 save("debut-lines.jpg");
}