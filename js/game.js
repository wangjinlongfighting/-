/**
 * Created by Administrator on 2017/2/23/023.
 */
window.onload = function () {
    // var _div = class_base._create('div');  //创建小格子
    // _div.setAttribute('class','box');  // 添加类名  不兼容IE
    // _div.setAttribute('style','width:60px;height:60px;top:0;left:0'); // 添加样式
    // class_base._get('game_panel').appendChild(_div);  //添加到盒子中

    // var _btn = class_base._create('button');
    // _btn.setAttribute('class','gameAdd');
    // _btn.innerHTML = '加速';
    // _btn.setAttribute('onclick','_addClick()');
    // class_base._get('btnGroup').appendChild(_btn);


    class_game._init();
};

function _addClick(_this) {
    if(_this.className == 'gameSlow'){
        if(class_game._speed < 2000)
        {
            class_game._speed +=200;
            console.log(class_game._speed);
        }
    }else
    {
        if(class_game._speed >0){
            class_game._speed -=200;
            console.log(class_game._speed);
        }
    }
    class_base._get('speedDecription').innerHTML = '地鼠出现间隔为'+ class_game._speed/1000+'秒';
}

function _click_box(_this) {
    var _index = _this.id;
    var _class_name = _this.className;
    if(_class_name == 'diglet_up'){
        _this.setAttribute('class','diglet_out');
        class_game._Score +=50;
    }else if(_class_name == 'box'){
        if(class_game._Score >=50){
            class_game._Score -=50;
        }
    }
    console.log(class_game._Score);

    var _score = document.getElementsByClassName('score');
    _score[0].innerHTML = '总共' + class_game._Score + '分';
    // alert(_score.innerHTML);
}

function _gameStart(_this) {
    if(_this.innerHTML=='再加30秒'||_this.innerHTML=='30秒计时开始'){
        class_game._start();
        var _count = 29;
        _this.innerHTML = _count + '秒';
        var _startTime = setInterval(function () {
            _count -= 1;
            _this.innerHTML = _count + '秒';
            if(_this.innerHTML == '0秒' ){
                _this.innerHTML ='再加30秒';
                clearTimeout(_startTime);
                clearTimeout(class_game._gameIng);
                document.getElementsByClassName('start')[0].style.backgroundColor = '#cccccc';
                document.getElementsByClassName('end')[0].style.display = 'block';
            }
        },1000);
    }


}

var class_game = {
    _col : 5, //列数
    _row : 5, //行数
    _boxWidth : 60, //格子宽度
    _boxHeight : 60,  //格子高度
    _speed:1000,
    _Score:0,
    _gameIng:function () {

    },
    _createBtn:function () {
        //创建加减速按钮
        var arr =['减速0.2秒','加速0.2秒','gameSlow','gameAdd'];
        for(var _i=0;_i<2;_i++){
            var _btn = class_base._create('button');
            _btn.setAttribute('class',arr[2+_i]);
            _btn.innerHTML = arr[_i];
            _btn.setAttribute('onclick','_addClick(this)');
            class_base._get('btnGroup').appendChild(_btn);
        }
    },
    _createMange:function () {
        //速度描述
        var _p = class_base._create('p');
        _p.setAttribute('id','speedDecription');
        _p.innerHTML = '地鼠出现间隔为'+ this._speed/1000+'秒';
        class_base._get('game_section').parentNode.appendChild(_p);
        //得分统计
        var _score = class_base._create('p');
        _score.setAttribute('class','score');
        _score.innerHTML = '总共' + this._Score + '分';
        class_base._get('game_section').parentNode.appendChild(_score);
    },
    _createPanel:function () {
        for(var _x = 0 ; _x < this._col;_x++){
            for(var _y = 0 ; _y < this._row;_y++){
                var _div = class_base._create('div');  //创建小格子
                _div.setAttribute('class','box');  // 添加类名  不兼容IE
                _div.setAttribute('id',_y*this._row+ _x);  // 添加id
                //设置每个格子的位置
                _div.setAttribute('style','width:'+ this._boxWidth +'px;height:'+ this._boxHeight +'px;top:'+ (this._boxHeight*_y) +'px;left:'+(this._boxWidth*_x)+'px'); // 添加样式
                //_div.innerHTML = _y*this._col+ _x + '<br>[' + _x + ',' + _y + ']';
                class_base._get('game_panel').appendChild(_div);  //添加到盒子中

                _div.setAttribute('onclick','_click_box(this)');
            }
        }
        var _End = class_base._create('div');
        _End.setAttribute('class','end');
        _End.innerHTML = '结束';
        class_base._get('game_panel').appendChild(_End);


    },
    _createDialet:function () {
        class_game._clearDialet(); //清除地鼠

        //设置随机地鼠   ID = 0 - 24   行数*5 加 列数
        var _num = parseInt(Math.random()*3+1);
        for(var _i=0;_i<_num;_i++){
            var _index = parseInt(Math.random()*this._row)*this._col + parseInt(Math.random()*this._col);
            class_base._get(_index).setAttribute('class','diglet_up');
        }
        this._gameIng = setTimeout(function () {
            class_game._createDialet();
        },this._speed);
    },
    _clearDialet:function () {
        for(var _x = 0 ; _x < this._col;_x++) {
            for (var _y = 0; _y < this._row; _y++) {
                var _index = _y*this._row+ _x;
                class_base._get(_index).setAttribute('class','box');  // 添加类名  不兼容IE
            }
        }
    },
    _init:function () {
        this._createBtn(); //创建加减速按钮
        this._createPanel(); //创建画布
        this._createMange(); //创建得分情况
        this._createStart(); //创建开始按钮
    },
    _start:function () {
        document.getElementsByClassName('end')[0].style.display = 'none';
        this._createDialet(); //随机生成地鼠
    },
    _createStart:function () {
        var _startBtn = class_base._create('div');
        _startBtn.setAttribute('id','startBtn');
        class_base._get('game_section').parentNode.appendChild(_startBtn);
        var _Start = class_base._create('button');
        _Start.setAttribute('class','start');
        _Start.setAttribute('href','javascript:');
        _Start.setAttribute('onclick','_gameStart(this)');
        _Start.innerHTML = '30秒计时开始';
        class_base._get('startBtn').appendChild(_Start);
    }
};


var class_base = {
    _get : function (_id) {
        return document.getElementById(_id);
    },
    _create:function (_element) {
        return document.createElement(_element);
    }
};