/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { HeadersElement } from "./components/ui-list/ui-list";
export namespace Components {
    interface UiList {
        "dataTable": any[];
        "headers": HeadersElement[];
    }
    interface UiModal {
        "isActive": boolean;
    }
    interface UiPaginator {
        "currentPage": number;
        "isInputPage": boolean;
        "isSelectItemsPage": boolean;
        "itemsPerPage": number;
        "numberPages": number;
        "optionsItemsPage": number[];
    }
}
declare global {
    interface HTMLUiListElement extends Components.UiList, HTMLStencilElement {
    }
    var HTMLUiListElement: {
        prototype: HTMLUiListElement;
        new (): HTMLUiListElement;
    };
    interface HTMLUiModalElement extends Components.UiModal, HTMLStencilElement {
    }
    var HTMLUiModalElement: {
        prototype: HTMLUiModalElement;
        new (): HTMLUiModalElement;
    };
    interface HTMLUiPaginatorElement extends Components.UiPaginator, HTMLStencilElement {
    }
    var HTMLUiPaginatorElement: {
        prototype: HTMLUiPaginatorElement;
        new (): HTMLUiPaginatorElement;
    };
    interface HTMLElementTagNameMap {
        "ui-list": HTMLUiListElement;
        "ui-modal": HTMLUiModalElement;
        "ui-paginator": HTMLUiPaginatorElement;
    }
}
declare namespace LocalJSX {
    interface UiList {
        "dataTable"?: any[];
        "headers"?: HeadersElement[];
    }
    interface UiModal {
        "isActive"?: boolean;
    }
    interface UiPaginator {
        "currentPage"?: number;
        "isInputPage"?: boolean;
        "isSelectItemsPage"?: boolean;
        "itemsPerPage"?: number;
        "numberPages"?: number;
        "onFa-event-paginator-items-per-page-will-change"?: (event: CustomEvent<Object>) => void;
        "onFa-event-paginator-page-will-change"?: (event: CustomEvent<Object>) => void;
        "optionsItemsPage"?: number[];
    }
    interface IntrinsicElements {
        "ui-list": UiList;
        "ui-modal": UiModal;
        "ui-paginator": UiPaginator;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "ui-list": LocalJSX.UiList & JSXBase.HTMLAttributes<HTMLUiListElement>;
            "ui-modal": LocalJSX.UiModal & JSXBase.HTMLAttributes<HTMLUiModalElement>;
            "ui-paginator": LocalJSX.UiPaginator & JSXBase.HTMLAttributes<HTMLUiPaginatorElement>;
        }
    }
}
