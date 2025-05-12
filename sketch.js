let facemesh;
let video;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 初始化 facemesh 模型
  facemesh = ml5.facemesh(video, modelReady);

  // 當模型偵測到臉部時，更新 predictions
  facemesh.on("predict", (results) => {
    predictions = results;
  });
}

function draw() {
  // 水平翻轉畫布
  translate(width, 0); // 將畫布的原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 繪製攝影機影像，調整位置以適應翻轉
  image(video, -width, 0, width, height);

  // 設定線條樣式
  stroke(0, 0, 255); // 藍色
  strokeWeight(3);

  // 畫出指定點之間的線條
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    for (let i = 0; i < points.length - 1; i++) {
      const start = keypoints[points[i]];
      const end = keypoints[points[i + 1]];
      line(start[0], start[1], end[0], end[1]);
    }
  }
}

function modelReady() {
  console.log("Facemesh model loaded!");
}
