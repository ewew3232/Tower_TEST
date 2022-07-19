//=============================================================================
// Repeat_Skill.js
//=============================================================================

/*:
 * @plugindesc 連続回数の多いスキルを作成できます。
 * @author 村人C
 *
 * @help
 * このプラグインにはプラグインコマンドはありません。
 *
 * 使い方
 * スキルの「メモ」欄に、<repeat_skill:2> と書いた場合、
 * ２回追加でスキルが発動します。
 *
 *
 * readmeやスタッフロールの明記、使用報告は任意
 * 
 */

(function() {
  // スキルの連続回数
  Game_Action.prototype.numRepeats = function() {
    var repeats = this.item().repeats;
	var re_skill = this.item().meta.repeat_skill ? Number(this.item().meta.repeat_skill) : 0; // 追加
	repeats += re_skill; // 追加
    if (this.isAttack()) {
        repeats += this.subject().attackTimesAdd();
    }
    return Math.floor(repeats);
  };
})();