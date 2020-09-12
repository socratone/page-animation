const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const TOP_MARGIN = 100;
const MAX_HEIGHT = 497;

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

  let turningSpeed = 3.5;

  const id = setInterval(function () {
    drawLine({
      bottomCornerX,
      bottomCornerY,
      bottomEdgeX,
      topCornerX,
      topCornerY,
      topEdgeX,
    });

    setBottomEdgeX();
    setTopEdgeX();

    setBottomCornerX();
    setTopCornerX();

    setCorners();

    if (bottomCornerX < 0) {
      clearInterval(id);
      trimBottomCorner();
    }
  }, 1);

  function setBottomCornerX() {
    bottomCornerX = bottomCornerX - 5;
  }

  function setTopCornerX() {
    topCornerX = topCornerX - 5;
  }

  function setBottomEdgeX() {
    bottomEdgeX = 920 - (920 - bottomCornerX) / 2;
  }

  function setTopEdgeX() {
    topEdgeX = 920 - (920 - bottomCornerX) / 2;
  }

  function setCorners() {
    // 상승
    if (bottomCornerX >= 920 / 2) {
      if (bottomCornerY > MAX_HEIGHT + TOP_MARGIN) {
        bottomCornerY -= turningSpeed;
        topCornerY -= turningSpeed;

        turningSpeed *= 0.96;
      }
      // 하강
    } else {
      bottomCornerY += turningSpeed;
      topCornerY += turningSpeed;

      turningSpeed *= 1.04;
    }
  }

  function trimBottomCorner() {
    drawLine({
      bottomCornerX: 0,
      bottomCornerY: 582 + TOP_MARGIN,
      bottomEdgeX: 920 / 2,
      topCornerX: 0,
      topCornerY: 0 + TOP_MARGIN,
      topEdgeX: 920 / 2,
    });
  }
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
