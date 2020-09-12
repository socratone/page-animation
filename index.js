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
  let bottomEdgeX = 920;
  let bottomCornerX = 920;
  let bottomCornerY = 582 + TOP_MARGIN;
  let topCornerX = 920;
  let topCornerY = 582 + TOP_MARGIN;
  let topEdgeX = 920;
  let topEdgeY = 582 + TOP_MARGIN;

  let bottomCornerSpeed = 3.5;
  let topCornerSpeed = 3.5;

  const id = setInterval(function () {
    drawLine({
      bottomEdgeX,
      bottomCornerX,
      bottomCornerY,
      topCornerX,
      topCornerY,
      topEdgeX,
      topEdgeY,
    });

    moveBottomCornerLeft();
    moveBottomEdgeLeft();
    if (topEdgeY <= 0 + TOP_MARGIN) {
      moveTopCornerLeft();
      moveTopEdgeLeft();
    } else {
      moveTopsUp();
    }

    if (bottomCornerX < 0) {
      clearInterval(id);
      trimPage();
    }
  }, 1);

  function moveBottomEdgeLeft() {
    bottomEdgeX = 920 - (920 - bottomCornerX) / 2;
  }

  function moveTopEdgeLeft() {
    topEdgeX = topEdgeX - 5;
  }

  function moveTopCornerLeft() {
    topCornerX = topCornerX - 10; // x축 이동
    // y축 상승
    if (topCornerX >= 920 / 2) {
      topCornerY -= topCornerSpeed;
      topCornerSpeed *= 0.96;
    } else {
      topCornerY += topCornerSpeed;
      topCornerSpeed *= 1.04;
    }
  }

  function moveBottomCornerLeft() {
    bottomCornerX = bottomCornerX - 5; // x축 이동
    // y축 상승
    if (bottomCornerX >= 920 / 2) {
      bottomCornerY -= bottomCornerSpeed;
      bottomCornerSpeed *= 0.96;
      // y축 하강
    } else {
      bottomCornerY += bottomCornerSpeed;
      bottomCornerSpeed *= 1.04;
    }
  }

  function moveTopsUp() {
    const result = topEdgeY - 6;
    if (result < 0 + TOP_MARGIN) {
      topEdgeY = 0 + TOP_MARGIN;
      topCornerY = 0 + TOP_MARGIN;
    } else {
      topEdgeY = result;
      topCornerY = result;
    }
  }

  function trimPage() {
    drawLine({
      bottomCornerX: 0,
      bottomCornerY: 582 + TOP_MARGIN,
      bottomEdgeX: 920 / 2,
      topCornerX: 0,
      topCornerY: 0 + TOP_MARGIN,
      topEdgeX: 920 / 2,
      topEdgeY: TOP_MARGIN,
    });
  }
}

function drawLine({
  bottomEdgeX,
  bottomCornerX,
  bottomCornerY,
  topCornerX,
  topCornerY,
  topEdgeX,
  topEdgeY,
}) {
  ctx.clearRect(0, 0, 920, 582 + TOP_MARGIN);
  ctx.beginPath();
  ctx.moveTo(bottomEdgeX, 582 + TOP_MARGIN);
  ctx.lineTo(bottomCornerX, bottomCornerY);
  ctx.lineTo(topCornerX, topCornerY);
  ctx.lineTo(topEdgeX, topEdgeY);
  ctx.closePath();
  ctx.stroke();
}
