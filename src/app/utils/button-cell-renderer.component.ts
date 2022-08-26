import { Component } from "@angular/core";

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button mat-flat-button (click)="btnClickedHandler()">
        <mat-icon>delete</mat-icon>
    </button>
  `,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
  refresh(params: ICellRendererParams<any, any>): boolean {
      return false;
  }
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.data.id);
  }
}