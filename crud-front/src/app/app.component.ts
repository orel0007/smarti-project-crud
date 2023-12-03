import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductEdit } from '../components/products/products.component';
import { ProductService } from 'src/services/product.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-front';
  displayedColumns: string[] = ['id', 'name', 'category', 
      'price','description','is_in_stock','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog:MatDialog, 
    private _proService:ProductService, 
    private _coreService:CoreService){}

  ngOnInit(): void{
    this.getProductsList();
  }
//open and update the list of the products in the user sides.
  openAddEditproductForm(){
    const dialogRef = this._dialog.open(ProductEdit);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getProductsList();
        }
      }
    });
  }
//Seng get request to the server and update the client list of products.
  getProductsList(){
    this._proService.getProductsList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Dekete product from the server if exist othersie print erorr.
  deleteProduct(id: number){
    this._proService.deleteProduct(id).subscribe({
      next: (res)=>{
        this._coreService.openSnackBar("Product deleteed", "done")
        this.getProductsList();
      },
      error: console.log,
    })
  }

//open the list of the products
  openEditForm(data: any){
    const dialogRef = this._dialog.open(ProductEdit, {
    data,
  })
  dialogRef.afterClosed().subscribe({
    next: (val) =>{
      if(val){
        this.getProductsList();
      }
    }
  });
  }
}
