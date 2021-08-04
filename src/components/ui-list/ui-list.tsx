import { Component, Prop, Element, Event, EventEmitter, State, h, Fragment } from '@stencil/core';
interface ActionsButton {
  text: string;
  eventName: string;
  style?: any;
}

interface RenderFunction {
  (params: any): string;
}

const TypeOrderBy: string[] = ['asc', 'desc'];

interface OrderBy {
  columnKey: string | null;
  type: string | null;
}

export interface HeadersElement {
  key: string;
  label: string;
  searchable: boolean;
  type?: string;
  render?: RenderFunction;
  actionsButton?: ActionsButton[];
  sortable: boolean;
  redirect?: boolean;
  accordion?: boolean;
  eventName?: string;
}
@Component({
  tag: 'ui-list',
  shadow: false,
  styleUrl: 'ui-list.css'
})
export class UIList {
  @Prop() dataTable: any[] = [
    {
      "": "",
      "itemId": "7a43929c-b32a-44dc-a4b6-5798a236740f",
      "falabellaId": "",
      "sellerSKU": "7183779",
      "falabellaSKU": "7183779",
      "product": "",
      "shipmentType": "",
      "price": 479990,
      "shipping": "",
      "status": "CREATED",
      "infoDetails": {
        "date": "1234567890",
        "transactionType": "234567890",
        "transactionValue": "34567890",
        "transactionNumber": "4567890",
        "transactionAccountStatement": "567890"
      }
    },
    {
      "": "",
      "itemId": "08d4b2fc-a1b8-4134-ae28-ee3b2aecd68d",
      "falabellaId": "",
      "sellerSKU": "7183779",
      "falabellaSKU": "7183779",
      "product": "",
      "shipmentType": "",
      "price": 479990,
      "shipping": "",
      "status": "CREATED",
      "infoDetails": {
        "date": "123434343",
        "transactionType": "123123213",
        "transactionValue": "232323",
        "transactionNumber": "88272772",
        "transactionAccountStatement": "878267772"
      }
    },
    {
      "": "",
      "itemId": "6bec4df8-1484-4e67-8e60-e1c04ebb9c72",
      "falabellaId": "",
      "sellerSKU": "7183779",
      "falabellaSKU": "7183779",
      "product": "",
      "shipmentType": "",
      "price": 149990,
      "shipping": "",
      "status": "CREATED",
      "infoDetails": {
        "date": "123434343",
        "transactionType": "123123213",
        "transactionValue": "232323",
        "transactionNumber": "88272772",
        "transactionAccountStatement": "878267772"
      }
    },
    {
      "": "",
      "itemId": "a273f261-9bcc-45f7-99c9-c55114d9ddc4",
      "falabellaId": "",
      "sellerSKU": "7183779",
      "falabellaSKU": "7183779",
      "product": "",
      "shipmentType": "",
      "price": 149990,
      "shipping": "",
      "status": "CREATED",
      "infoDetails": {
        "date": "123434343",
        "transactionType": "123123213",
        "transactionValue": "232323",
        "transactionNumber": "88272772",
        "transactionAccountStatement": "878267772"
      }
    }
  ];
  @Prop() headers: HeadersElement[] = [
    {
      key: 'accordion',
      label: '',
      searchable: false,
      sortable: false,
      accordion: true,
      render: () => {
        return '+';
      }
    },
    {
      key: 'itemId',
      label: 'Item Id',
      searchable: false,
      sortable: true,
      render: (params: string): string => {
        return params;
      }
    },
    {
      key: 'falabellaId',
      label: 'Falabella Id',
      searchable: false,
      sortable: true,
      render: (params: string): string => {
        return params;
      }
    },
    {
      key: 'sellerSKU',
      label: 'Seller SKU',
      searchable: false,
      sortable: true,
      render: (params: string): string => {
        return params;
      }
    },
    {
      key: 'falabellaSKU',
      label: 'Falabella SKU',
      searchable: false,
      sortable: true,
      render: (params: string): string => {
        return params;
      }
    },
    {
      key: 'product',
      label: 'Product',
      searchable: false,
      sortable: true,
      render: (params: string): string => {
        return params;
      }
    },
    {
      key: 'shipmentType',
      label: 'Shipment Type',
      searchable: false,
      sortable: true,
      render: (params: string): string => {
        return params;
      }
    },
    {
      key: 'price',
      label: 'Price',
      searchable: false,
      sortable: true,
      render: (params: string): string => {
        return params;
      }
    },
    {
      key: 'shipping',
      label: 'Shipping',
      searchable: false,
      sortable: true,
      render: (params: string): string => {
        return params;
      }
    },
    {
      key: 'status',
      label: 'Status',
      searchable: false,
      sortable: true,
      render: (params: string): string => {
        return params;
      }
    }
  ];;
  @Prop() dataTableAccordion?: any[] = [];
  @Prop() headerAccordion?: any[] = [{
    key: 'date',
    label: 'date',
    searchable: false,
    sortable: true,
    render: (params: string): string => {
      return params;
    }
  },
  {
    key: 'transactionType',
    label: 'Transaction Type',
    searchable: false,
    sortable: true,
    render: (params: string): string => {
      return params;
    }
  },
  {
    key: 'transactionValue',
    label: 'Transaction Value',
    searchable: false,
    sortable: true,
    render: (params: string): string => {
      return params;
    }
  },
  {
    key: 'transactionNumber',
    label: 'Transaction Number',
    searchable: false,
    sortable: true,
    render: (params: string): string => {
      return params;
    }
  },
  {
    key: 'transactionAccountStatement',
    label: 'Sransaction Account Statement',
    searchable: false,
    sortable: true,
    render: (params: string): string => {
      return params;
    }
  },];

