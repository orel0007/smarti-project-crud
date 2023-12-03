import { MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductEdit implements OnInit{
  productForm: FormGroup;
  constructor(
    private _fb: FormBuilder, 
    private _proService: ProductService, 
    private _dialogRef:MatDialogRef<ProductEdit>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService:CoreService,
    ){
    this.productForm= this._fb.group({
      name: '',
      category: '',
      price: '',
      description: '',
      is_in_stock: '',
    })
  }

  ngOnInit(): void{
    this.productForm.patchValue(this.data);
  }

  //Function for insert new product and update exist product in the products from.
  onFormSubmit(){
    if(this.productForm.valid){
      //Check if the data isnt empty so need to update the product, otherwise insert
      if(this.data){
        //Update the product
        this._proService.updateProduct(this.data.id,this.productForm.value).subscribe({
          next: (val:any)=>{
            this._coreService.openSnackBar("Product update", "done")
            this._dialogRef.close(true);
  
          },
          error:(err:any)=>{
            console.error(err);
          }
        }); 
      }
      else{
        //insert new product
        this._proService.addProduct(this.productForm.value).subscribe({
          next: (val:any)=>{
            this._coreService.openSnackBar("Product added", "done")
            this._dialogRef.close(true);
  
          },
          error:(err:any)=>{
            console.error(err);
          }
        }); 
      }
      
    }
    else{
      console.log("not valid") 
    }
  }
}
