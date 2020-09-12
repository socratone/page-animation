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
  let bottomVertexX = 920;
  let bottomVertexY = 582 + TOP_MARGIN;
  let bottomX = 920;
  let topX = 920;
  let topVertextX = 920;
  let topVertextY = 0 + TOP_MARGIN;

  let turningSpeed = {
    y: 3.5
  }

  const id = setInterval(function() {
    drawLine({ bottomVertexX, bottomVertexY, bottomX, topVertextX, topVertextY, topX });
    bottomVertexX = bottomVertexX - 5;
    topVertextX = topVertextX - 5;

    bottomX = 920 - ((920 - bottomVertexX) / 2)
    topX = 920 - ((920 - bottomVertexX) / 2)

    if (bottomVertexX >= 920 / 2) {
      if (bottomVertexY > 497 + TOP_MARGIN) {
        bottomVertexY = bottomVertexY - turningSpeed.y;

        topVertextY = topVertextY - turningSpeed.y;

        turningSpeed.y *= 0.96;

      }
      // console.log('bottomVertexY:', bottomVertexY)
    } else {
      bottomVertexY = bottomVertexY + turningSpeed.y;
      topVertextY = topVertextY + turningSpeed.y;
      turningSpeed.y *= 1.04;
    }

    if (bottomVertexX < 0) clearInterval(id);
  }, 1)
}

function drawLine({ bottomVertexX, bottomVertexY, bottomX, topVertextX, topVertextY, topX }) {
  ctx.clearRect(0, 0, 920, 582 + TOP_MARGIN);
  ctx.beginPath();
  ctx.moveTo(bottomX, 582 + TOP_MARGIN);
  ctx.lineTo(bottomVertexX, bottomVertexY);
  ctx.lineTo(topVertextX, topVertextY);
  ctx.lineTo(topX, 0 + TOP_MARGIN);
  ctx.closePath();
  ctx.stroke();
}