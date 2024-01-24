import {Component, computed, effect, OnInit, Signal, signal} from "@angular/core";
import {NgFor} from "@angular/common";
import {FormsModule} from "@angular/forms";

const TAX = 0.3;

@Component({
  standalone: true,
  templateUrl: 'orderingsignal.component.html',
  selector: 'orderingsignal',
  imports: [NgFor, FormsModule]
})
export class OrderingSignalComponent {

  selectedQuantityForVehicle: ISelectedVehicle[] = [];  // we are storing qunatites in the IVehicle quantity property for computation
  selectedQuantity = 0;

  subTotal = signal(0);
  total: Signal<number> = signal<number>(0);
  estimatedTax: Signal<number> = signal<number>(0);

  vehicles: IVehicle[] = [];

  constructor() {
    this.loadVehicles();
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

    this.subTotal.set(this.selectedQuantityForVehicle.reduce((accumulator, value) => {
      return accumulator + (value.quantity * value.price);
    }, 0));

    this.estimatedTax = computed(() => this.subTotal() * TAX);
    this.total = computed(() => this.subTotal() + this.estimatedTax());
    console.log(this.estimatedTax());

    console.table(this.selectedQuantityForVehicle);

  //  effect(() => console.log(this.estimatedTax()));
  //  effect(() => console.log(this.subTotal()));
  }

  multiplayBy10() {
    this.subTotal.update((ez) => ez * 10);

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
