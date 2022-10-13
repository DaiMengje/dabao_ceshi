window.addEventListener('load', function() {
    // 获取图片盒子 也就是ul
    var imgBox = this.document.querySelector('.slide ul');
    // 获取小点的盒子
    var dotBox = imgBox.nextElementSibling;
    // 获取图片的宽度 也就是移动的基准宽度
    var imgWidth = imgBox.children[0].offsetWidth;
    // 定义节流状态
    var flag = true;
    // 获取左右箭头按钮
    var arrowL = document.querySelector('.arrow-l');
    var arrowR = document.querySelector('.arrow-r');
    // 为了方便后期维护，咱们要动态创建小点，根据图片的个数
    for (var i = 0; i < imgBox.children.length; i++) {
        // 每次遍历都生成一个li标签
        var li = document.createElement('li');
        // 在创建li标签的同时给它设置一个自定义索引号
        li.setAttribute('data-index', i);
        // 追加到小点盒子中
        dotBox.appendChild(li);
        // 给每个li绑定点击事件
        li.addEventListener('click', function() {
            if (flag) {
                // 动画做的时候把开关关闭，防止点击多次
                flag = false;
                // 给之前选中的去掉类
                document.querySelector('.current').className = '';
                // 给当前点击的li添加选中的类
                this.className = 'current';
                // 控制图片盒子的移动
                // 1.拿到当前点击小点的索引号
                var index = this.getAttribute('data-index');
                animate(imgBox, -index * imgWidth, function() {
                    // 等动画完成之后再把开关打开
                    flag = true
                })
            }
        })
    }

    // *********************
    // 默认给第一个小点选中
    dotBox.children[0].className = 'current';
    // 把第一个li克隆一份 放在最后

    var cloneLi = imgBox.firstElementChild.cloneNode(true);
    // 把克隆的元素放在图片盒子最后
    // console.log(cloneLi);
    imgBox.appendChild(cloneLi)
        // 右侧箭头点击事件
    arrowR.addEventListener('click', function() {
        // 获取当前点击的小点
        var current = document.querySelector('.current')
        var currentIndex = current.getAttribute('data-index');
        if (currentIndex == dotBox.children.length - 1) {
            if (flag) {
                flag = false
                    // 手动让图片滚到隐藏的复制过来的最后一张
                animate(imgBox, -(currentIndex - 0 + 1) * imgWidth, function() {
                    // 等动画做完了只会 再跳回第一张
                    imgBox.style.left = '0';
                    flag = true;
                    // 再手动触发第一个圆点的点击事件
                    dotBox.children[0].click();
                })
            }
            return
        }
        // 让它的下个兄弟触发点击事件
        current.nextElementSibling.click()
    })
    arrowL.addEventListener('click', function() {
            if (flag) {
                // 获取当前点击的小点
                var current = document.querySelector('.current');
                var currentIndex = current.getAttribute('data-index');
                if (currentIndex == '0') {
                    // 直接跳到最后一张图
                    imgBox.style.left = -(imgBox.children.length - 1) * imgWidth + 'px';
                    // 跳到最后一张之后 再缓动到上一张，也就是最后一个小点的位置
                    dotBox.lastElementChild.click();
                    flag = false;
                    return
                }
                // 让它的上个兄弟触发点击事件
                current.previousElementSibling.click();
                flag = false;
            }
        })
        // 开启自动轮播
    var timer = setInterval(function() {
        arrowR.click()
    }, 2000);
    var slide = document.querySelector('.slide');
    // 当鼠标进入 清掉定时器
    slide.addEventListener('mouseover', function() {
            clearInterval(timer)
        })
        // 当鼠标离开 重新加上定时器 不要加 var
    slide.addEventListener('mouseout', function() {
        timer = setInterval(function() {
            arrowR.click()
        }, 2000);
    })
})