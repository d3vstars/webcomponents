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

    expect(page.root).toEqualHtml(
      `<ui-list><div class="ui-list-table-content"><table class="ui-list-table"><thead></thead><tbody></tbody></table><div class="helper-message">No data available</div></div></ui-list>`
    );
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
        sortable: true
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
        sortable: false
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
        sortable: true
      }
    ];

    page.root.appendChild(cmp);
    await page.waitForChanges();
    const iconSortable = page.root.querySelector('div table thead th i') as Element;

    expect(iconSortable.classList.contains('withoutOrderBy')).toBe(true);
  });

  it('renders with data and with accordion, withoutOrderBy and redirect field', async () => {
    const page = await newSpecPage({
      components: [UIList],
      html: '<div></div>'
    });

    let cmp = page.doc.createElement('ui-list');
    cmp.dataTable = [{ name: 'John', productId: '45652738', infoDetails: { id: '1234567890' } }];
    cmp.headerAccordion = [
      {
        key: 'id',
        label: 'Id',
        searchable: false,
        sortable: true,
        render: (params: string): string => {
          return params;
        }
      }
    ];
    cmp.headers = [
      {
        key: 'name',
        label: 'Name',
        searchable: false,
        render: (nameAttribute: string) => {
          return nameAttribute;
        },
        sortable: false
      },
      {
        key: 'productId',
        label: 'Product Id',
        searchable: false,
        render: (nameAttribute: string) => {
          return nameAttribute;
        },
        sortable: true,
        redirect: true,
        eventName: 'fake-event'
      },
      {
        key: 'accordion',
        label: '',
        searchable: false,
        sortable: false,
        accordion: true,
        render: (params: string): string => {
          return params;
        }
      },
      {
        key: 'actions',
        label: 'Actions',
        searchable: false,
        sortable: false,
        type: 'button',
        actionsButton: [
          {
            text: 'Reject return',
            eventName: 'reject-action'
          },
          {
            text: 'Approve return',
            eventName: 'approved-action'
          }
        ]
      }
    ];

    page.root.appendChild(cmp);

    await page.waitForChanges();

    const iconOrderById = page.doc.querySelector('.withoutOrderBy') as HTMLElement;
    iconOrderById.click();
    //sort asc
    iconOrderById.click();
    //sort desc
    iconOrderById.click();

    const redirectFieldHanlder = page.doc.querySelector('.redirect-field') as HTMLElement;
    redirectFieldHanlder.click();

    const toogleExpandlerHandler = page.doc.querySelector('.plus') as HTMLElement;
    toogleExpandlerHandler.click();

    const buttonHandleEvent = page.doc.querySelector('.ui-list-button-content button') as HTMLElement;
    buttonHandleEvent.click();

    const tdAccordion = page.root.querySelector('div table tbody tr td') as Element;

    expect(tdAccordion.classList.contains('tr-accordion')).toBe(false);
    expect(page.root).toEqualHtml(`<ui-list>
       <div class="ui-list-table-content">
         <table class="ui-list-table">
           <thead>
             <th>
               <p>
                 Name
               </p>
             </th>
             <th>
               <p>
                 Product Id
               </p>
               <i class="withoutOrderBy"></i>
             </th>
             <th>
              <p></p>
             </th>
             <th>
               <p>
                 Actions
               </p>
             </th>
           </thead>
         <tbody>
            <tr>
              <td class="name">
                John
              </td>
              <td class="productId redirect-field">45652738</td>
              <td class="accordion tr-accordion">
                <i class="plus"></i>
              </td>
              <td class="actions">
                <div class="ui-list-button-content">
                  <button>
                    Reject return
                  </button>
                </div>
                <div class="ui-list-button-content">
                  <button>
                    Approve return
                  </button>
                </div>
              </td>
            </tr>
            <tr class="tr-accordion-details">
              <td colspan="4">
                <div>
                  <table class="ui-list-table">
                    <thead>
                    <tr>
                       <th>
                         <p>
                           Id
                         </p>
                       </th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td>
                         1234567890
                       </td>
                     </tr>
                  </tbody>
                </table>
                </div>
              </td>
            </tr>
          </tbody>
         </table>
       </div>
     </ui-list>`);
  });
});
