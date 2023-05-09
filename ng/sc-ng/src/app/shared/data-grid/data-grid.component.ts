import { Component, ViewChild, OnChanges, Input, SimpleChanges, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DataGridService } from './data-grid.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnChanges, AfterViewInit {

  constructor(private gridservice: DataGridService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  @Input() public dataGridConfig;
  @Output() public gridActionEvent = new EventEmitter<{ row: any, eventName: string }>();
  public dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort: MatSort;
  public displayedColumns: string[];
  public gridPageSize = 10;
  public displayActionColumn = true;
  public paginationConfig = false;
  public showCountColumn = true;
  public columnList = [];
  public actionItems = [];
  public gridId: string;
  public filtering = true;
  public delId: string;
  public deleteRecordKey: string;
  public deleteRecordKeyword: string;
  public displayNameKey: string;
  public isNoDataFound: boolean = false;
  public isExportExcel: boolean = false;
  private module: string;
  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataGridConfig.currentValue) {
      this.updateGridConfig(changes.dataGridConfig.currentValue);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    const filterColumn = ['orgname', 'orgcontactNumber'];
    //this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  /* customFilterPredicate() {
    const filterColumn = ['orgname', 'orgcontactNumber'];
    return ((data: any, filterValue) => {
      for (let i = 0; i < filterColumn.length; i++) {
        const fitsThisFilter = data[filterColumn[i]].toLowerCase().includes(filterValue);
        if (!fitsThisFilter) {
          return false;
        }
      }
      return true;
    });
  } */


  public applyAction(row, eventName) {
    if (eventName && eventName.toLowerCase() === 'delete') {
      this.deleteSelectRowData(row);
    } else {
      this.gridActionEvent.emit({ row, eventName });
    }
  }

  public applyFilterOnGrid(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private deleteSelectRowData(rowData) {
    let displayNameKey = this.displayNameKey;
    let deleteRecordKeyword = this.deleteRecordKeyword ? this.deleteRecordKeyword: this.gridId;
    const DIALOG_CONFIG_DATA = {
      message: `Are you sure you want to delete <ng-template><b class="text-capitalize"> 
              ${rowData[displayNameKey]} </b></ng-template> ${deleteRecordKeyword} ? 
              This will delete all the details under this ${deleteRecordKeyword}. This action is irreversible.`,
      title: 'Confirm Deletion',
      secondaryButtonName: 'Cancel',
      primaryButtonName: 'Yes, Delete',
      type: 'deleteGridData'
    };

    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '450px',
      data: DIALOG_CONFIG_DATA
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes, Delete') {
        this.deleteGridData(rowData);
      }
    });
  }

  private deleteGridData(rowData) {
    let deleteRecordKey = this.deleteRecordKey;
    let delUrl = this.delId ? this.delId : this.gridId;
    this.gridservice.deleteGridData(delUrl, rowData[deleteRecordKey], this.module)
      .subscribe(data => {
        if (data && data['success'] === true) {
          this.snackBar.open(data['message'], 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.getGridDataSourceData();
        }


      });
  }

  private updateGridConfig(gridConfig) {
    this.columnList = gridConfig.columnList || [];
    this.displayActionColumn = gridConfig.displayActionColumn || false;
    this.actionItems = gridConfig.actionItems || [];
    this.gridPageSize = gridConfig.gridPageSize || 10;
    this.paginationConfig = gridConfig.paginationConfig || false;
    this.showCountColumn = gridConfig.showCountColumn || true;
    this.gridId = gridConfig.id || null;
    this.filtering = gridConfig.filtering || true;
    this.delId = gridConfig.delId || null;
    this.deleteRecordKey = gridConfig.deleteRecordKey || null;
    this.deleteRecordKeyword = gridConfig.deleteRecordKeyword || null;
    this.displayNameKey = gridConfig.displayNameKey || null;
    this.isExportExcel = gridConfig.isExportExcel || false;
    this.module = gridConfig.module;
    

    /** Get GridData here */
    if (this.gridId) {
      this.displayedColumns = this.columnList.map(result => result.id);
      if (this.displayActionColumn) {
        this.displayedColumns.push('action');
      }
      this.getGridDataSourceData();
    }

  }

  private getGridDataSourceData() {
    this.gridservice.getGridData(this.gridId, this.module)
      .subscribe(data => {
        
        let dataResponse;
        dataResponse = data.data;
        if (this.showCountColumn) {
          dataResponse.forEach((element, index) => {
            element.position = index + 1;
          });
        }
        this.dataSource.data = dataResponse;
        this.dataSource.sort = this.sort;
        this.isNoDataFound = false;
      }, error => {
        this.isNoDataFound = true;
      });
  }
}



