import find from 'lodash/find'
import startsWith from 'lodash/startsWith'

// draft-js
export const getTextRGB = contentState => {
  // parse contentState
  const json = JSON.parse(contentState)
  if (!json || !json.blocks[0].inlineStyleRanges[0]) return

  // find text color style
  const colorStyle = find(json.blocks[0].inlineStyleRanges, e =>
    startsWith(e.style, 'color-rgb')
  )
  if (!colorStyle) return

  // format for CSS color prop
  const rgb = colorStyle.style.replace('color-', '')
  return rgb
}

// draft-js
export const getText = contentState => {
  // parse contentState
  const json = JSON.parse(contentState)
  if (!json || !json.blocks[0]) return

  return json.blocks[0].text
}
