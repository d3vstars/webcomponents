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

    expect(page.root).toEqualHtml(`<ui-list><div class="ui-list-table-content"><table class="ui-list-table"><thead></thead><tbody></tbody></table><div class="helper-message">No data available</div></div></ui-list>`);
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
        },
        sortable: true,
      }
    ];

    page.root.appendChild(cmp);
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  it('renders with data and without sorteable', async () => {
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
        },
        sortable: false,
      }
    ];

    page.root.appendChild(cmp);
    await page.waitForChanges();
    
    expect(page.root).toEqualHtml(`<ui-list>
       <div class="ui-list-table-content">
         <table class="ui-list-table">
           <thead>
             <th>
               <p>
                 Name
               </p>
             </th>
           </thead>
           <tbody>
             <tr>
               <td class="name">
                 John
               </td>
             </tr>
           </tbody>
         </table>
       </div>
     </ui-list>`);
  });

  it('renders with data and with sorteable and withoutOrderBy', async () => {
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
        },
        sortable: true,
      }
    ];

    page.root.appendChild(cmp);
    await page.waitForChanges();
    const iconSortable  = page.root.querySelector("div table thead th i") as Element;
    
    expect(iconSortable.classList.contains('withoutOrderBy')).toBe(true);
  });

  it('renders with data and with accordion and withoutOrderBy', async () => {
    const page = await newSpecPage({
      components: [UIList],
      html: '<div></div>'
    });

    let cmp = page.doc.createElement('ui-list');
    cmp.dataTable = [{ name: 'John', "infoDetails": {"id": "1234567890"} }];

    cmp.headers = [
      {
        // @ts-ignore
        key: 'name',
        label: 'Name',
        searchable: false,
        render: (nameAttribute: string) => {
          return nameAttribute;
        },
        sortable: false,
        accordion: true,
      }
    ];

    page.root.appendChild(cmp);
    await page.waitForChanges();

    const tdAccordion  = page.root.querySelector("div table tbody tr td") as Element;
    
    expect(tdAccordion.classList.contains('tr-accordion')).toBe(true);
  });
});
