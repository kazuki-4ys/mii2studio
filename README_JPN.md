# mii2studio

mii2studio は、Wii, 3DS, WiiU, Miitomo, Switchで作られたMiiを[ニンテンドーアカウント](https://accounts.nintendo.com/mii_studio)で使われている形式へ変換するためのPythonで書かれたコマンドラインツールです。ニンテンドーアカウントはMiitomoの後継として作られたオンライン上でMiiを編集する機能を有します。

さらにこのツールは、任天堂のAPIエンドポイントを利用し、PNG形式でレンダリングされたMiiへのリンクも出力します。Miiはエンコードされています。(恐らく難読化のため)そして、[ここ](https://pf2m.com/tools/mii/)でAPIの追加パラメータを指定してレンダリングすることができます。(表情, 体全体の表示, レンダリングする際の体の角度など)Riiconnect24ではこれを[Riiconnect24のMiiコンテストチャンネルのwebサイト](https://miicontest.wii.rc24.xyz/)で使用しています。

そして、このツールはMiiの誕生日、身長、体重、名前、性別、好きな色、ズボンの色(Switchとニンテンドーアカウントでは使用されていません。)などの便利な情報を表示することができます。

レンダリングされたMiiの例:

![Matt](https://studio.mii.nintendo.com/miis/image.png?data=000f145b5f5e646e49546169687477858e878a87878e969d9c9fa6b3b9c0e5acafb6bbb6bcb6b9b8bebfc3cfd1d9da&type=face&width=512&instanceCount=1)

## 使い方

[ここからアプリをダウンロードできます](https://github.com/RiiConnect24/mii2studio/releases/)。これはPythonスクリプトを埋め込んだ各種プラットフォーム向けの実行可能バイナリです。必要に応じてソースコードも利用できます。

コマンド: `mii2studio <input mii file / qr code / cmoc entry number> <output studio mii file> <input type (wii/3ds/wiiu/miitomo/switch/switchgame/studio)>`

このスクリプトはパラメータが無くても使えます。

## 使用例

* WiiのバイナリMiiデータを使用する場合: `python mii2studio.py /path/to/BobRoss.mii /path/to/BobRoss.studio wii`
* 3DSのQRコードを使用する場合: `python mii2studio.py "https://www.miicharacters.com/miis/qr_large/20150_bobross.jpg" /path/to/Bob.studio 3ds`
* Miiコンテストチャンネルのエントリーナンバーを使用する場合: `python mii2studio.py 3136-3713-5980 /path/to/BobRoss.studio wii`

スクリプトは、ニンテンドーアカウントで使用するためのファイル、Miiの顔と体をPNGでレンダリングした画像のURL、Miiについての便利な情報を出力します。

## インプットに使用できるデータ

以下の全てのMiiデータをこのスクリプトで使用できます:

* 様々なプラットフォームで使用されているMiiバイナリデータ
    * Wii
    * 3DS
    * Wii U
    * Switch
        * NAND内のMii DBで使用されているフォーマット
        * セーブデータで使用されているフォーマット
    * ニンテンドーアカウント (デコードされているもの)
* 様々なプラットフォームで使用されているMiiのQRコード
    * 3DS
    * Wii U
    * Miitomo
    * トモダチコレクション 新生活
    * Miitopia
* RiiConnect24のMiiコンテストチャンネルでアップロードされたMiiの12桁のエントリーナンバー

## MiiのGenerationの種類

* Generation 1: Wii, DS
* Generation 2: 3DS, Wii U, [Miitomo](https://kaeru.world/projects/kaerutomo)
* Generation 3: Switch, ニンテンドーアカウント

## ニンテンドーアカウントへのMiiのインポート/エクスポート

以下の手順を踏むことで、ニンテンドーアカウントへのMiiのインポート/エクスポートが可能になります。

1. 名前を Mii Studio Import/Export tool、リンクを `javascript:(function () {var s = document.createElement('script');s.setAttribute('src', 'https://cdn.discordapp.com/attachments/671391178280665118/789310254025801748/miistudio.js');document.body.appendChild(s);}());` に設定してブックマークを作成します。
1. [ニンテンドーアカウント](https://accounts.nintendo.com/mii_studio)のwebサイトへ移動します。

### インポート

1. ニンテンドーアカウントで新しくMiiを作ります。
1. Miiを保存します。
1. Mii選択画面から、さっき作ったMiiを手直しします。
1. インポートしたいMiiが .studioファイル(46バイト)になっていない場合はmii2studioで変換します。
1. Mii Studio Import/Export tool をブックマークから選択します。 
1. ポップアップのOKを押します。
1. .studioファイルを選択します。
1. ページが再読み込みされます。(ブラウザに再読み込みするか聞かれましたら、"再読み込み"を選択します。)
1. "つづきから"を選択するとMiiが反映されます。
1. Miiを保存します。

### エクスポート

1. 新しいMiiを作成するのではなく、すでにあるMiiを手直しします。
1. Mii Studio Import/Export tool をブックマークから選択します。
1. ポップアップのキャンセルを押します。
1. エクスポートされたMiiがダウンロードされます。

## Kaitaiファイル

[Kaitai](https://kaitai.io/)はファイル構造を記述したり、解析したりするのにとても便利なツールです。私たちはこれをmii2studioや、Miiのファイル構造を記述するのに使用しています。.ksyファイルはKaitai言語で、.pyはPythonスクリプトの実行時に使用されます。([Kaitai's IDE](https://ide.kaitai.io/)でコンパイルしています).

## クレジット

* bendevnull氏によるサポート。
* HEYimHeroic氏による彼の助けなしではこのツールは実現不可能とも言えるほどのたくさんのサポート。
* jaames氏による[MiiのQRコード複合化スクリプト](https://gist.github.com/jaames/96ce8daa11b61b758b6b0227b55f9f78)。
* Larsenv氏によるこのスクリプトの作成。
* Matthe815氏によるニンテンドーアカウントで使用されている難読化されたレンダリングシステムの解析。
