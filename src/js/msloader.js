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
    target: document.querySelector('html body'),
};

/**
 * MSLoader初期化
 * @returns MSLoader
 */
 MSLoader.prototype.init = function(_option) {
    // オプション設定をマージ
    let initOption = Object.assign({}, _initOption__msbox);
    this.option = Object.assign(initOption, _option);
    this.msloader = null;
    return this;
}

/**
 * MSLoader表示開始
 * @returns MSLoader
 */
 MSLoader.prototype.start = function(_option) {
    let loader = document.createElement('div');
    this.msloader = loader;
    this.msloader.classList.add("msloader");
    let target = this.option.target;
    target.appendChild(loader);
    return this;
}

/**
 * MSLoader停止
 * @returns MSLoader
 */
MSLoader.prototype.stop = function(_option) {
    // オプション設定をマージ
    let initOption = Object.assign({}, _initOption__msbox);
    this.option = Object.assign(initOption, _option);
    return this;
}