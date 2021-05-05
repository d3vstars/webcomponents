import { Component, Event, EventEmitter, h, Listen, Prop, State, Element } from '@stencil/core';
import { getErrors } from "../../utils/utils"

@Component({
  tag: 'ui-paginator',
  styleUrl: 'ui-paginator.css',
  shadow: true,
})
export class UiPaginator {

  @Prop({reflect: true, mutable: true}) numberPages:number;
  @Prop({reflect: true, mutable: true}) currentPage:number;
  @Prop({reflect: true, mutable: true}) itemsPerPage = 15;
  @Prop({reflect: true, mutable: true}) numItemsPageOptions = [15, 30, 50, 100];
  @Prop({reflect: true, mutable: true}) isInputPage = true;
  @Prop({reflect: true, mutable: true}) isSelectItemsPage = true;
  @Element() el: HTMLElement;

  @State() inputError = [];
  // reason per page (or number of the total elements)
  @State() pageReason:number;
  // real number page for calculate the reason 
  @State() realNumberPage:number;

  @Event({eventName: 'fa-event-paginator-page-will-change'}) pageWillChange: EventEmitter<Object>;
  @Event({eventName: 'fa-event-paginator-items-per-page-wil-change'}) itemsPerPageWillChange: EventEmitter<Object>;

  private timeout = null;

  // Init component
  connectedCallback() {
    // Define the first reason for number pages by items per page
    if(!this.realNumberPage) this.realNumberPage = this.numberPages;
    this.pageReason = this.itemsPerPage * this.realNumberPage;
    // If the number of item per page is not in the option items is added
    if(!this.numItemsPageOptions.includes(this.itemsPerPage)){
      this.numItemsPageOptions.push(this.itemsPerPage);
      this.numItemsPageOptions.sort((a, b) => a - b);
    } 
  }

  // Render list of buttons
  renderButtons () {
    return [
      <button class="button-prev" onClick={this.goToPage.bind(this, this.currentPage - 1 || 1)}></button>,
      <div class="button-number-container">{this.getNumberButtons()}</div>,
      <button class="button-next" onClick={this.goToPage.bind(this, this.currentPage + 1 >= this.numberPages ? this.numberPages : this.currentPage + 1)}></button>
    ]
  } 
 // get only the number buttons
  getNumberButtons () {
    //-x + 4
    let firstPage =  this.currentPage - (this.numberPages - this.currentPage < 2 ? -(this.numberPages - this.currentPage) + 4 : 2);
    firstPage = firstPage < 1 ? 1 : firstPage;
    // -x + 5
    let lastPage =  this.currentPage + (this.currentPage < 3 ? - this.currentPage + 5 : 2);
    lastPage = lastPage > this.numberPages ? this.numberPages : lastPage;

    const numbersButtons = [];
    for(let i = firstPage; i <= lastPage; i++){
      numbersButtons.push(
        <button class={i === this.currentPage ? "current" : ""} onClick={this.goToPage.bind(this, i)}>{i}</button>
      );
    }
    return numbersButtons;
  }
  
  //change the page
  goToPage(page:number) {
    if(page === this.currentPage) return;
    this.pageWillChange.emit({oldPage: this.currentPage, newPage: page});
  }

  //handler change the page input
  handlerInput (event) {
    // Only numbers
    event.target.value = event.target.value.replace(/[^\d]/,'');
    const page = event.target.value;
    
    this.inputError = getErrors([
      {rule: "isNumber", value: page}, 
      {rule: "isBetween", value: page, lowerLimit: 1, upperLimit: this.numberPages}
    ]);

    // Wait 1 sec and then execute the page change
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if(this.inputError.length || page === "") return;
      this.goToPage(page);
    }, 1000);    
  } 


 //handler change the select number items per page
  handlerSelectChange (event) {
    const numPages = event.target.value;
    // Calculate the number pages are needed to show the data
    this.realNumberPage = this.pageReason / numPages;
    // aprox. to up the number of pages
    this.numberPages = Math.ceil(this.realNumberPage);
    this.itemsPerPage = numPages;
  }

  @Listen("fa-event-paginator-page-change")
  pageChange(event: CustomEvent<any>) {
    const { page } = event.detail;
    if(!page) throw new Error("Page must be defined in the custom event details");
    this.currentPage = page;
  }

  render() {
    const goToPageContent = this.isInputPage ? 
              <div>
                <label>Go to page: </label>
                <input 
                  class={!this.inputError.length ? "": "error"} 
                  type="number" 
                  onInput={this.handlerInput.bind(this)}
                  placeholder="Pages" 
                />
                <p class="errors">{this.inputError.map(err => `${err}\n`)}</p>
              </div> : "";
      const itemsPerPageSelect = this.isSelectItemsPage ? 
      <div><label>Items per page</label>
              <select onChange={this.handlerSelectChange.bind(this)}>
                {this.numItemsPageOptions.map(option => 
                  <option value={option} selected={option === this.itemsPerPage} >{option}</option>
                )
                }
              </select>
            </div>
            : "";
    return <div class="paginator-content">
            <div class="center-container">
              <div class="go-to-page-content">
                {goToPageContent}
              </div>
              <div class="button-content">
                <button class="button-all-left" onClick={this.goToPage.bind(this, 1)}></button>
                {this.renderButtons()}
                <button class="button-all-right" onClick={this.goToPage.bind(this, this.numberPages)}></button>
              </div>
              <div class="item-page">
                {itemsPerPageSelect}
              </div>
               
            </div>
            
            
          </div>;
  }

}