  @State() orderBy: OrderBy = {
    columnKey: null,
    type: null
  };
  @State() accordion: number | null = null;

  @Element() action: HTMLElement;

  @Event({ eventName: 'fa-event-list-order-by' }) listOrderBy: EventEmitter<Object>;

  renderHeaders = () =>
    this.headers.map(value => (
      <th>
        <p>{value.label}</p>
        {value.sortable ? (
          <i
            class={
              this.orderBy.columnKey === value.key
                ? this.orderBy.type === TypeOrderBy[0]
                  ? 'orderByAsc'
                  : 'orderByDesc'
                : 'withoutOrderBy'
            }
            onClick={this.changeOrderBy.bind(this, value.key)}
          />
        ) : null}
      </th>
    ));

  renderHeadersAccordion = () =>
    this.headerAccordion.map(value => (
      <th>
        <p>{value.label}</p>
      </th>
    ));

  changeOrderBy(keyHeader: string) {
    const indexTypeOrderBy = TypeOrderBy.findIndex(el => el === this.orderBy.type);
    if (indexTypeOrderBy === -1 || keyHeader !== this.orderBy.columnKey) {
      this.orderBy = {
        columnKey: keyHeader,
        type: TypeOrderBy[0]
      };
    } else if (indexTypeOrderBy === 0) {
      this.orderBy = {
        columnKey: keyHeader,
        type: TypeOrderBy[1]
      };
    } else if (indexTypeOrderBy === 1) {
      this.orderBy = {
        columnKey: null,
        type: null
      };
    }
    this.listOrderBy.emit(this.orderBy);
  }

  handleEvent = (value: any, eventName: string) => {
    const event = new CustomEvent(eventName, { detail: value });
    this.action.dispatchEvent(event);
  };

  isEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  handleRedirectField = (fieldRedirectValue: string, eventName: string) => {
    const event = new CustomEvent(eventName, { detail: fieldRedirectValue });
    this.action.dispatchEvent(event);
  };

  toggleExpander = (index: number) => (index === this.accordion ? (this.accordion = null) : (this.accordion = index));

  renderBodyAccordion = (infoDetails: any) => {
    return (
      <tr>
        {this.headerAccordion.map(header => (
          <td class={header.key} innerHTML={header.render(infoDetails[header.key])}></td>
        ))}
      </tr>
    );
  };

  renderBody = () => {
    return (
      !this.isEmpty(this.dataTable[0]) &&
      this.dataTable.map((value, index) => {
        return (
          <Fragment>
            <tr key={index} class={this.accordion === index ? 'tr-selected' : ''}>
              {this.headers.map(header => {
                if (header.type === 'button') {
                  return (
                    <td class={header.key}>
                      {header.actionsButton.map(actionButton => (
                        <div class='ui-list-button-content'>
                          <button
                            style={actionButton.style}
                            onClick={() => this.handleEvent(value, actionButton.eventName)}>
                            {actionButton.text}
                          </button>
                        </div>
                      ))}
                    </td>
                  );
                } else {
                  if (header.redirect) {
                    return (
                      <td
                        class={`${header.key} redirect-field`}
                        onClick={() => this.handleRedirectField(header.render(value[header.key]), header.eventName)}
                        innerHTML={header.render(value[header.key])}></td>
                    );
                  }
                  if (header.accordion) {
                    return (
                      <td
                        class={`${header.key} tr-accordion`}
                        onClick={() => this.toggleExpander(index)}
                        innerHTML={header.render(value[header.key])}></td>
                    );
                  }
                  return <td class={header.key} innerHTML={header.render(value[header.key])}></td>;
                }
              })}
            </tr>
            {this.headers.find(el => el.accordion) ? (
              <tr
                key={`accordion-${index}`}
                class={`tr-accordion-details ${this.accordion === index ? 'tr-accordion-details-show' : ''}`}>
                <td colSpan={this.headers.length}>
                  <div>
                    <table class='ui-list-table' id='example'>
                      <thead>{this.renderHeadersAccordion()}</thead>
                      <tbody>{this.dataTable.length > 0 && this.renderBodyAccordion(value.infoDetails)}</tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ) : null}
          </Fragment>
        );
      })
    );
  };

  render() {
    return (
      <div class='ui-list-table-content'>
        <table class='ui-list-table' id='example'>
          <thead>{this.renderHeaders()}</thead>
          <tbody>{this.dataTable.length > 0 && this.renderBody()}</tbody>
        </table>
        {this.dataTable.length === 0 && <div class='helper-message'>No data available</div>}
      </div>
    );
  }
}
