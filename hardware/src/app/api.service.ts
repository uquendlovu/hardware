import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: HttpHeaders;

  constructor(
    public http: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
   }
   addCustomer(data){
      return this.http.post('http://localhost/Hardware/backend/registerCustomer.php', data);


   }

   getCustomers(){
    return this.http.get('http://localhost/Hardware/backend/getCustomerProfile.php');
 }

 getProducts(){
  return this.http.get('http://localhost/Hardware/backend/getAllProducts.php');
}

   getAllMenuMaterials() : Observable<any> {
     return this.http.get('assets/json/allMaterials.json');
   }
   getAllYourOrders(): Observable<any> {
    return this.http.get('assets/json/yourOrder.json');
  }
}
