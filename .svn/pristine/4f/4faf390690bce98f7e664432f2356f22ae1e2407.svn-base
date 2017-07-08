/**
 * @file 文件说明
 * @author XieZhendong
 * @des 简易饼状图
 * @date 15/10/15
 */
//简易饼状图
(function(){
    function Spc(canvas){
        this.options = {
            R: 90,//半径
            innerR: 80,//内半径
            currentNumber: 0,
            totalNumber: 100,
            color: '#ff744d',
            fontSize: 18,
            unit: '分钟'
        };
        this.canvas = document.getElementById(canvas);
    }

    Spc.fn = Spc.prototype;

    Spc.fn.init = function(canvas){
        this.canvas = document.getElementById(canvas);
        return this;
    }
    //绘制扇形
    Spc.fn.drawCircle = function(move){
        var ctx = this.ctx,
            arc = this.arc;
        ctx.beginPath();
        ctx.lineWidth =  arc.lineWidth;

        ctx.strokeStyle = arc.color;
        if(move){
            var start = arc.startAngle,
                end = start + 0.2;
            var timer = setInterval(function(){
                if(end <= arc.endAngle){
                    ctx.arc(arc.x, arc.y,arc.radius, start,end,false);
                    ctx.stroke();
                    start = end;
                    end += 0.2;
                }else if(start<= arc.endAngle){
                    ctx.arc(arc.x, arc.y,arc.radius, start,arc.endAngle,false);
                    ctx.stroke();
                }
                else{
                    clearInterval(timer);
                }
            },10);
        }
        else{
            ctx.arc(arc.x, arc.y,arc.radius, arc.startAngle,arc.endAngle,false);
            ctx.stroke();
        }

    }

    Spc.fn.init = function(opt){
        this.extend(this.options,opt);
        // canvas自身的width扩大四倍，其css样式width保持不变.实际显示的宽度也会保持不变，减少图像，文字的锯齿感和模糊度
        var R = this.options.R * 4,
            innerR = this.options.innerR * 4,//内半径
            Rx = R - innerR,//环的半径
            canvasWidth = R * 2,
            canvas = this.canvas;
        canvas.setAttribute('width',canvasWidth + 'px');
        canvas.setAttribute('height',canvasWidth + 'px');
        canvas.style.width = canvasWidth / 4 + 'px';
        canvas.style.height = canvasWidth / 4 + 'px';

        var ctx = null;
        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
        }

        this.ctx = ctx;
        //绘制扇形图属性
        this.arc = {
            x: 0, //圆心x坐标
            y: 0, //圆心y坐标
            radius: innerR, //半径
            startAngle: 0,//起始角度
            endAngle: Math.PI*2,//结束角度，
            color: '#f7f7f7',//环的颜色,
            lineWidth: Rx//环的半径
        };

        ctx.translate(canvasWidth/2,canvasWidth/2);
        ctx.globalAlpha=0.2

        this.drawCircle();
    }

    Spc.fn.setOption = function(opt){
        this.extend(this.options,opt);

        var ctx = this.ctx;

        //绘制文本
        ctx.font = 12 * 4  + "px Calibri";
        ctx.textAlign = "center";
        ctx.fillStyle = '#fff';
        ctx.lineCap = 'round'
        ctx.globalAlpha=1
        ctx.fillText(this.options.tipText, 0, 80);
        ctx.font =  ctx.font = 16 * 4  + "px Calibri";
        ctx.fillStyle = this.options.color;
        //ctx.fillText(this.options.currentNumber + this.options.unit, 0, 65);
        this.arc.color = this.options.color;
        if(this.options.totalNumber==0){
            var unit = this.options.unit||''
            if(unit.indexOf('优惠') !== -1){
                ctx.fillText(unit, 0, -20);
            }
            else{
                ctx.fillText('0' + unit, 0, -20);
            }
            return;
        }else{
            ctx.fillText('已用   '+ (this.options.totalNumber - this.options.currentNumber) + '   '+this.options.unit, 0, -20);
        }
        var percentage = Math.round(this.options.currentNumber/this.options.totalNumber*1000) / 1000;
        this.arc.startAngle = Math.PI*3/2;
        this.arc.endAngle = this.arc.startAngle + Math.PI*2*percentage;
        this.arc.innerR -= 6;
        this.arc.lineWidth += 12;
        this.drawCircle();
        return this;
    }

    //对象深拷贝
    Spc.fn.extend = function(copyTo,copyFrom){
        for(var key in copyFrom){
            if(copyFrom[key]||copyFrom[key]===0)
                copyTo[key] = copyFrom[key];
        }
    }

    window.SimplePieChart = Spc;
})(window);
