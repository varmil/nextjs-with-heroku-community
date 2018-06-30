import immutable from 'object-path-immutable'
import shuffle from 'lodash/shuffle'
import take from 'lodash/take'
import random from 'lodash/random'
import range from 'lodash/range'

const dummyPostBody = `ここも今現にいわゆる料理らとして事の時でさませだ。

同時に事実が遠慮通りはまあその講演ですたくっかもをありていただきないをは享有あっますだて、そうには云うたででしない。

他に云えだろ方はもし途中が勢いましでした。ぷんぷん槙さんが不足状態多少満足を知らた兄この手数私か経験をというご反対ないますうたと、その前はどこか人格国家が作り上げるて、向さんののに師範の私にかつてご約束としから私教師でご関係に用いようにもっともおお話しに行なわましたが、ああちょうど妨害に教えないからいるたのが云っでない。

それでもただご生徒を正さものは少し鄭重と限らたて、その社会では考えたてという必竟が合っているでた。こうした時師範の以上この個性もそれごろが考えですかと嘉納さんに思い切ったです、道の今ませとかいうご濫用うないないて、考のためから道具を場合までの心を十月云いているが、そうの以後を向いがどんな時に単にきまっますあると知らないのですて、深いませらしいとそうご自分組み立てたいのませでませ。

また自分か愉快か専攻に知れでしば、十月上証拠へあるておきたためのご記憶の前を引張りないある。今日をは人知れずしてさですですうたて、いくらまあ進んて批評ははっきり憂たら方なけれ。しかしご話にやっではおきたのなけれて、騒ぎがは、もう私かして定めるられないう通り越しれですうと得ので、人真似は云っているべきです。できるだけできるだけはもう中学というおきませが、私からも場合末などそれの同発会はないしかねなな。私はとにかく反対のつもりにご学習はあっがみですでなですて、二万の道徳に少し読んうって紹介たば、もしくはどういう程度の念で流れるせるば、いつかでこれの一部分を詐欺をして下さいます旨んなけれと附与纏って観念下げ行くますます。`

const dummyCommentBody = `カジュアルにサラッと着れるジャケットならT100シリーズと
S300ラインをおすすめします。お手入れもかなり楽で春夏とおして使えます。`

export const Posts = range(5).map(i => ({
  // postページへのlinkに使う
  boxType: 0,
  postId: 123,
  categoryIndex: 0,

  // Contentそのもの
  posterName: 'たかだっち',
  posterIcon: 'https://www.w3schools.com/w3images/avatar2.png',
  postDate: '2018/06/29',
  title: 'オススメのセミフォーマルジャケットを教えて！',
  body: dummyPostBody,
  like: 123,
  comment: 45,
  images: take(
    [
      '/static/stub/post/jacket.png',
      '/static/stub/post/preview.jpg',
      '/static/stub/post/streetman.png',
      '/static/stub/post/man3.jpg',
      '/static/stub/post/clean.jpg'
    ],
    i
  )
}))

export const Comments = range(3).map(i => ({
  postId: 123,
  commenterName: 'たかだっち',
  commenterIcon: 'https://www.w3schools.com/w3images/avatar3.png',
  body: dummyCommentBody
}))
