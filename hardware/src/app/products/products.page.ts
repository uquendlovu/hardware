import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  prodID: any;
  CatID: any;
  ProdDescription: any;
  price: any;
  products: any[];
  product: any;

  total_amt = 0;
  totalItems = 0;
  notifications = 0;
  totalItemPrice;
  qty = 0;

  constructor( public _apiservice: ApiService, private modalCtrl: ModalController) {
    this.productLists();
   }

  ngOnInit() {
  }

  productLists(){
    this._apiservice.getProducts().subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.products = res;
    },(error: any) => {
      alert('ERROR');
      console.log("ERROR ===",error);
    })

  }
  deleteItem(i){
    this. products = this. products.filter(item => item.prodID !== i);
  }

  remove(prodID){
      console.log(this.product.price)
  }



  add(prodID){
    console.log(this.product.price);
  }

total(){
  for (let i = 0; i < this. products.length; i++) {
    this.total_amt = 0;
  }
}

}
