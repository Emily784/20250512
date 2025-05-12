let facemesh;
let video;
let predictions = [];

// 第一組點
const points1 = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
// 第二組點
const points2 = [243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112,133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155];
// 第三組點
const points3 = [359,467,260,259,257,258,286,414,463,341,256,252,253,254,339,255,263,466,388,387,386,385,384,398,362,382,381,380,374,373,390,249];

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
  image(video, 0, 0, width, height);

  // 設定線條樣式
  stroke(0, 0, 255); // 藍色
  strokeWeight(3);

  // 畫出第一組點之間的線條
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 繪製第一組點
    for (let i = 0; i < points1.length - 1; i++) {
      const start = keypoints[points1[i]];
      const end = keypoints[points1[i + 1]];
      line(start[0], start[1], end[0], end[1]);
    }

    // 繪製第二組點
    for (let i = 0; i < points2.length - 1; i++) {
      const start = keypoints[points2[i]];
      const end = keypoints[points2[i + 1]];
      line(start[0], start[1], end[0], end[1]);
    }

    // 繪製第三組點
    for (let i = 0; i < points3.length - 1; i++) {
      const start = keypoints[points3[i]];
      const end = keypoints[points3[i + 1]];
      line(start[0], start[1], end[0], end[1]);
    }
  }
}

function modelReady() {
  console.log("Facemesh model loaded!");
}
