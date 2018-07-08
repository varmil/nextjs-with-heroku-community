import find from 'lodash/find'
import startsWith from 'lodash/startsWith'

export const FROM_SERVER_KEY = 'fromServer'

// すでにサーバに保存されている画像とクライアント側でアタッチする画像は
// 型が違うのでPOST時は別扱いする必要がある
export const append = (formData, files) => {
  if (!Array.isArray(files)) return console.info('files is not array')

  files.forEach(file => {
    if (file[FROM_SERVER_KEY]) {
      // すでにサーバに保存されている
      formData.append('fromServerFiles[]', file.preview)
    } else {
      // クライアント側で添付
      formData.append('image', file)
    }
  })
}
