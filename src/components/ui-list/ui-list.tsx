import { Component, Prop, Element, Event, EventEmitter, State, h } from '@stencil/core';
interface ActionsButton {
  text: string;
  eventName: string;
  style?: any;
}

interface RenderFunction {
  (params: any): string;
}

const TypeOrderBy: string[] = ["asc", "desc"];

interface OrderBy {
  columnKey: string | null;
  type:  string | null;
}

export interface HeadersElement {
  key: string;
  label: string;
  searchable: boolean;
  type?: string;
  render?: RenderFunction;
  actionsButton?: ActionsButton[];
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

  renderHeaders = () => this.headers.map(value => <th>
      <p>{value.label}</p>
      <i class={this.orderBy.columnKey === value.key ? this.orderBy.type === TypeOrderBy[0] ? "orderByAsc": "orderByDesc" : "withoutOrderBy"} onClick={this.changeOrderBy.bind(this, value.key)}/>
  </th>);

  changeOrderBy(keyHeader: string) {
    const indexTypeOrderBy = TypeOrderBy.findIndex(el => el === this.orderBy.type)
    if (indexTypeOrderBy === -1 || keyHeader !== this.orderBy.columnKey) {
      this.orderBy = {
        columnKey: keyHeader,
        type: TypeOrderBy[0]
      }
    } else if (indexTypeOrderBy === 0) {
      this.orderBy = {
        columnKey: keyHeader,
        type: TypeOrderBy[1]
      }
    } else if (indexTypeOrderBy === 1) {
      this.orderBy = {
        columnKey: null,
        type: null
      }
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

  renderBody = () => {
    return (
      !this.isEmpty(this.dataTable[0]) &&
      this.dataTable.map(value => (
        <tr>
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
              return <td class={header.key} innerHTML={header.render(value[header.key])}></td>;
            }
          })}
        </tr>
      ))
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
