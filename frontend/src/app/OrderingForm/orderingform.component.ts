import { Component, OnInit} from "@angular/core";
import {NgFor} from "@angular/common";
import {FormsModule} from "@angular/forms";

const TAX = 0.3;

@Component({
  standalone: true,
  templateUrl: 'orderingform.component.html',
  selector: 'orderingform',
  imports: [NgFor, FormsModule]
})
export class OrderingformComponent implements OnInit {

  selectedVehicle: IVehicle;
  selectedQuantityForVehicle: ISelectedVehicle[] = [];  // we are storing qunatites in the IVehicle quantity property for computation
  selectedQuantity = 0;

  subTotal = 0;
  total = 0;
  estimatedTax = 0;

  vehicles: IVehicle[] = [];

  constructor() {
    this.loadVehicles();
  }

  ngOnInit(): void {

  }

  private loadVehicles() {
    this.vehicles.push(
      {
        brand: "Opel",
        price: 100,
        quantity: [0, 1, 2, 3, 4]
      });
    this.vehicles.push(
      {
        brand: "Jaguar",
        price: 300,
        quantity: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      }
    );
  }

  onChangeSelectedVehicle(veh: IVehicle) {
    this.selectedVehicle = veh;

    if (this.selectedQuantityForVehicle.length == 0) {
      this.selectedQuantityForVehicle.push({brand: veh.brand, quantity: this.selectedQuantity, price: veh.price});
    } else {
      let found = this.selectedQuantityForVehicle.find((elem) => elem.brand == veh.brand);
      if (found) {
        found.quantity = this.selectedQuantity;
      } else {
        this.selectedQuantityForVehicle.push({brand: veh.brand, quantity: this.selectedQuantity, price: veh.price});
      }
    }
    this.subTotal = 0;
    this.subTotal = this.selectedQuantityForVehicle.reduce((accumulator, value) => {
      return accumulator + (value.quantity * value.price);
    }, 0);
    this.estimatedTax = this.subTotal * TAX;
    this.total = this.subTotal + this.estimatedTax;
  }
}

interface IVehicle {
  price: number,
  quantity: number[],
  brand: string
}

interface ISelectedVehicle {
  price: number,
  brand: string,
  quantity: number
}
