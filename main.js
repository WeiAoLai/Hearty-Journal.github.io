// 取得畫布元素
const canvas = document.querySelector('canvas');
// 取得畫布 2D 渲染環境
const ctx = canvas.getContext('2d');
// 設定畫布的寬和高，並等於視窗的寬和高
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 創建loader元素
const loader = document.createElement("div");
loader.classList.add("loader");

// 創建打字動畫元素
const typewriter = document.createElement("div");
// CSS中的loader的動畫
typewriter.classList.add("typewriter");
// 要顯示的字
typewriter.textContent = "Loading...";

// 將打字動畫元素加入到loader元素中
loader.appendChild(typewriter);

// 將loader元素加入到頁面中
document.body.appendChild(loader);

// 生成隨機數字的函數
function random(min, max) {
// 返回生成的隨機整數
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//生成隨機 RGB 顏色值的函數
//這段程式碼定義了一個名為 randomRGB 的函式，該函式會生成一個帶有隨機 RGB 值的字符串並返回。
//在函式內部，使用了另一個名為 random 的函式，該函式會生成一個指定區間內的隨機整數。
//然後將這些隨機整數用 rgb 函式包裹，返回一個帶有隨機 RGB 值的字符串。
//淺色雪球
function randomRGB() {
    // 返回一個帶有隨機 RGB 值的字符串
    // 淺色小球球
    return `rgb(${random(200, 255)},${random(255, 255)},${random(200, 255)})`;
    // 白色小球球
    // return `rgb(${random(255, 255)},${random(255, 255)},${random(255, 255)})`;
}
// 球該有的設定--------------------------------------------------------------
class Ball {
    // 初始：
    constructor(x, y, velX, velY, color, size) {
        this.x = x;  // 球的 x 軸座標
        this.y = y;  // 球的 y 軸座標
        this.velX = velX;  // 球在 x 軸上的速度
        this.velY = velY;  // 球在 y 軸上的速度
        this.color = color;  // 球的顏色
        this.size = size;  // 球的大小
    }

    draw() {  // 繪製球的函式
        ctx.beginPath();  // 開始繪製路徑
        ctx.fillStyle = this.color;  // 設定填充樣式為球的顏色
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);  // 畫出圓弧
        ctx.fill();  // 填充圓弧
    }

    update() {  // 更新球的函式
        if ((this.x + this.size) >= width) {  // 如果球撞到右邊牆
            this.velX = -(Math.abs(this.velX));  // 將速度反向
        }

        if ((this.x - this.size) <= 0) {  // 如果球撞到左邊牆
            this.velX = Math.abs(this.velX);  // 將速度反向
        }

        if ((this.y + this.size) >= height) {  // 如果球撞到底部牆
            this.velY = -(Math.abs(this.velY));  // 將速度反向
        }

        if ((this.y - this.size) <= 0) {  // 如果球撞到頂部牆
            this.velY = Math.abs(this.velY);  // 將速度反向
        }
        // 如果都沒有撞到牆，繼續自己的路
        this.x += this.velX;  // 更新球的 x 軸座標
        this.y += this.velY;  // 更新球的 y 軸座標
    }

    collisionDetect() {  // 檢測球是否碰撞到其他球
        for (const ball of balls) {  // 對每個球進行迭代
            if (!(this === ball)) {  // 如果這個球不是目標球
                const dx = this.x - ball.x;  // 計算目標球和當前球的 x 座標差
                const dy = this.y - ball.y;  // 計算目標球和當前球的 y 座標差
                const distance = Math.sqrt(dx * dx + dy * dy);  // 計算兩個球之間的距離
                // 淺色小球球如果碰撞可以換顏色，白色球球沒差
                if (distance < this.size + ball.size) {  // 如果兩個球碰撞
                    ball.color = this.color = randomRGB();  // 將兩個球的顏色設為一個隨機的
                }
            }
        }
    }
}
// --------------------------------------------------------------------------
// 宣告球球陣列，保持球球數量
const balls = [];
while (balls.length < 50) {
    const size = random(7, 10); // 生成圓的半徑
    const ball = new Ball(
        // 新增一個圓球，使用 random 函數為每個屬性生成隨機值
        random(0 + size, width - size), // 圓的 x 坐標
        random(0 + size, height - size), // 圓的 y 坐標
        random(-1, 1), // 圓的水平速度
        random(-2, 2), // 圓的垂直速度
        randomRGB(), // 圓的填充顏色
        size // 圓的半徑
    );
    balls.push(ball); // 將圓球添加到陣列中
}
// 迴圈
function loop() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(254, 229, 216, 1)'; // 用不透明矩形清除畫布
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) { // 迭代所有的圓球，進行繪製、更新和碰撞檢測
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
    //clearRect(0, 0, width, height);
    //重繪畫布
    requestAnimationFrame(loop); // 重繪畫布
}
//也可以setInterval(loop, 16); //重複呼叫function，每隔16秒執行一次
loop(); // 開始執行動畫循環
