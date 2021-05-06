import { newE2EPage } from '@stencil/core/testing';

describe('ui-paginator', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ui-paginator current-page="1" is-input-page="" is-select-items-page="" items-per-page="18" number-pages="9"></ui-paginator>');
    const element = await page.find('ui-paginator');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<ui-paginator id="paginator" current-page="1" is-input-page="" is-select-items-page="" items-per-page="18" number-pages="9"></ui-paginator>');
    const component = await page.find('#paginator');
    let element = await page.find('#paginator >>> button.current');
    expect(element.textContent).toEqual(`1`);

    component.setAttribute('current-page', 2);
    await page.waitForChanges();
    element = await page.find('#paginator >>> button.current');
    expect(element.textContent).toEqual(`2`);
  });
});
