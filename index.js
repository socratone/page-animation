const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const TOP_MARGIN = 100;

const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', function () {
  turnNextPage();
});

const preButton = document.getElementById('pre-button');
preButton.addEventListener('click', function () {
  console.log('이전 버튼 클릭');
});

function turnNextPage() {
  let bottomCornerX = 920;
  let bottomCornerY = 582 + TOP_MARGIN;
  let bottomEdgeX = 920;
  let topEdgeX = 920;
  let topCornerX = 920;
  let topCornerY = 0 + TOP_MARGIN;

  let turningSpeed = {
    y: 3.5,
  };

  const id = setInterval(function () {
    drawLine({
      bottomCornerX,
      bottomCornerY,
      bottomEdgeX,
      topCornerX,
      topCornerY,
      topEdgeX,
    });
    bottomCornerX = bottomCornerX - 5;
    topCornerX = topCornerX - 5;

    bottomEdgeX = 920 - (920 - bottomCornerX) / 2;
    topEdgeX = 920 - (920 - bottomCornerX) / 2;

    if (bottomCornerX >= 920 / 2) {
      if (bottomCornerY > 497 + TOP_MARGIN) {
        bottomCornerY = bottomCornerY - turningSpeed.y;

        topCornerY = topCornerY - turningSpeed.y;

        turningSpeed.y *= 0.96;
      }
      // console.log('bottomCornerY:', bottomCornerY)
    } else {
      bottomCornerY = bottomCornerY + turningSpeed.y;
      topCornerY = topCornerY + turningSpeed.y;
      turningSpeed.y *= 1.04;
    }

    if (bottomCornerX < 0) clearInterval(id);
  }, 1);
}

function drawLine({
  bottomCornerX,
  bottomCornerY,
  bottomEdgeX,
  topCornerX,
  topCornerY,
  topEdgeX,
}) {
  ctx.clearRect(0, 0, 920, 582 + TOP_MARGIN);
  ctx.beginPath();
  ctx.moveTo(bottomEdgeX, 582 + TOP_MARGIN);
  ctx.lineTo(bottomCornerX, bottomCornerY);
  ctx.lineTo(topCornerX, topCornerY);
  ctx.lineTo(topEdgeX, 0 + TOP_MARGIN);
  ctx.closePath();
  ctx.stroke();
}
