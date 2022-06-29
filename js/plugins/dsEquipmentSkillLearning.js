/*:
 * @plugindesc 装備に設定されたスキルを習得するプラグイン ver1.12.2
 * @author 道楽
 *
 * @param Lp
 * @desc 装備からスキルを習得する蓄積値の略称(Learning Point)
 * @default LP
 *
 * @param Basic Reward Lp
 * @type number
 * @desc タグ未設定時の敵キャラから獲得できる基本LP
 * @default 1
 *
 * @param Reward Lp Text
 * @desc 戦闘後にLPを獲得した時に表示されるテキスト
 * @default %1 の%2を獲得！
 *
 * @param Show Reward Lp Text
 * @type boolean
 * @desc 戦闘後にLPを獲得したテキストを表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Learning Skill Text
 * @desc 戦闘で得たLPによってスキルを習得した時に表示されるテキスト
 * @default %1は%2を覚えた！
 *
 * @param Usable Equipment Skill
 * @type boolean
 * @desc 装備品が持つ未修得のスキルを使用できるか
 * (true なら使用できる / false なら使用できない)
 * @default true
 *
 * @param Show Lp Gauge
 * @type boolean
 * @desc LPをゲージで表示するか？
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Lp Value
 * @type boolean
 * @desc LPを数値で表示するか？
 * (true なら表示する / false なら表示しない)
 * @default false
 *
 * @param Show Control Guide
 * @type boolean
 * @desc 表示切替ガイドを表示するか？
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Guide Text
 * @type string
 * @desc 表示切替ガイドのテキスト
 * @default Shift:切り替え
 *
 * @param Lp Value Font Size
 * @type number
 * @desc LP表示で使用するフォントのサイズ
 * @default 18
 *
 * @param Lp Aftermath Enable
 * @type boolean
 * @desc YEP_VictoryAftermathにLP獲得ウィンドウを追加するか？
 * (true なら追加する / false なら追加しない)
 * @default true
 *
 * @param Lp Aftermath Caption
 * @desc LP獲得ウィンドウに表示される題字テキスト
 * @default LP獲得
 *
 * @param Lp Aftermath Format
 * @desc 獲得したLP値を表示する書式テキスト
 * %1 - Value     %2 - Amount
 * @default +%1\c[4]%2\c[0]
 *
 * @param Lp Aftermath Earned
 * @desc LP獲得ウィンドウの題字
 * @default 獲得LP
 *
 * @param Lp Multiple Gain Enable
 * @type boolean
 * @desc 獲得したLP値を同一スキルが設定された装備の数分加算するか？
 * (true なら加算する / false なら加算しない)
 * @default false
 *
 * @help
 * このプラグインは以下のメモタグの設定ができます。
 *
 * -----------------------------------------------------------------------------
 * スキルに設定するメモタグ
 *
 * <lp:[必要LP]>
 *  スキルを習得するために必要なLPを設定します。
 *  [必要LP] - スキルの習得に必要なLP(数字)
 *
 * <lpActor[アクター番号]:[必要LP]>
 *  特定のアクターがスキルを習得するために必要なLPを設定します。
 *  <lp>と同時に設定されている場合は指定のアクターのみこちらが優先されます。
 *  [アクター番号] - 0001～9999までの4桁の数値が設定できます。(数字)
 *                   データベースのアクタータブで表示されている番号になります。
 *  [必要LP]       - スキルの習得に必要なLP(数字)
 *
 * -----------------------------------------------------------------------------
 * 武器・防具に設定するメモタグ
 *
 * <learningSkill[習得番号]:[スキルID]>
 *  装備から習得できるスキルを設定します。
 *  [習得番号] - 00～04までの2桁の数値が設定できます。(数字)
 *               なお、ひとつの装備に同じ習得番号を複数設定出来ません。
 *  [スキルID] - スキルのID(数字)
 *
 * -----------------------------------------------------------------------------
 * 敵キャラに設定するメモタグ
 *
 * <rewardLp:[獲得LP]>
 *  敵キャラ撃破時に獲得できるLPの値を設定します。
 *  [獲得LP] - 撃破時に獲得できるLP(数字)
 *
 * -----------------------------------------------------------------------------
 * ステートに設定するメモタグ
 * 
 * <lpRate:[獲得LP倍率]>
 *  ステートを持つアクターが獲得できるLPの倍率を設定します。
 *  [獲得LP倍率] - 獲得できるLPの倍率(数字-小数可)
 *                 複数のステートで設定されている場合は乗算して反映されます。
 *
 * ----------------------------------------------------------------------------
 * プラグインコマンド
 *
 * LPを獲得するコマンド
 *   GainLp iteType param opeType value show
 *
 *     iteType
 *       0   paramをアクター番号として使用する
 *       1～ paramをアクター番号が格納された変数の番号として使用する
 *     param
 *       0   iteTypeが0の場合、パーティメンバー全体を対象とする
 *       1～ iteTypeに基づきアクター番号となる
 *     opeType
 *       0   operandを変更する値として使用する
 *       1～ operandを変更する値が格納された変数の番号として使用する
 *     operand
 *       opeTypeに基づき変更する値となる(負数にすると減る)
 *     show
 *       true  スキル習得メッセージを表示する
 *       false スキル習得メッセージを表示しない
 *
 * e.g.)
 *  パーティ全員が10LPを獲得する
 *   GainLp 0 0 0 10 true
 */