import { expect } from 'chai';
import { session } from 'electron';

describe('Cookies API', () => {
  let cookies;

  before(() => {
    cookies = session.defaultSession.cookies;
  });

  describe('cookies.set with secureUpdate', () => {
    it('should set a cookie with secureUpdate', async () => {
      const cookie = {
        url: 'https://www.github.com',
        name: 'secure_cookie',
        value: 'dummy',
        secureUpdate: true
      };

      await cookies.set(cookie);
      const result = await cookies.get({ url: 'https://www.github.com', name: 'secure_cookie' });
      expect(result).to.have.lengthOf(1);
      expect(result[0].name).to.equal('secure_cookie');
      expect(result[0].value).to.equal('dummy');
      expect(result[0].secure).to.be.true;
    });
  });

  describe('cookies.get with secureUpdate filter', () => {
    it('should get cookies with secureUpdate filter', async () => {
      const cookie = {
        url: 'https://www.github.com',
        name: 'secure_cookie',
        value: 'dummy',
        secureUpdate: true
      };

      await cookies.set(cookie);
      const result = await cookies.get({ secureUpdate: true });
      expect(result).to.have.lengthOf.at.least(1);
      expect(result.some(c => c.name === 'secure_cookie' && c.value === 'dummy' && c.secure)).to.be.true;
    });
  });
});
