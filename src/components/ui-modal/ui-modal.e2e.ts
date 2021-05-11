import { newE2EPage } from '@stencil/core/testing';

describe('ui-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ui-modal></ui-modal>');
    const element = await page.find('ui-modal');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<ui-modal is-active="false"></ui-modal>');
    const component = await page.find('ui-modal');
    let element = await page.find('ui-modal >>> .modal-content');
    let visible = await element.isVisible();
    expect(element.classList.contains("active")).toEqual(false);
    expect(visible).toBe(false);

    component.setAttribute('is-active', true);
    await page.waitForChanges();
    element = await page.find('ui-modal >>> .modal-content');
    visible = await element.isVisible();
    expect(element.classList.contains("active")).toEqual(true);
    expect(visible).toBe(true);
  });
});
