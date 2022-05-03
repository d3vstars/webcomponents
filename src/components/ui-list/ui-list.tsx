import { Component, Prop, Element, Event, EventEmitter, State, h, Fragment } from '@stencil/core';
interface ActionsButton {
  text: (any) => string | string;
  eventName: string;
  style?: any;
  condition?: Function;
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
  @Prop() dataTable: any[] = [];
  @Prop() headers: HeadersElement[] = [];
  @Prop() headerAccordion?: any[] = [];

  @State() orderBy: OrderBy = {
    columnKey: null,
    type: null
  };
  @State() accordion: number | null = null;

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

  isEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  handleRedirectField = (fieldRedirectValue: string, eventName: string) => {
    const event = new CustomEvent(eventName, { detail: fieldRedirectValue });
    this.action.dispatchEvent(event);
  };

  toggleExpander = (index: number) => (index === this.accordion ? (this.accordion = null) : (this.accordion = index));

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
                                  {typeof actionButton.text === 'function' ? actionButton.text(value) : actionButton.text}
                                </button>
                              </div>
                            )
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
                        )
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
