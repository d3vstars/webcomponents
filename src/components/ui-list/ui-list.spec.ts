import { newSpecPage } from '@stencil/core/testing';
import { UIList } from './ui-list';

describe('ui-list', () => {
  it('builds', async () => {
    expect(new UIList()).toBeTruthy();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [UIList],
      html: `<ui-list></ui-list>`
    });

    expect(page.root).toEqualHtml(`<ui-list><mock:shadow-root>
      <table><thead></thead><tbody></tbody></table>
    </ui-list>`);
  });

  it('renders with data', async () => {
    const page = await newSpecPage({
      components: [UIList],
      html: '<div></div>'
    });

    let cmp = page.doc.createElement('ui-list');
    cmp.dataTable = [{ name: 'John' }];

    cmp.headers = [
      {
        // @ts-ignore
        key: 'name',
        label: 'Name',
        searchable: false,
        render: (nameAttribute: string) => {
          return nameAttribute;
        }
      }
    ];

    page.root.appendChild(cmp);
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
