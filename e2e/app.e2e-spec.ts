import { LibertaliaPage } from './app.po';

describe('libertalia App', () => {
  let page: LibertaliaPage;

  beforeEach(() => {
    page = new LibertaliaPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
