import Theme from './Theme'
import Apollo from './Apollo'
import { translate } from 'react-i18next'

export default (CMP, theme, i18n) => {
  console.log(CMP, theme, i18n)
  translate.setI18n(i18n)
  return translate()(Theme(Apollo(CMP)), theme)
}
 