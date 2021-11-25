/**
 * msloader.js
 */
var MSLoader = function(_option){
    // msloader初期化
    this.init(_option);
}

/**
 * 初期オプション
 */
const _initOption__msbox = {
    position: 'fixed', // position
    target: document.querySelector('html body'),
    timeout:null, // ローディングTIMEOUT時間(ms)
    isDetached:false,　// ローディング終了時に要素を取り除くか
    type: 'type-1', // ローディングタイプ
    zIndex: null, //z-index
    bgColor: '#000000', // 背景色
    bgOpacity: 0.5, // 背景透過度
    content: null, // ローディング内容
    onStart : function(){
        // console.log('ローディング開始直前');
    },
    onStarted : function(){
        // console.log('ローディング開始直後');
    },
    onStop : function(){
        // console.log('ローディング停止直前');
    },
    onStoped : function(){
        // console.log('ローディング停止直後');
    },
};

/**
 * MSLoader初期化
 * @returns MSLoader
 */
MSLoader.prototype.init = function(_option) {
    // オプション設定をマージ
    let initOption = Object.assign({}, _initOption__msbox);
    this.option = Object.assign(initOption, _option);
    // オプションでtargetが設定されていて、positionが設定されていない
    if (_option.target && !_option.position) {
        // targetがオプションで設定されていた場合
        this.option.position = 'absolute';
    }
    this.target = _createTarget__msloader(this.option);
    this.msloader = null;
    return this;
}

/**
 * MSLoader表示開始
 * @returns MSLoader
 */
MSLoader.prototype.start = function() {
    const self = this;
    // 既にローディング要素があるかどうか
    if(this.msloader == null || self.option.isDetached){
        // msloader大元要素
        let loader = document.createElement('div');
        this.msloader = loader;
        this.msloader.classList.add("msloader");
        this.msloader.style.position = this.option.position;
        if(this.option.zIndex != null){
            this.msloader.style.zIndex = this.option.zIndex;
        }
        // オーバーレイ
        let loaderOverlay = document.createElement('div');
        loaderOverlay.classList.add("msloader-overlay");
        if(this.option.bgColor != null){
            loaderOverlay.style.backgroundColor = this.option.bgColor;
        }
        if(this.option.bgOpacity != null){
            loaderOverlay.style.opacity = this.option.bgOpacity;
        }
        this.msloader.appendChild(loaderOverlay);
        // ローディング本体
        let loaderComponent = document.createElement('div');
        loaderComponent.classList.add("msloader-component");
        if(this.option.content == null){
            // type設定
            loaderComponent.classList.add(this.option.type);
        }else{
            loaderComponent.innerHTML = this.option.content;
            let content = loaderComponent.firstChild;
            content.style.display = 'block';
        }
        this.msloader.appendChild(loaderComponent);

        this.target.appendChild(loader);
    }else{

    }
    this.option.onStart();
    this.msloader.classList.remove("stop");
    this.msloader.classList.add("start");
    // timeout時間が設定されていた場合、timeout設定
    if(self.option.timeout != null){
        setTimeout(function () {
            self.stop();
        }, self.option.timeout);
    }
    this.option.onStarted();
    return this;
}

/**
 * MSLoader停止
 * @returns MSLoader
 */
MSLoader.prototype.stop = function() {
    this.option.onStop();
    if(this.option.isDetached){
        this.detach();
    }else{
        this.msloader.classList.remove("start");
        this.msloader.classList.add("stop");
    }
    this.option.onStoped();
    return this;
}

/**
 * MSLoaderDOM要素を削除
 * @returns MSLoader
 */
MSLoader.prototype.detach = function() {
    // オプション設定をマージ
    if(this.msloader !== null){
        this.msloader.parentNode.removeChild(this.msloader);
        this.msloader = null;
    }
    return this;
}

/**
 *  MSLoaderoption設定
 * @returns  MSLoader
 */
 MSLoader.prototype.setOption = function(_option) {
    // オプション設定をマージ
    this.option = Object.assign(this.option, _option);
    return this;
}

/**
 * target設定関数
 * HTML要素, jQuery要素、id文字列を許容
 * @returns target要素
 */
 const _createTarget__msloader = function(option){
    try {
        let target;
        // jQuery使用可能の場合かつtargetがjQuery要素の場合
        if(typeof jQuery !== 'undefined' && option.target instanceof jQuery && typeof option.target.get(0) !== "undefined"){
            target = option.target.get(0);
            return target;
        }
        // targetがdom要素の場合
        if(option.target instanceof HTMLElement){
            target = option.target;
            return target;
        }
        // targetが文字列の場合
        if(typeof (option.target) == "string" || option.target instanceof String){
            // id
            if(/^\#.+/.test(option.target)){
                let id = option.target.slice(1);
                target = document.getElementById(id);
                if(target instanceof HTMLElement){
                    return target;
                }
                throw new Error('idが"'+id+'"であるDOM要素が見つかりません。');
            }
            throw new Error('targetとして文字列を設定する場合、"#"から始まるidを指定してください。');
        }
        throw new Error('targetが存在していません。');
    } catch (e) {
        _showError__msloader(e.message)
    }
}

/**
 * メインコンテンツドラッグ移動処理設定
 * @returns メインコンテンツ要素
 */
 const _showError__msloader = function(msg){
    console.error('msloader : ' + msg);
}