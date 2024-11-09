import { createI18n } from 'vue-i18n'
import zhHans from './zh-Hans'
import en from './langEn'
import zhHant from './zh-Hant'
import {
	getLocalData
} from '@/utils/storage'
const messages = {
	en,
	'zh-Hans': zhHans,
	'zh-Hant': zhHant
}
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLocalData('lang') == '' ? 'en' : getLocalData('lang'),
  messages: messages
})
export default i18n