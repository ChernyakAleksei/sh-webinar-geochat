import { Ng2GeochatPage } from './app.po';

describe('ng2-geochat App', () => {
  let page: Ng2GeochatPage;

  beforeEach(() => {
    page = new Ng2GeochatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
