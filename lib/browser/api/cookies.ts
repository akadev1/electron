import { Cookie, Cookies } from 'electron';

class SecureCookies extends Cookies {
  async set(details: Electron.Cookie): Promise<void> {
    if (details.secureUpdate) {
      details.secure = true;
    }
    return super.set(details);
  }

  async get(filter: Electron.CookiesGetFilter): Promise<Electron.Cookie[]> {
    const cookies = await super.get(filter);
    if (filter.secureUpdate) {
      return cookies.filter(cookie => cookie.secure);
    }
    return cookies;
  }
}

export { SecureCookies };
