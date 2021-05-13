import { Component, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'ui-modal',
  styleUrl: 'ui-modal.css',
  shadow: true
})
export class UiModal {
  @Prop({ reflect: true, mutable: true }) isActive: boolean = false;
  @Element() host: HTMLElement;

  closeModal = () => {
    this.isActive = false;
  }

  render() {
    const titleComponent = this.host.querySelector('[slot="title"]') ? 
      <slot name="title"></slot> : "";
    const contentComponent = this.host.querySelector('[slot="content"]') ? 
      <slot name="content"></slot> : "";
    return (
      <div class={`modal-content ${this.isActive ? "active" :  ""}`}>
        <div class="modal-back" onClick={this.closeModal}></div>
        <div class='modal'>
          <a class="close" onClick={this.closeModal}></a>
          {titleComponent}
          {contentComponent}
        </div>
      </div>
      
    );
  }
}
