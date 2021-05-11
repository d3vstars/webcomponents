import { newSpecPage } from '@stencil/core/testing';
import { UiModal } from './ui-modal';

describe('ui-modal', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [UiModal],
      html: `<ui-modal></ui-modal>`,
    });
    expect(root).toEqualHtml(`
    <ui-modal>
      <mock:shadow-root>
        <div class="modal-content">
          <div class="modal-back"></div>
          <div class="modal">
            <a class="close"></a>
          </div>
        </div>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [UiModal],
      html: `<ui-modal is-active="true"></ui-modal>`,
    });
    expect(root).toEqualHtml(`
    <ui-modal is-active="">
      <mock:shadow-root>
        <div class="active modal-content">
          <div class="modal-back"></div>
          <div class="modal">
            <a class="close"></a>
          </div>
        </div>
    `);
  });
});
