// 卡片花色图案绘制函数

// 绘制红桃图案
function drawHeart(x, y, size) {
  fill('red');
  beginShape();
  vertex(x, y);
  bezierVertex(x-size/2, y-size/2, x-size, y+size/3, x, y+size);
  bezierVertex(x+size, y+size/3, x+size/2, y-size/2, x, y);
  endShape(CLOSE);
}

// 绘制方块图案
function drawDiamond(x, y, size) {
  fill('red');
  beginShape();
  vertex(x, y-size/2);
  vertex(x+size/2, y);
  vertex(x, y+size/2);
  vertex(x-size/2, y);
  endShape(CLOSE);
}

// 绘制黑桃图案
function drawSpade(x, y, size) {
  fill('black');
  beginShape();
  vertex(x, y-size/2);
  bezierVertex(x-size, y-size/2, x-size, y+size/2, x, y+size/3);
  bezierVertex(x+size, y+size/2, x+size, y-size/2, x, y-size/2);
  endShape(CLOSE);
  triangle(x-size/4, y+size/3, x+size/4, y+size/3, x, y+size/2);
}

// 绘制梅花图案
function drawClub(x, y, size) {
  fill('black');
  circle(x, y-size/4, size/2);
  circle(x-size/3, y+size/8, size/2);
  circle(x+size/3, y+size/8, size/2);
  triangle(x-size/4, y, x+size/4, y, x, y+size/2);
}

// 卡片翻转动画变量
let flipAngle = 0; // 当前翻转角度
let flipDirection = 1; // 翻转方向：1正面到背面，-1背面到正面
let flipSpeed = 0.15; // 翻转速度
let isFlipping = false; // 是否正在翻转
let cardToFlip = -1; // 正在翻转的卡片

// 开始卡片翻转动画
function startCardFlip(cardIndex) {
  if (!isFlipping) {
    cardToFlip = cardIndex;
    isFlipping = true;
    flipAngle = 0;
    flipDirection = showFront ? -1 : 1; // 根据当前状态决定翻转方向
  }
}

// 更新卡片翻转动画
function updateCardFlip() {
  if (isFlipping) {
    flipAngle += flipSpeed * flipDirection;
    
    // 完成翻转
    if (flipAngle >= PI/2 || flipAngle <= -PI/2) {
      isFlipping = false;
      flipAngle = 0;
      // 如果翻转完成，更新卡片状态
      if (flipDirection > 0) {
        showFront = true;
      } else {
        showFront = false;
      }
    }
    return true; // 动画仍在进行中
  }
  return false; // 没有动画
}

// 绘制3D卡片
function drawCard3D(i, x, y) {
  let isFlippingThisCard = isFlipping && i === cardToFlip;
  let showCardFront = (i === selectedCard && showFront) || (isFlippingThisCard && flipDirection > 0 && flipAngle > PI/2);
  
  push();
  translate(x + card_width/2, y + card_height/2, 0);
  
  // 如果是当前翻转的卡片，应用翻转动画
  if (isFlippingThisCard) {
    rotateY(flipAngle);
    
    // 确定正在翻转过程中应该显示正面还是背面
    if (flipAngle > 0 && flipAngle < PI/2) {
      // 翻转过程中背面朝上
      drawCardBackWebGL(0, 0, card_width, card_height);
    } else {
      // 翻转过程中正面朝上
      drawCardFrontWebGL(i, 0, 0);
    }
  } else {
    // 非翻转状态，根据卡片选中状态显示正面或背面
    if (showCardFront) {
      drawCardFrontWebGL(i, 0, 0);
    } else {
      drawCardBackWebGL(0, 0, card_width, card_height);
    }
  }
  
  pop();
}

