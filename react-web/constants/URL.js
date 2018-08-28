import { getWebServerDomain } from 'utils/API'
import BrandType from '/../shared/constants/BrandType'

const URL = {
  ADMIN_BASE_SLUG: '/admin',
  ADMIN_SITE_EDIT: '/admin/site/edit',
  SIGNUP_EMAIL: '/view/signup/email',
  VIEW_HOME: '/view/home',
  BOX_BASE_SLUG: 'home',

  TALK_SLUG: 'talk',
  VOICE_SLUG: 'voice',
  NEWS_SLUG: 'news',
  EVENT_SLUG: 'event'
}
export default URL

// ファン招待、管理者招待する際に生成するURL
export const getInvivationURL = (code, brandType) => {
  if (!code) {
    console.warn('invitation code is nil')
    return
  }

  switch (brandType) {
    case BrandType.BASE_FOOD:
      return `https://shop.basefood.co.jp/account/login?site=commune&commune_key=${code}`
    default:
      return `${getWebServerDomain()}${URL.SIGNUP_EMAIL}/${code}`
  }
}
