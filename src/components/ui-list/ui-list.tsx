import { Component, Prop, Element, h } from '@stencil/core';
interface ActionsButton {
  text: string;
  eventName: string;
  style?: any;
}

interface RenderFunction {
  (params: any): string;
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

  @Element() action: HTMLElement;

  renderHeaders = () => this.headers.map(value => <th>{value.label}</th>);

  handleEvent = (value: any, eventName: string) => {
    const event = new CustomEvent(eventName, { detail: value });
    this.action.dispatchEvent(event);
  };

  renderBody = () => {
    return (
      this.dataTable.length >= 1 &&
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
