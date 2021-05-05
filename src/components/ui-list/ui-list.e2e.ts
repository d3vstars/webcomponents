import { newE2EPage } from '@stencil/core/testing';

describe('ui-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ui-list></ui-list>');
    const element = await page.find('ui-list');
    expect(element).toHaveClass('hydrated');
  });
});
