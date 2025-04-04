// 2025-04-04
// A composition of shapes (size, shape, or color of your choice) that demonstrates predictability.

// the story: I went to play cards in casino. I want to play the easiest game.

// size of the card
let card_width = 50;
let card_height = 70;

// card layout parameters
let space_x = 60;
let space_y = 80;
// 计算适当的边距以使卡片在画布中居中
// 总宽度 = (13-1) * space_x + card_width = 12 * 60 + 50 = 770
// 总高度 = (4-1) * space_y + card_height = 3 * 80 + 70 = 310
// 水平边距 = (canvas宽度 - 总宽度) / 2 = (900 - 770) / 2 = 65
// 垂直边距 = (canvas高度 - 总高度) / 2 = (450 - 310) / 2 = 70
let margin_x = 65;
let margin_y = 70;

// 控制卡片显示
let showFront = false; // 默认显示卡片背面
let selectedCard = -1; // 当前选中的卡片，-1表示没有选中

// setup canvas
function setup() {
  createCanvas(900, 450, WEBGL); // 使用WEBGL模式
  noStroke();
  fill('white');
  textAlign(CENTER, CENTER);
}

// 鼠标点击事件
function mousePressed() {
  // 将鼠标坐标转换为WEBGL坐标系统
  let mx = mouseX - width/2;
  let my = mouseY - height/2;
  
  // 计算相对于卡片区域的坐标
  let relX = mx - (margin_x - width/2);
  let relY = my - (margin_y - height/2);
  
  // 检查是否点击了某张卡片
  for (let i = 0; i < 52; i++) {
    let x = i % 13 * space_x;
    let y = floor(i / 13) * space_y;
    
    if (relX >= x && relX <= x + card_width && 
        relY >= y && relY <= y + card_height) {
      // 如果点击了同一张卡片，开始翻转动画
      if (selectedCard === i) {
        startCardFlip(i);
      } else {
        // 如果点击了不同的卡片，选中新卡片并开始翻转动画
        selectedCard = i;
        startCardFlip(i);
      }
      return;
    }
  }
  
  // 如果点击了空白区域，取消选中
  selectedCard = -1;
}

// draw the cards
function draw() {
  background('darkgreen');
  
  // 在WEBGL模式下调整原点
  translate(-width/2, -height/2, 0);
  translate(margin_x, margin_y, 0);
  
  // 更新翻转动画
  updateCardFlip();
  
  for (i = 0; i < 52; i++) {
    let x = i % 13 * space_x;
    let y = floor(i / 13) * space_y;
    
    // 使用新的3D卡片绘制函数
    drawCard3D(i, x, y);
  }
}

// 原始绘制卡片正面的函数（保留但不再使用）
function drawCardFront(i, x, y) {
  // 绘制卡片底色
  fill('white');
  rect(x, y, card_width, card_height, 2);

  let card_label = i%13 + 1;
  if (card_label == 11) {
    card_label = 'J';
  } else if (card_label == 12) {
    card_label = 'Q';
  } else if (card_label == 13) {
    card_label = 'K';
  }
  
  // 绘制正面花色
  let suit = floor(i / 13);
  let centerX = x + card_width/2;
  let centerY = y + card_height/2;
  let patternSize = 20;
  
  if (suit == 0) {
    drawHeart(centerX, centerY-patternSize/2, patternSize);
  } else if (suit == 1) {
    drawDiamond(centerX, centerY, patternSize);
  } else if (suit == 2) {
    drawSpade(centerX, centerY, patternSize);
  } else if (suit == 3) {
    drawClub(centerX, centerY, patternSize);
  }
  
  // 绘制标签
  fill('black');
  if (suit <= 1) { // 红桃和方块用红色
    fill('red');
  }
  text(card_label, x + 5, y + 15);
  
  // 旋转右下角的标签180度
  push();
  translate(x + card_width - 5, y + card_height - 15);
  rotate(PI);
  text(card_label, 0, 0);
  pop();
}