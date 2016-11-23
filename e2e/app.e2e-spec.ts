import { TheCosmicWhalePage } from './app.po';

describe('the-cosmic-whale App', function() {
  let page: TheCosmicWhalePage;

  beforeEach(() => {
    page = new TheCosmicWhalePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
