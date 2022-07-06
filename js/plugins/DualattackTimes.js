//=============================================================================
// DualattackTimes.js
//=============================================================================

/*:ja
 * @plugindesc ver1.00 装備している武器数が１を超えた分だけ
 * 攻撃追加回数に加算します。
 * @author まっつＵＰ
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * パラメータとプラグインコマンドともにありません。
 * 
 * アクターの通常攻撃において
 * 攻撃追加回数または連続回数の増加によりターゲットが複数になるとき
 * 武器１のアニメーション→武器２のアニメーション→武器３・・・と
 * 表示するアニメーションを切り替えるよう仕様変更しています。
 * （ターゲットの数よりも装備している武器が少ないときは
 * 　武器１のアニメーションから切り替えなおします。）
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
//var parameters = PluginManager.parameters('DualattackTimes');

//オーバーライド
Game_Actor.prototype.attackTimesAdd = function() {
    var sum = this.traitsSumAll(Game_BattlerBase.TRAIT_ATTACK_TIMES);
    var sum2 = Math.max(this.weapons().length - 1, 0);
    return Math.max(sum + sum2, 0);
};

Game_Actor.prototype.DTattackAnimationId = function(times) {
    if(this.hasNoWeapons()) return this.bareHandsAnimationId();
    var weapons = this.weapons();
    var len = weapons.length;
    var num = times % len;
    return weapons[num] ? weapons[num].animationId : 0;
};

Window_BattleLog.prototype.showActorAttackAnimation = function(subject, targets) {
    this.DTshowAnimation(targets, subject, false);
};

Window_BattleLog.prototype.DTshowAnimation = function(targets, subject, mirror) {
    var id = 0;
    var delay = 1;
    var nextDelay = this.animationNextDelay();
    for(var i = 0; i < targets.length; i++){
        id = subject.DTattackAnimationId(i);
        if(!id) continue;
        targets[i].startAnimation(id, mirror, delay);
        delay += nextDelay;
    }
};
 
})();
