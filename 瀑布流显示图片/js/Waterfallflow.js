window.onload = function () {
    imgLocation("container","box");
    //让下一张照片，在已经显示的照片的高度最小的照片下面显示
    var imgData = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};
    window.onscroll = function () {
        if (checkFlag()) {
            //如果返回ture
            var cparent =getID("container");
            for (var i=0;i<imgData.data.length;i++){
                var ccontent = document.createElement("div");
                //创建一个div节点
                ccontent.className = "box";
                //设置class="box"
                cparent.appendChild(ccontent);
                //在父节点cparent下创建子节点ccontent
                var boximg = document.createElement("div")
                boximg.className = "box_img"
                ccontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src = "images/"+imgData.data[i].src;
                //设置img节点的src属性
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }

    }
    // console.log("ok")
}

function getID(id) {
    var cparent = document.getElementById((id));
    //返回对ID=id的对象的引用
    return cparent;
}

function checkFlag() {
    var cparent = getID("container");
    var ccontent = getChildElement(cparent,"box");
    //获取cparent对象下所有id="box"的节点
    var lastContentHeight = ccontent[ccontent.length-1].offsetTop;
    //最后一张照片距顶部的距离
    // console.log(lastContentHeight);
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    //当前滚过的距顶部的距离，最上面
    // console.log(scrollTop);
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    //能看到的页面的高度
    // console.log(pageHeight);
    if(lastContentHeight<scrollTop+pageHeight){
        //如果最后一张的最上面到顶部的距离小于滚动过的加上显示的高度
        //也可以用离底部最近的一张
        return true;
    }
}

function imgLocation(parent,content) {
    //将arent下所有的内容,全部content取出
    var cparent = getID(parent);
    var ccontent = getChildElement(cparent,content);
    //获得节点container下面的所有内容
    // console.log(cparent)
    // console.log(ccontent);
    var imgWidth = ccontent[0].offsetWidth;
    //因为默认宽度都一样，所以直接取第一张照片的宽度
    var cols = Math.floor(document.documentElement.clientWidth/imgWidth);
    //当前窗口一排能显示的照片数量
    // console.log(cols);
    cparent.style.cssText = "width:"+imgWidth*cols+"px;margin:0px auto";
    //动态的设置id=parent的节点（即"container"）的宽度为一张图片*能显示的数量，居中显示
    var BoxHeightArr = [];
    for(var i = 0;i<ccontent.length;i++){
        if(i<cols){
            BoxHeightArr[i] = ccontent[i].offsetHeight;
            //如果i小于cols(一排照片数)，将照片的长度存入数组BoxHeightArr
        }else {
            var minheight = Math.min.apply(null,BoxHeightArr);
            //计算长度最小的照片的长度
            var minIndex = getminheightLocation(BoxHeightArr,minheight);
            //获取最小长度照片的位置
            ccontent[i].style.position = "absolute";
            //绝对定位
            ccontent[i].style.top = minheight+"px";
            //添加照片的顶部高度
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
            //设置照片距左宽度与最小长度照片一致
            BoxHeightArr[minIndex] +=ccontent[i].offsetHeight;
            //将当前最短位置长度设置为最短长度加上添加的照片的长度
        }
    }
}
function getminheightLocation(BoxHeightArr,minHeight) {
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i] == minHeight){
            //获取最小长度照片在一排中的位置
            return i ;
        }
    }
}
function getChildElement(parent,content) {
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*")
    //表示获取parent节点下的所有标签
    // console.log(allcontent)
    for(var i = 0;i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i])
            // 将节点名为content的节点存入数组
        }
    }
    return contentArr;
    //返回数组
}