// 绘制卡片正面 (WebGL版本)
function drawCardFrontWebGL(i, x, y) {
  // 绘制卡片底色
  fill('white');
  plane(card_width, card_height);
  
  let card_label = i%13 + 1;
  if (card_label == 11) {
    card_label = 'J';
  } else if (card_label == 12) {
    card_label = 'Q';
  } else if (card_label == 13) {
    card_label = 'K';
  }
  
  // 绘制正面花色（WebGL中需要微调位置）
  let suit = floor(i / 13);
  let patternSize = 20;
  
  push();
  translate(0, 0, 1); // 将花色图案放在卡片前面以便可见
  if (suit == 0) {
    drawHeart(0, -patternSize/2, patternSize);
  } else if (suit == 1) {
    drawDiamond(0, 0, patternSize);
  } else if (suit == 2) {
    drawSpade(0, 0, patternSize);
  } else if (suit == 3) {
    drawClub(0, 0, patternSize);
  }
  
  // 绘制标签
  fill('black');
  if (suit <= 1) { // 红桃和方块用红色
    fill('red');
  }
  
  // 左上角标签
  push();
  translate(-card_width/2 + 10, -card_height/2 + 15, 0);
  text(card_label, 0, 0);
  pop();
  
  // 右下角标签
  push();
  translate(card_width/2 - 10, card_height/2 - 15, 0);
  rotateZ(PI);
  text(card_label, 0, 0);
  pop();
  
  pop();
}

// 绘制卡片背面 (WebGL版本)
function drawCardBackWebGL(x, y, w, h) {
  // 绘制卡片边框
  fill('darkred');
  plane(w, h);
  
  // 绘制内框
  push();
  fill('white');
  translate(0, 0, 0.5);
  plane(w - 6, h - 6);
  
  // 绘制菱形网格
  fill('darkred');
  let gridSize = 5;
  let spacingX = 5;
  let spacingY = 7;
  let startX = -w/2 + 10;
  let startY = -h/2 + 10;
  
  for (let i = 0; i < w / spacingX - 4; i++) {
    for (let j = 0; j < h / spacingY - 3; j++) {
      let posX = startX + i * spacingX;
      let posY = startY + j * spacingY;
      
      // 错位排列
      if (j % 2 === 1) {
        posX += spacingX / 2;
      }
      
      push();
      translate(posX, posY, 1);
      drawDiamondPatternWebGL(gridSize);
      pop();
    }
  }
  pop();
}

// 绘制单个小菱形图案 (WebGL版本)
function drawDiamondPatternWebGL(size) {
  beginShape();
  vertex(0, -size/2, 0);
  vertex(size/2, 0, 0);
  vertex(0, size/2, 0);
  vertex(-size/2, 0, 0);
  endShape(CLOSE);
}

// 原始的绘制卡片背面函数（保留用于2D模式）
function drawCardBack(x, y, w, h) {
  // 绘制卡片边框
  fill('darkred'); // 深红色边框
  rect(x, y, w, h, 2);
  
  // 绘制内框
  fill('white');
  rect(x + 3, y + 3, w - 6, h - 6, 1);
  
  // 绘制菱形网格
  fill('darkred'); // 深红色菱形
  let gridSize = 5; // 菱形大小
  let spacingX = 5;
  let spacingY = 7;
  
  for (let i = 0; i < w / spacingX; i++) {
    for (let j = 0; j < h / spacingY; j++) {
      let posX = x + 6 + i * spacingX;
      let posY = y + 3 + j * spacingY;
      
      // 错位排列
      if (j % 2 === 1) {
        posX += spacingX / 2;
      }
      
      // 如果超出边界，则不绘制
      if (posX > x + w - 6 || posY > y + h) continue;
      
      // 绘制菱形
      drawDiamondPattern(posX, posY, gridSize);
    }
  }
}

// 绘制单个小菱形图案
function drawDiamondPattern(x, y, size) {
  beginShape();
  vertex(x, y - size/2);
  vertex(x + size/2, y);
  vertex(x, y + size/2);
  vertex(x - size/2, y);
  endShape(CLOSE);
} 