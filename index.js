function PageTurning(bookWidth, turningSpeed) {
  const TURNING_SPEED = turningSpeed;
  const BOOK_WIDTH = bookWidth; // 이 값에 따라 나머지 비율이 변한다.
  const BOOK_HEIGHT = Math.round(BOOK_WIDTH * 0.6326);
  const TOP_MARGIN = Math.round(BOOK_WIDTH * 0.1086);

  const canvasWrapper = document.getElementById('canvas-wrapper');
  canvasWrapper.style.width = BOOK_WIDTH + 'px';
  canvasWrapper.style.height = BOOK_HEIGHT + 'px';

  const canvasBackground = document.getElementById('canvas-background');
  canvasBackground.style.width = BOOK_WIDTH + 'px';
  canvasBackground.style.height = BOOK_HEIGHT + 'px';

  const canvas = document.getElementById('canvas');
  canvas.width = BOOK_WIDTH;
  canvas.height = BOOK_HEIGHT + TOP_MARGIN;
  const ctx = canvas.getContext('2d');

  let animationId;

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', function () {
    animationId && clearInterval(animationId);
    turnNextPage();
  });

  const preButton = document.getElementById('pre-button');
  preButton.addEventListener('click', function () {
    animationId && clearInterval(animationId);
    turnPrePage();
  });

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
  }

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

    animationId = setInterval(function () {
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

      if (bottomCornerX <= 0) bottomCornerX = 0;
      if (topCornerX <= 0) topCornerX = 0;
      if (bottomCornerX === 0 && topCornerX === 0) {
        clearInterval(animationId);
        trimPage();
      }
    }, TURNING_SPEED);

    function moveBottomEdgeLeft() {
      const result = BOOK_WIDTH - (BOOK_WIDTH - bottomCornerX) / 2;
      if (result <= BOOK_WIDTH / 2) {
        bottomEdgeX = BOOK_WIDTH / 2;
      } else {
        bottomEdgeX = result;
      }
    }

    function moveTopEdgeLeft() {
      const result = BOOK_WIDTH - (BOOK_WIDTH - topCornerX) / 2;
      if (result <= BOOK_WIDTH / 2) {
        topEdgeX = BOOK_WIDTH / 2;
      } else {
        topEdgeX = result;
      }
    }

    function moveTopCornerLeft() {
      topCornerX -= 16; // x축 이동 속도
      if (topCornerX >= BOOK_WIDTH / 2) {
        topCornerY -= topCornerSpeed; // y축 상승
        topCornerSpeed *= 0.96;
      } else {
        topCornerY += topCornerSpeed; // y축 하강
        topCornerSpeed *= 1.04;
      }
    }

    function moveBottomCornerLeft() {
      bottomCornerX -= 10; // x축 이동 속도
      if (bottomCornerX >= BOOK_WIDTH / 2) {
        bottomCornerY -= bottomCornerSpeed; // y축 상승
        bottomCornerSpeed *= 0.96;
      } else {
        bottomCornerY += bottomCornerSpeed; // y축 하강
        bottomCornerSpeed *= 1.04;
      }
    }

    function moveTopsUp() {
      const result = topEdgeY - 16; // y축 이동 속도
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

  function turnPrePage() {
    let bottomEdgeX = 0;
    let bottomCornerX = 0;
    let bottomCornerY = BOOK_HEIGHT + TOP_MARGIN;
    let topCornerX = 0;
    let topCornerY = BOOK_HEIGHT + TOP_MARGIN;
    let topEdgeX = 0;
    let topEdgeY = BOOK_HEIGHT + TOP_MARGIN;

    let bottomCornerSpeed = 3.5;
    let topCornerSpeed = 3.5;

    animationId = setInterval(function () {
      drawPageTurning({
        bottomEdgeX,
        bottomCornerX,
        bottomCornerY,
        topCornerX,
        topCornerY,
        topEdgeX,
        topEdgeY,
      });

      moveBottomCornerRight();
      moveBottomEdgeRight();
      if (topEdgeY <= 0 + TOP_MARGIN) {
        moveTopCornerRight();
        moveTopEdgeRight();
      } else {
        moveTopsUp();
      }

      if (bottomCornerX >= BOOK_WIDTH) bottomCornerX = BOOK_WIDTH;
      if (topCornerX >= BOOK_WIDTH) topCornerX = BOOK_WIDTH;
      if (bottomCornerX === BOOK_WIDTH && topCornerX === BOOK_WIDTH) {
        clearInterval(animationId);
        trimPage();
      }
    }, TURNING_SPEED);

    function moveBottomEdgeRight() {
      const result = bottomCornerX / 2;
      if (result >= BOOK_WIDTH / 2) {
        bottomEdgeX = BOOK_WIDTH / 2;
      } else {
        bottomEdgeX = result;
      }
    }

    function moveTopEdgeRight() {
      const result = topCornerX / 2;
      if (result >= BOOK_WIDTH / 2) {
        topEdgeX = BOOK_WIDTH / 2;
      } else {
        topEdgeX = result;
      }
    }

    function moveTopCornerRight() {
      topCornerX += 16; // x축 이동 속도
      if (topCornerX <= BOOK_WIDTH / 2) {
        topCornerY -= topCornerSpeed; // y축 상승
        topCornerSpeed *= 0.96;
      } else {
        topCornerY += topCornerSpeed; // y축 하강
        topCornerSpeed *= 1.04;
      }
    }

    function moveBottomCornerRight() {
      bottomCornerX += 10; // x축 이동 속도
      if (bottomCornerX <= BOOK_WIDTH / 2) {
        bottomCornerY -= bottomCornerSpeed; // y축 상승
        bottomCornerSpeed *= 0.96;
      } else {
        bottomCornerY += bottomCornerSpeed; // y축 하강
        bottomCornerSpeed *= 1.04;
      }
    }

    function moveTopsUp() {
      const result = topEdgeY - 16; // y축 이동 속도
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
        bottomCornerX: BOOK_WIDTH,
        bottomCornerY: BOOK_HEIGHT + TOP_MARGIN,
        bottomEdgeX: BOOK_WIDTH / 2,
        topCornerX: BOOK_WIDTH,
        topCornerY: 0 + TOP_MARGIN,
        topEdgeX: BOOK_WIDTH / 2,
        topEdgeY: TOP_MARGIN,
      });
    }
  }
}

PageTurning(1000, 5);
