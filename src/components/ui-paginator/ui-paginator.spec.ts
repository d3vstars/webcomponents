import { newSpecPage } from '@stencil/core/testing';
import { UiPaginator } from './ui-paginator';

describe('ui-paginator', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [UiPaginator],
      html: `<ui-paginator id="paginator" 
      number-pages="9" 
      current-page="1"
      items-per-page="18"
    ></ui-paginator>`,
    });
    expect(root).toEqualHtml(`
    <ui-paginator current-page="1" id="paginator" is-input-page="" is-select-items-page="" items-per-page="18" number-pages="9">
        <div class="paginator-content">
          <div class="center-container">
            <div class="button-content">
              <div class="go-to-page-content">
                <div>
                  <label>Go to page: </label>
                  <input class="" type="number" placeholder="Pages">
                  <p class="errors"></p>
                </div>
              </div>
              <button class="button-all-left"></button>
              <button class="button-prev"></button>
              <div class="button-number-container">
                <button class="current">1</button>
                <button class="">2</button>
                <button class="">3</button>
                <button class="">4</button>
                <button class="">5</button>
                </div>
              <button class="button-next"></button>
              <button class="button-all-right"></button>
            </div>
            <div class="item-page">
              <div>
                <label>Items per page</label>
                <select>
                  <option value="15">15</option>
                  <option selected="" value="18">18</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </ui-paginator>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [UiPaginator],
      html: `<ui-paginator id="paginator" 
      number-pages="9" 
      current-page="1"
      items-per-page="18"
      is-input-page="false"
      is-select-items-page="false"
    ></ui-paginator>`,
    });
    expect(root).toEqualHtml(`
    <ui-paginator current-page="1" id="paginator" is-input-page="false" is-select-items-page="false" items-per-page="18" number-pages="9">
    <div class="paginator-content">
      <div class="center-container">
        <div class="button-content">
          <div class="go-to-page-content">
          </div>
          <button class="button-all-left"></button>
          <button class="button-prev"></button>
          <div class="button-number-container">
            <button class="current">1</button>
            <button class="">2</button>
            <button class="">3</button>
            <button class="">4</button>
            <button class="">5</button>
            </div>
          <button class="button-next"></button>
          <button class="button-all-right"></button>
        </div>
        <div class="item-page">
        </div>
      </div>
    </div>
  </ui-paginator>
    `);
  });
});
