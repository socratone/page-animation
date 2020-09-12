const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const BOOK_WIDTH = 920; // 이 값에 따라 나머지 비율이 변한다.
const BOOK_HEIGHT = Math.round(BOOK_WIDTH * 0.6326);
const TOP_MARGIN = Math.round(BOOK_WIDTH * 0.1086);

const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', function () {
  turnNextPage();
});

const preButton = document.getElementById('pre-button');
preButton.addEventListener('click', function () {
  console.log('이전 버튼 클릭');
});

function turnNextPage() {
  let bottomEdgeX = BOOK_WIDTH;
  let bottomCornerX = BOOK_WIDTH;
  let bottomCornerY = BOOK_HEIGHT + TOP_MARGIN;
  let topCornerX = BOOK_WIDTH;
  let topCornerY = BOOK_HEIGHT + TOP_MARGIN;
  let topEdgeX = BOOK_WIDTH;
  let topEdgeY = BOOK_HEIGHT + TOP_MARGIN;

  let bottomCornerSpeed = 3.5;
  let topCornerSpeed = 3.5;

  const id = setInterval(function () {
    drawPageTurning({
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
    bottomEdgeX = BOOK_WIDTH - (BOOK_WIDTH - bottomCornerX) / 2;
  }

  function moveTopEdgeLeft() {
    topEdgeX = topEdgeX - 5;
  }

  function moveTopCornerLeft() {
    topCornerX = topCornerX - 10; // x축 이동
    // y축 상승
    if (topCornerX >= BOOK_WIDTH / 2) {
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
    if (bottomCornerX >= BOOK_WIDTH / 2) {
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
    drawPageTurning({
      bottomCornerX: 0,
      bottomCornerY: BOOK_HEIGHT + TOP_MARGIN,
      bottomEdgeX: BOOK_WIDTH / 2,
      topCornerX: 0,
      topCornerY: 0 + TOP_MARGIN,
      topEdgeX: BOOK_WIDTH / 2,
      topEdgeY: TOP_MARGIN,
    });
  }
}

function drawPageTurning({
  bottomEdgeX,
  bottomCornerX,
  bottomCornerY,
  topCornerX,
  topCornerY,
  topEdgeX,
  topEdgeY,
}) {
  ctx.clearRect(0, 0, BOOK_WIDTH, BOOK_HEIGHT + TOP_MARGIN);
  ctx.beginPath();
  ctx.moveTo(bottomEdgeX, BOOK_HEIGHT + TOP_MARGIN);
  ctx.lineTo(bottomCornerX, bottomCornerY);
  ctx.lineTo(topCornerX, topCornerY);
  ctx.lineTo(topEdgeX, topEdgeY);
  ctx.closePath();
  ctx.fillStyle = 'rgb(230, 230, 230)';
  ctx.fill();
  // ctx.stroke();
}
