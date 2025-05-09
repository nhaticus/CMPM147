function getInspirations() {
  return [
    {
      name: "Deadpool", 
      assetUrl: "img/deadpool.jpg",
      credit: "Spreading love the Deadpoolway",
      shape: "ellipse",
      shapeReducer: 1.5 //bigger number = smaller shapes & hopefully ????better design???????
    },
    {
      name: "Train", 
      assetUrl: "img/train.jpg",
      credit: "Freedom train, 1947-49",
      shape: "rect",
      shapeReducer: 2
      
    },
    {
      name: "Lake", 
      assetUrl: "img/lake.jpg",
      credit: "Some lake some where",
      shape: "triangle",
      shapeReducer: 10  // don't really how to use this number to reduce
    },
  ];
}

function initDesign(inspiration) {
  // set the canvas size based on the container
  let canvasContainer = $('.image-container'); // Select the container using jQuery
  let canvasWidth = canvasContainer.width(); // Get the width of the container
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
  resizeCanvas(canvasWidth, canvasHeight);
  $(".caption").text(inspiration.credit); // Set the caption text

  // add the original image to #original
  const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
  $('#original').empty();
  $('#original').append(imgHTML);

  let shapeType = inspiration.shape;
  console.log("Shape type: " + shapeType);
  let shape = {};

  
  let design = {
    bg: 128,
    fg: []
  }
  
  for (let i = 0; i < 100; i++) {
    shape = {
      x: random(width),
      y: random(height),
      fill: random(255)
    }
  
    if (shapeType === 'rect') {
      shape.w = random(width/inspiration.shapeReducer);
      shape.h = random(height/inspiration.shapeReducer);
    } 
    else if (shapeType === 'ellipse') {
      shape.rx = random(width/inspiration.shapeReducer);
      shape.ry = random(height/inspiration.shapeReducer);
    } 
    else if (shapeType === 'triangle') {
      shape.x1 = random(width); shape.y1 = random(height);
      shape.x2 = random(width); shape.y2 = random(height);
      shape.x3 = random(width); shape.y3 = random(height);

      // failure
      // shape.cx = random(width);
      // shape.cy = random(height);
      // shape.w  = random(width  / 10);
      // shape.h = random(height / 10);
      
      // shape.x1 = shape.cx + random(-shape.w/2, shape.w/2);
      // shape.y1 = shape.cy + random(-shape.h/2, shape.h/2);
      // shape.x2 = shape.cx + random(-shape.w/2, shape.w/2);
      // shape.y2 = shape.cy + random(-shape.h/2, shape.h/2);
      // shape.x3 = shape.cx + random(-shape.w/2, shape.w/2);
      // shape.y3 = shape.cy + random(-shape.h/2, shape.h/2);
    }
    design.fg.push(shape);
  }

  return design;
}

function renderDesign(design, inspiration) {
  background(design.bg);
  noStroke();
  for (let shape of design.fg) {
    fill(shape.fill, 128);

    switch(inspiration.shape) {
      case 'rect':
        rect(shape.x, shape.y, shape.w, shape.h);
        break;

      case 'ellipse':
        ellipse(shape.x, shape.y, shape.rx, shape.ry);
        break;

      case 'triangle':
        triangle(shape.x1, shape.y1, shape.x2, shape.y2, shape.x3, shape.y3);
        break;
    }
  }
}


function mutateDesign(design, inspiration, rate) {
  design.bg = mut(design.bg, 0, 255, rate);

  for (let shape of design.fg) {
    shape.fill = mut(shape.fill, 0, 255, rate);
    shape.x = mut(shape.x, 0, width, rate);
    shape.y = mut(shape.y, 0, height, rate);
    if (inspiration.shape === 'rect') {
      shape.w = mut(shape.w, 0, width/inspiration.shapeReducer, rate);
      shape.h = mut(shape.h, 0, height/inspiration.shapeReducer, rate);
    } else if (inspiration.shape === 'ellipse') {
      shape.rx = mut(shape.rx, 0, width/inspiration.shapeReducer, rate);
      shape.ry = mut(shape.ry, 0, height/inspiration.shapeReducer, rate);
    } else if (inspiration.shape === 'triangle') {
      shape.x1 = mut(shape.x1, 0, width, rate);
      shape.y1 = mut(shape.y1, 0, height, rate);
      shape.x2 = mut(shape.x2, 0, width, rate);
      shape.y2 = mut(shape.y2, 0, height, rate);
      shape.x3 = mut(shape.x3, 0, width, rate);
      shape.y3 = mut(shape.y3, 0, height, rate);
    }
  }
}


function mut(num, min, max, rate) {
  return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}