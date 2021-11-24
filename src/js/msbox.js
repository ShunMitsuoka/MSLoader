/**
 * msbox.js
 */
var MSBox = function(_option){
    // msbox初期化
    this.init(_option);
}

/**
 * 初期オプション
 */
const _initOption__msbox = {
    position: 'fixed',
    target: document.querySelector('html body'),
    animation: true,  // アニメーションの有無
    animationTime: 200, // ms
    headerTitle: 'Hello MSBox', // ヘッダータイトル
    contentHtml: 'Hello World', // メインコンテンツ内容
    width: '50%', // width
    height: '50%', // height
    zIndex: null, // z-index
    headerShow: true, // ヘッダー表示有無
    onOpen : function(){
        // console.log('モーダル開く直前');
    },
    onOpened : function(){
        // console.log('モーダル開いた直後');
    },
    onClose : function(){
        // console.log('モーダル閉じる直前');
    },
    onClosed : function(){
        // console.log('モーダル閉じた直後');
    },
    draggable: false, // ドラッグで移動可能
};

/**
 * モーダルinit
 * @returns MSBox
 */
 MSBox.prototype.init = function(_option) {
    // オプション設定をマージ
    let initOption = Object.assign({}, _initOption__msbox);
    this.option = Object.assign(initOption, _option);
    this.target = _createTarget__msbox(this.option);
    this.msbox = null;
    this.mainContent = null;
    return this;
}

/**
 * モーダルopen
 * @returns MSBox
 */
MSBox.prototype.open = function() {
    const self = this;
    // 既にモーダル要素があるかどうか
    if(this.msbox == null){
        // 最もベースとなるモーダル要素
        let msbox = document.createElement("div");
        this.msbox = msbox;
        this.msbox.classList.add("msbox");
        this.msbox.style.position = this.option.position;
        if(this.option.zIndex != null){
            this.msbox.style.zIndex = this.option.zIndex;
        }
        // オーバーレイ要素生成
        let overLay = _createOverLay__msbox(this);
        this.msbox.appendChild(overLay);
        // メインコンテント要素作成
        this.mainContent = _createMainContent__msbox(this);
        this.msbox.appendChild(this.mainContent);
        // ターゲットにモーダル追加
        this.target.appendChild(this.msbox);
    }else{
        // 既にモーダルが存在する場合、クラス名closeをリムーブ
        this.msbox.classList.remove("close");
        this.mainContent.style.top = null;
        this.mainContent.style.left = null;
    }
    self.option.onOpen();
    // アニメーションの有無
    if(this.option.animation){
        setTimeout(function(){
            self.msbox.classList.add("open");
            self.option.onOpened();
        },0);
    }else{
        self.msbox.classList.add("open");
        self.option.onOpened();
    }
    return this;
}
/**
 * モーダルclose
 * @returns MSBox
 */
MSBox.prototype.close = function() {
    const self = this;
    // アニメーションの有無
    self.option.onClose();
    if(self.option.animation){
        setTimeout(function(){
            self.msbox.classList.remove("open");
            setTimeout(function(){
                self.msbox.classList.add("close");
                self.option.onClosed();
            },self.option.animationTime);
        },0);
    }else{
        self.msbox.classList.remove("open");
        self.msbox.classList.add("close");
        self.option.onClosed();
    }
    return this;
}
/**
 * モーダルoption設定
 * @returns MSBox
 */
 MSBox.prototype.setOption = function(_option) {
    // オプション設定をマージ
    this.option = Object.assign(this.option, _option);
    return this;
}

/**
 * モーダルDOM要素を削除
 * @returns MSBox
 */
 MSBox.prototype.detach = function() {
    // オプション設定をマージ
    if(this.msbox !== null){
        this.msbox.parentNode.removeChild(this.msbox);
    }
    return this;
}

/**
 * モーダルDOM要素を削除し、初期設定に戻す
 * @returns MSBox
 */
 MSBox.prototype.destroy = function() {
    this.detach();
    this.init();
    return this;
}

/**
 * target設定関数
 * HTML要素, jQuery要素、id文字列を許容
 * @returns overLay要素
 */
