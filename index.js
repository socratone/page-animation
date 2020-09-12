const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const TOP_MARGIN = 100;

const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', function() {

  turnNextPage();
  
});

const preButton = document.getElementById('pre-button');
preButton.addEventListener('click', function() {
  
});

function turnNextPage() {
  let vertexX = 920;
  let vertexY = 582 + TOP_MARGIN;
  let bottomX = 920;

  let turningSpeed = {
    y: 3.5
  }

  const id = setInterval(function() {
    drawLine(vertexX, vertexY, bottomX);
    vertexX = vertexX - 5;
    bottomX = 920 - ((920 - vertexX) / 2)

    if (vertexX >= 920 / 2) {
      if (vertexY > 497 + TOP_MARGIN) {
        vertexY = vertexY - turningSpeed.y;
        turningSpeed.y *= 0.96;
      } else {
        vertexY = 497 + TOP_MARGIN;
      }
      // console.log('vertexY:', vertexY)
    } else {
      vertexY = vertexY + turningSpeed.y;
      turningSpeed.y *= 1.04;
    }
    if (vertexX < 0) clearInterval(id);
  }, 1)
}

function drawLine(vertexX, vertexY, bottomX) {
  ctx.clearRect(0, 0, 920, 582 + TOP_MARGIN);
  ctx.beginPath();
  ctx.moveTo(bottomX, 582 + TOP_MARGIN);
  ctx.lineTo(vertexX, vertexY);
  ctx.lineTo(920, 0 + TOP_MARGIN);
  ctx.closePath();
  ctx.stroke();
}