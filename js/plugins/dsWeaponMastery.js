/*:
 * @plugindesc 武器熟練度システム ver1.12.0
 * @author 道楽
 *
 * @requiredAssets img/system/WMAptitude
 *
 * @param Weapon Masteries Max
 * @desc 武器熟練度の影響を受ける武器タイプの最大数
 * @default 12
 * @type number
 *
 * @param Weapon Mastery Table
 * @desc 武器熟練度に使用する武器タイプのテーブル
 * 熟練度の種類分必要
 * @default ["1","2","3","4","5","6","7","8","9","10","11","12"]
 * @type number[]
 *
 * @param Weapon Mastery Icon
 * @desc 表示する武器タイプのアイコン
 * 熟練度の種類分必要
 * @default ["96","97","98","99","100","101","102","103","104","105","106","107"]
 * @type number[]
 *
 * @param Mastery Level Max
 * @desc 武器熟練度レベルの最大値
 * D=1, C=2, B=3, A=4, S=5の順番で設定
 * @default ["100","100","100","100","100"]
 * @type number[]
 *
 * @param Mastery Exp Max
 * @desc 武器熟練度レベルアップに必要な経験値
 * この経験値は武器を使用して攻撃するごとに加算されます
 * @default 1000
 * @type number
 *
 * @param Battle Gain Exp Limit
 * @desc 一度の戦闘で獲得できる武器熟練度経験値の上限を設定します
 * 0の場合は上限なく獲得できます
 * @default 0
 * @type number
 *
 * @param Add Mastery Exp
 * @desc 攻撃ごとに加算される武器熟練度経験値
 * D=1, C=2, B=3, A=4, S=5の順番で設定
 * @default ["5","10","15","20","25"]
 * @type number[]
 *
 * @param Add Damage Rate
 * @desc 熟練度上昇毎に加算されるダメージ率
 * @default 5
 * @type number
 *
 * @param Reduce Mp Cost
 * @desc 熟練度上昇毎に軽減されるMPコスト
 * @default 2
 * @type number
 *
 * @param Reduce Mp Cost Interval
 * @desc MPコストが軽減される熟練度の間隔
 * @default 1
 * @type number
 *
 * @param Reduce Tp Cost
 * @desc 熟練度上昇毎に軽減されるTPコスト
 * @default 2
 * @type number
 *
 * @param Reduce Tp Cost Interval
 * @desc TPコストが軽減される熟練度の間隔
 * @default 1
 * @type number
 *
 * @param Learning Skill Text
 * @desc スキル習得時に表示されるテキスト
 * %1 - アクター %2 - 武器タイプ %3 武器熟練度レベル
 * @default %1は%2の武器熟練度が %3 に上がった！
 * @type text
 *
 * @help
 * このプラグインは以下のメモタグの設定が必要です。
 *
 * ----------------------------------------------------------------------------
 * アクターに設定するメモタグ
 *
 * <wmAptitude:C,S,B,A,D,C,C,B,A,A,D,C>
 *  各武器に対する適正を設定します。
 *  設定できる値は適正が低い順に「D」「C」「B」「A」「S」となっています。
 *  また、このタグの引数は「,」区切りで、
 *  「Weapon Mastery Max」の数だけ必要になります。
 *
 * ----------------------------------------------------------------------------
 * 職業に設定するメモタグ
 *
 * <wmAptitude:C,S,B,A,D,C,C,B,A,A,D,C>
 *  アクターと同様のタグが設定できます。
 *  両方に設定されている場合は職業に設定されている適性が優先されます。
 *
 * ----------------------------------------------------------------------------
 * スキルに設定するメモタグ
 *
 * <wmType:[武器タイプ]>
 *  スキルに対応する武器タイプの種類を設定します。
 *  [武器タイプ] - 武器タイプのID(数字)
 *                 -1の場合は現在装備している武器の種類に依存するようになります。
 *                 この状態では<requiredWM>が無効になりますので、
 *                 習得レベルの設定は<requiredWMEx>を使用してください。
 *
 * <requiredWM:[必要レベル]>
 *  スキルを習得するために必要な武器熟練度レベルを設定します。
 *  [必要レベル] - 習得に必要な武器熟練度レベル(数字)
 *
 * <requiredWMEx[条件番号]:[武器タイプ],[必要レベル]>
 *  必要な武器熟練度レベルを設定するタグの拡張版です。
 *  複数の武器タイプに必要レベルを設定する時はこちらのタグを使用します。
 *  なお、<requiredWM>と同時に設定した場合は<requiredWM>が優先されます。
 *  [条件番号]   - 00～09までの2桁の数値が設定できます。
 *                 なお、ひとつのスキルに同じ条件番号を複数設定出来ません。
 *  [武器タイプ] - 武器タイプのID(数字)
 *  [必要レベル] - 習得に必要な武器熟練度レベル(数字)
 *
 * <minMpCost:[コスト]>
 *  スキルを使用するために必要なMPの最小値を設定します。
 *  武器熟練度上昇による軽減でこの値より小さくならなくなります。
 *  [コスト] - MPコストの最小値
 *
 * <minTpCost:[コスト]>
 *  スキルを使用するために必要なTPの最小値を設定します。
 *  武器熟練度上昇による軽減でこの値より小さくならなくなります。
 *  [コスト] - TPコストの最小値
 *
 * ----------------------------------------------------------------------------
 * プラグインコマンド
 *
 * アクターの武器適正を変更するコマンド
 *   ChangeWMAptitude actorId wtypeId value
 *
 * アクターの武器適正を加減算するコマンド
 *   AddWMAptitude actorId wtypeId value
 *
 * アクターの武器熟練度レベルを変更するコマンド
 *   ChangeWMLevel actorId wtypeId value show
 *
 * アクターの武器熟練度レベルを加減算するコマンド
 *   AddWMLevel actorId wtypeId value show
 *
 * パーティ全員の武器熟練度レベルを加減算するコマンド
 *   AddWMLevelAll wtypeId value show
 *
 * アクターの武器熟練度経験値を加減算するコマンド
 *   AddWMExp actorId wtypeId value show
 *
 * パーティ全員の武器熟練度経験値を加減算するコマンド
 *   AddWMExpAll wtypeId value show
 *
 * 上記コマンドのパラメータは共通になります
 *     actorId
 *       コマンドの対象を指定するアクターＩＤ
 *       メッセージと同じ記法で変数も使用できます (\v[変数番号])
 *     wtypeId
 *       0   全ての武器を対象とする
 *       1～ 指定した武器タイプを対象とする
 *     value
 *       変更、加減算する値
 *     show
 *       true  熟練度レベルがあがったメッセージを表示する
 *       false 熟練度レベルがあがったメッセージを表示しない
 * ----
 *
 * 武器熟練度レベルを取得し、変数に格納するコマンド
 *   GetWMLevel variableId actorId wtypeId
 *     variableId - 格納する変数の番号
 *     actorId    - 取得するアクターの番号
 *     wtypeId    - 取得する武器タイプ
 *
 * ----------------------------------------------------------------------------
 * ダメージ計算式への組み込み
 *
 * スキル等のダメージ計算式では以下のコマンドが使用できます。
 *
 * a.wml(item)
 *   a(攻撃側)が使用したスキルに対応した武器熟練度を取得する
 *
 * b.wml(item)
 *   b(防御側)が使用されたスキルに対応した武器熟練度を取得する
 */