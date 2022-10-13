// function animate (ele, target) {
//   // 开启定时器 让盒子不断的移动
//   // 获取盒子最新的坐标
//   var move = (target - ele.offsetLeft) / 31;
//   var total = Math.abs(target - ele.offsetLeft);
//   var current = 0;
//   ele.timer = setInterval(function () {
//     // 如果盒子的现在的坐标 超过了目标位置，那么就停止定时器，并且退出函数
//     if (current + Math.abs(move) > total) {
//       ele.style.left = target + 'px';
//       clearInterval(ele.timer);
//       return
//     }
//     if (current >= total) {
//       clearInterval(ele.timer);
//       return
//     }
//     // 每次移动10px
//     ele.style.left = ele.offsetLeft + move + 'px';
//     current += Math.abs(move)
//   }, 15)
// }

// function animate (ele, target) {
//   // 开启定时器 让盒子不断的移动
//   // 获取盒子最新的坐标
//   var move = (target - ele.offsetLeft);
//   var timer = setInterval(function () {
//     // 如果盒子的现在的坐标 超过了目标位置，那么就停止定时器，并且退出函数
//     if (move < 0) {
//       if (ele.offsetLeft <= target) {
//         clearInterval(timer);
//         return
//       }
//     } else {
//       if (ele.offsetLeft >= target) {
//         clearInterval(timer);
//         return
//       }
//     }
//     // 每次移动10px
//     ele.style.left = ele.offsetLeft + (move / 30) + 'px';

//   }, 15)
// }

function animate(ele, target, callback) {
    // 开启定时器 让盒子不断的移动
    // 获取盒子最新的坐标
    clearInterval(ele.timer)
    ele.timer = setInterval(function() {
        var move = (target - ele.offsetLeft) / 10;
        move = move > 0 ? Math.ceil(move) : Math.floor(move)
            // 如果盒子的现在的坐标 超过了目标位置，那么就停止定时器，并且退出函数
        if (ele.offsetLeft == target) {
            clearInterval(ele.timer);
            callback && callback()
        }
        // 每次移动10px
        ele.style.left = ele.offsetLeft + move + 'px';

    }, 20)
}