const _createTarget__msbox = function(option){
    try {
        let target;
        // jQuery使用可能の場合かつtargetがjQuery要素の場合
        if(typeof jQuery !== 'undefined' && option.target instanceof jQuery){
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
        _showError__msbox(e.message)
    }
}

/**
 * オーバーレイ要素作成関数
 * @returns overLay要素
 */
const _createOverLay__msbox = function(self){
    // 対象要素を覆うオーバーレイを定義
    let overLay = document.createElement("div");
    overLay.classList.add("msbox-overlay");
    // オーバーレイクリック時にモーダルを閉じる
    overLay.addEventListener("click", function() {
        self.close();
    });
    return overLay;
}

/**
 * メインコンテンツ要素作成関数
 * @returns メインコンテンツ要素
 */
const _createMainContent__msbox = function(self){
    // 対象要素を覆うオーバーレイを定義
    let mainContent = document.createElement("div");
    mainContent.classList.add("msbox-main-content");
    // メインコンテンツスタイル設定
    _setMainContenStyle__msbox(self, mainContent);
    // メインコンテンツヘッダー要素作成
    if(self.option.headerShow){
        let mainContentHeader = document.createElement("div");
        mainContentHeader.classList.add("msbox-main-content-hader");
        mainContent.appendChild(mainContentHeader);
        // ヘッダータイトル
        let headerTitle = document.createElement("div");
        headerTitle.classList.add("msbox-content-header-title");
        headerTitle.textContent = self.option.headerTitle;
        mainContentHeader.appendChild(headerTitle);
        // 閉じるボタン作成
        let closeBtn = document.createElement("span");
        closeBtn.classList.add("msbox-main-content-close");
        closeBtn.textContent = '×';
        mainContentHeader.appendChild(closeBtn);
        closeBtn.addEventListener("click", function() {
            self.close();
        });
    }
    // メインコンテンツbody要素
    let mainContentBody = document.createElement("div");
    mainContentBody.classList.add("msbox-main-content-body");
    mainContent.appendChild(mainContentBody);
    // メインコンテンツbodyに内容適応
    mainContentBody.innerHTML = self.option.contentHtml;
    // ドラッグ設定
    if(self.option.draggable){
        _setDraggable__msbox(self, mainContent);
    }
    return mainContent;
}

/**
 * メインコンテンツスタイル設定
 * @returns メインコンテンツ要素
 */
const _setMainContenStyle__msbox = function(self, mainContent){
    mainContent.style.transition = self.option.animationTime + 'ms';
    mainContent.style.width = self.option.width;
    mainContent.style.height = self.option.height;
    return mainContent;
}

/**
 * メインコンテンツドラッグ移動処理設定
 * @returns メインコンテンツ要素
 */
const _setDraggable__msbox = function(self, mainContent){
    let dragTarget = mainContent;
    // ヘッダー表示時は、ヘッダーのみドラッグ可能とする。
    if(self.option.headerShow){
        dragTarget = mainContent.getElementsByClassName('msbox-main-content-hader')[0];
    }
    // \drag用のスタイル設定
    dragTarget.style.cursor = 'move';
    // デバイス確認
    let device = navigator.userAgent.match(/iphone|ipad|ipod|android/i) ? "sp" : "pc";
    // デバイス別のイベント名を格納
    let touchstart = device == "sp" ? "touchstart" : "mousedown";
    let touchend = device == "sp" ? "touchend" : "mouseup";
    let touchmove = device == "sp" ? "touchmove" : "mousemove";

    let dragData = {
        "start": false, "move": false, // flag
        "initialX": null, "initialY": null, // タップ位置
        "top": null, "left": null // 要素の初期位置
    };

    dragTarget.addEventListener(touchstart, touchStart, false);

    function touchStart(event) {
        mainContent.style.transition = null;
        event.preventDefault();
        // 位置取得 デバイスに応じて取得対象を変える
        let x = device == "sp" ? event.touches[0].clientX : event.clientX;
        let y = device == "sp" ? event.touches[0].clientY : event.clientY;
        // データ登録
        dragData = {
            "start": true, "move": false, // flag
            "initialX": x, "initialY": y, // タップ位置
            "top": mainContent.offsetTop, "left": mainContent.offsetLeft // 要素の初期位置
        }
        // eventリスナー登録
        document.addEventListener(touchend, touchEnd, false);
        document.addEventListener(touchmove, touchMove, false);
    }

    function touchMove(event) {
        if(dragData.start){
            event.preventDefault();
            // 位置取得 デバイスに応じて取得対象を変える
            let x = device == "sp" ? event.touches[0].clientX : event.clientX;
            let y = device == "sp" ? event.touches[0].clientY : event.clientY;
            let moveX = x - dragData.initialX; // ドラッグ距離 X
            let moveY = y - dragData.initialY; // ドラッグ距離 Y
            if (moveX !== 0 || moveY !== 0) {  // ドラッグ距離が0以外だったら
                mainContent.style.top = dragData.top + moveY + "px";
                mainContent.style.left = dragData.left + moveX + "px";
            }
        }
    }

    function touchEnd(event) {
        if(dragData.start){
            dragData.start = false;
            mainContent.style.transition = self.option.animationTime + 'ms';
            document.removeEventListener(touchend, touchEnd);
            document.removeEventListener(touchmove, touchMove);
        }
    }
}

/**
 * メインコンテンツドラッグ移動処理設定
 * @returns メインコンテンツ要素
 */
const _showError__msbox = function(msg){
    console.error('s-msbox : ' + msg);
}