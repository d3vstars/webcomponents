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
    ></ui-paginator>`
    });
    expect(root).toEqualHtml(`
    <ui-paginator current-page="1" id="paginator" is-input-page="" is-select-items-page="" items-per-page="18" number-pages="9">
        <div class="paginator-content">
          <div class="center-container">
            <div class="button-content">
              <div class="go-to-page-content">
                <div>
                  <label class="paginator-label">Go to page: </label>
                  <input class="paginator-input" type="number" placeholder="Pages">
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
                <label class="select-label">Items per page</label>
                <select class="select-input">
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
    ></ui-paginator>`
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

  it('renders with another page (change to previous page)', async () => {
    const { root, doc, waitForChanges } = await newSpecPage({
      components: [UiPaginator],
      html: `<ui-paginator id="paginator"
      number-pages="9"
      current-page="3"
      items-per-page="18"
      is-input-page="false"
      is-select-items-page="false"
    ></ui-paginator>`
    });

    const previousPageButton = doc.querySelector('.button-all-left') as HTMLElement;
    previousPageButton.click();

    await waitForChanges();

    expect(root).toEqualHtml(`
    <ui-paginator current-page="3" id="paginator" is-input-page="false" is-select-items-page="false" items-per-page="18" number-pages="9">
    <div class="paginator-content">
      <div class="center-container">
        <div class="button-content">
          <div class="go-to-page-content">
          </div>
          <button class="button-all-left"></button>
          <button class="button-prev"></button>
          <div class="button-number-container">
            <button class="">1</button>
            <button class="">2</button>
            <button class="current">3</button>
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

  it('renders with another page (change to next page)', async () => {
    const { root, doc, waitForChanges } = await newSpecPage({
      components: [UiPaginator],
      html: `<ui-paginator id="paginator"
      number-pages="9"
      current-page="2"
      items-per-page="18"
      is-input-page="true"
      is-select-items-page="true"
    ></ui-paginator>`,
      supportsShadowDom: true
    });

    await waitForChanges();

    const nextPageButton = doc.querySelector('.button-all-right') as HTMLElement;
    nextPageButton.click();

    const paginatorInput = doc.querySelector('.paginator-input') as HTMLInputElement;
    paginatorInput.value = '23332';
    paginatorInput.dispatchEvent(new Event('input'));

    const selectInput = doc.querySelector('.select-input') as HTMLSelectElement;
    selectInput.value = '10';
    selectInput.dispatchEvent(new Event('change'));

    expect(root).toEqualHtml(`
    <ui-paginator current-page="2" id="paginator" is-input-page="" is-select-items-page="" items-per-page="18" number-pages="9">
    <div class="paginator-content">
      <div class="center-container">
        <div class="button-content">
          <div class="go-to-page-content">
            <div>
              <label class="paginator-label">
                Go to page:
              </label>
              <input class="paginator-input" placeholder="Pages" type="number" value="23332">
              <p class="errors"></p>
            </div>
          </div>
          <button class="button-all-left"></button>
          <button class="button-prev"></button>
          <div class="button-number-container">
            <button class="">1</button>
            <button class="current">2</button>
            <button class="">3</button>
            <button class="">4</button>
            <button class="">5</button>
            </div>
          <button class="button-next"></button>
          <button class="button-all-right"></button>
        </div>
         <div class="item-page">
           <div>
             <label class="select-label">
               Items per page
             </label>
             <select class="select-input">
               <option value="15">
                 15
               </option>
               <option selected="" value="18">
                 18
               </option>
               <option value="30">
                 30
               </option>
               <option value="50">
                 50
               </option>
               <option value="100">
                 100
               </option>
             </select>
           </div>
         </div>
      </div>
    </div>
  </ui-paginator>
    `);
  });
});
