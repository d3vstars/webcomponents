import { Component, Prop, Element, Event, EventEmitter, State, h } from '@stencil/core';
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
  @Prop() dataTable: any[] = [];
  @Prop() headers: HeadersElement[] = [];
  @State() orderBy: OrderBy = {
    columnKey: null,
    type: null
  };

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

  toggleExpander = index => {
    console.log('### COLUMN INDEX', index);
  };

  renderBody = () => {
    return (
      !this.isEmpty(this.dataTable[0]) &&
      this.dataTable.map((value, index) => {
        return (
          <tr key={index}>
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
