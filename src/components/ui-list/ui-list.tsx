import { Component, Prop, Element, Event, EventEmitter, State, h, Fragment } from '@stencil/core';

interface ActionsButton {
  text: any;
  eventName: string;
  style?: any;
  render?: Function;
  condition?: Function;
  indexTranslation?: number;
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
  editable?: boolean;
  reference?: any;
  hidden?: boolean;
  translations?: any;
  numberFormat?: {
    type: string;
    currency: string;
  };
}
@Component({
  tag: 'ui-list',
  shadow: false,
  styleUrl: 'ui-list.css'
})
export class UIList {
  @Prop() dataTable: any[] = [];
  @Prop() headers: HeadersElement[] = [];
  @Prop() headerAccordion?: any[] = [];

  @State() orderBy: OrderBy = {
    columnKey: null,
    type: null
  };
  @State() accordion: number | null = null;
  @State() isOpenTooltip: boolean = false;
  @State() isDisabled: boolean = true;
  @State() tooltipId: number;
  @State() tooltipValue: any;

  @Element() action: HTMLElement;

  @Event({ eventName: 'fa-event-list-order-by' }) listOrderBy: EventEmitter<Object>;

  renderHeaders = () =>
    this.headers.length > 0 ? (
      <tr>
        {this.headers.map(value => (
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
        ))}
      </tr>
    ) : null;

  renderHeadersAccordion = () => (
    <tr>
      {this.headerAccordion.map(value => (
        <th>
          <p>{value.label}</p>
        </th>
      ))}
    </tr>
  );

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

  isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  handleRedirectField = (fieldRedirectValue: string, eventName: string) => {
    const event = new CustomEvent(eventName, { detail: fieldRedirectValue });
    this.action.dispatchEvent(event);
  };

  toggleExpander = (index: number) => (index === this.accordion ? (this.accordion = null) : (this.accordion = index));

  handleEditField = (value: any, eventName: string) => {
    const event = new CustomEvent(eventName, { detail: value });
    this.action.dispatchEvent(event);
  };

  renderBodyAccordion = (infoDetails: any) => {
    if (Object.keys(infoDetails).length > 0) {
      return (
        <tr>
          {this.headerAccordion.map(header => (
            <td innerHTML={header.render(infoDetails[header.key])}></td>
          ))}
        </tr>
      );
    }
    return null;
  };

  renderEditTooltipBody = (header, index: number, value) => {
    const headerValue = value[header.reference.value];
    const inputValue = this.currencyFormat(headerValue, header);
    return (
      <td class={`${header.key}`}>
        <div class='tooltip'>
          {header.render(value[header.key])}
          <i class='edit-icon' onClick={() => this.openTooltip(index)} />
          <div
            class={`tooltip-information-container ${this.isOpenTooltip && this.tooltipId === index ? '' : 'hidden'}`}>
            <div class='tooltip-arrow' />
            <div class='tooltip-edit'>
              <div class='container'>
                <div class='column-left'>
                  <label>{header.translations.label}</label>
                </div>
                <div class='column-right'>
                  <input onInput={this.handleChange} value={header.render(inputValue)} />
                </div>
              </div>

              <div class='message-info'>
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20ZM11.1625 8.235L8.3 8.59375L8.1975 9.06875L8.76 9.1725C9.1275 9.26 9.2 9.3925 9.12 9.75875L8.1975 14.0938C7.955 15.215 8.32875 15.7425 9.2075 15.7425C9.88875 15.7425 10.68 15.4275 11.0388 14.995L11.1487 14.475C10.8987 14.695 10.5337 14.7825 10.2913 14.7825C9.9475 14.7825 9.8225 14.5413 9.91125 14.1163L11.1625 8.235ZM10 6.875C10.3315 6.875 10.6495 6.7433 10.8839 6.50888C11.1183 6.27446 11.25 5.95652 11.25 5.625C11.25 5.29348 11.1183 4.97554 10.8839 4.74112C10.6495 4.5067 10.3315 4.375 10 4.375C9.66848 4.375 9.35054 4.5067 9.11612 4.74112C8.8817 4.97554 8.75 5.293488.75 5.625C8.75 5.95652 8.8817 6.27446 9.11612 6.50888C9.35054 6.7433 9.66848 6.875 10 6.875Z'
                    fill='#999999'
                  />
                </svg>

                <p>{header.translations.info}</p>
              </div>
              <div class='container-buttons'>
                <button
                  class='submit-button'
                  type='submit'
                  disabled={this.isDisabled}
                  onClick={event =>
                    this.handleSubmit(event, header.eventName, header.render(value[header.reference.key]))
                  }>
                  {header.translations.buttons.confirm}
                </button>
                <button class='cancel-button' onClick={this.closeTooltip}>
                  {header.translations.buttons.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    );
  };

  openTooltip = (index: number) => {
    this.tooltipId = index;
    this.isOpenTooltip = true;
  };

  currencyFormat = (value, header) => {
    const inputValue = header.numberFormat
      ? new Intl.NumberFormat(header.numberFormat.type, {
          currency: header.numberFormat.currency
        }).format(value)
      : value;
    return inputValue;
  };

  handleChange = event => {
    this.isDisabled = false;
    const { value } = event.target;
    this.tooltipValue = value;
  };

  handleSubmit = (event, eventName, keyValue) => {
    event.preventDefault();
    const customEvent = new CustomEvent(eventName, {
      detail: {
        value: this.tooltipValue,
        key: keyValue
      }
    });
    this.action.dispatchEvent(customEvent);
    this.tooltipId = 0;
    this.isOpenTooltip = false;
    this.isDisabled = true;
  };

  closeTooltip = () => {
    this.tooltipId = 0;
    this.isOpenTooltip = false;
    this.isDisabled = true;
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
                      {header.actionsButton.map(actionButton => {
                        if (actionButton.condition) {
                          if (actionButton.condition(value)) {
                            return (
                              <div class='ui-list-button-content'>
                                <button
                                  style={actionButton.style}
                                  onClick={() => this.handleEvent(value, actionButton.eventName)}>
                                  {typeof actionButton.text === 'function'
                                    ? actionButton.text(value)
                                    : actionButton.text}
                                </button>
                              </div>
                            );
                          }
                          return null;
                        }

                        return (
                          <div class='ui-list-button-content'>
                            <button
                              style={actionButton.style}
                              onClick={() => this.handleEvent(value, actionButton.eventName)}>
                              {typeof actionButton.text === 'function' ? actionButton.text(value) : actionButton.text}
                            </button>
                          </div>
                        );
                      })}
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

                  if (header.editable) {
                    return this.renderEditTooltipBody(header, index, value);
                  }
                  if (header.accordion) {
                    return (
                      <td class={`${header.key} tr-accordion`}>
                        <i
                          class={this.accordion === index ? 'minus' : 'plus'}
                          onClick={() => this.toggleExpander(index)}
                        />
                      </td>
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
                    <table class='ui-list-table'>
                      <thead>{this.renderHeadersAccordion()}</thead>
                      <tbody>{this.renderBodyAccordion(value.infoDetails)}</tbody>
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
        <table class='ui-list-table'>
          <thead>{this.renderHeaders()}</thead>
          <tbody>{this.dataTable.length > 0 && this.renderBody()}</tbody>
        </table>
        {this.dataTable.length === 0 && <div class='helper-message'>No data available</div>}
      </div>
    );
  }
}
