import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent {

  constructor(private snackBar: MatSnackBar,){}

  @Input('sourceListHeading') srcListHeading = 'Source';
  @Input('targetListHeading') trgListHeading = 'Target';
  @Input('sourceList') srcList = [];
  @Input('targetList') trgList = [];
  @Input('draggableElmCount') dragCount: number = 0;
  @Input() public sourcePropertyName: string;
  @Input() public targetPropertyName: string;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (this.dragCount && event.container.id === 'trgListId') {
        if (event.container.data.length < this.dragCount) {
          this.transferData(event);
        } else {
          const msg = `Reached Max Item Limit. You can select only ${this.dragCount} items.`;
          this.snackBar.open(msg, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      } else {
        this.transferData(event);
      }
    }
  }

  transferData(_event) {
    let event = _event;
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

  public get updatedSourceList() {
    return this.srcList;
  }

  public get updatedTargetList() {
    return this.trgList;
  }
}



