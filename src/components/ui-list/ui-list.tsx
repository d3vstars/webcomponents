import { Component, Prop, Element, h } from '@stencil/core';

interface ActionsButton {
  text: string;
  eventName: string;
  style?: any;
}

interface RenderFunction {
  (params: any): string;
}

interface HeadersElement {
  key?: string;
  label: string;
  searchable: boolean;
  type?: string;
  render: RenderFunction;
  actionsButton?: ActionsButton[];
}

@Component({
  tag: 'ui-list',
  shadow: true,
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
    return this.dataTable.map(value => (
      <tr>
        {this.headers.map(header => {
          if (header.type === 'button') {
            return (
              <td>
                {header.actionsButton.map(actionButton => (
                  <button style={actionButton.style} onClick={() => this.handleEvent(value, actionButton.eventName)}>
                    {actionButton.text}
                  </button>
                ))}
              </td>
            );
          } else {
            return <td innerHTML={header.render(value[header.key])}></td>;
          }
        })}
      </tr>
    ));
  };

  render() {
    return (
      <table>
        <thead>{this.renderHeaders()}</thead>
        <tbody>{this.renderBody()}</tbody>
      </table>
    );
  }
}
