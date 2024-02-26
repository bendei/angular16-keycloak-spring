import {Component, computed, effect, OnInit, Signal, signal} from "@angular/core";

import {FormsModule} from "@angular/forms";

const TAX = 0.3;

@Component({
  standalone: true,
  templateUrl: 'orderingsignal.component.html',
  selector: 'orderingsignal',
  imports: [FormsModule]
})
export class OrderingSignalComponent {

  selectedQuantityForVehicle: ISelectedVehicle[] = [];  // we are storing qunatites in the IVehicle quantity property for computation
  selectedQuantity = 0;

  subTotal = signal(0);
  total: Signal<number> = signal<number>(0);
  estimatedTax: Signal<number> = signal<number>(0);

  // names list to select from when typing
  names = ["Alma", "Bela", "Cecil", "Dora", "Eszter", "Eszenyi", "Eszméletlen", "Ferenc", "Gabor", "Hajnal", "Istvan", "Jozsef", "Karoly", "Lajos", "Mihaly", "Nandor",
    "Odon", "Peter", "Robert", "Ronda", "Sandor", "Simon","Sinkó", "Tamas", "Ubul", "Viktor", "Zoltan", "Zsolt", "Zsuzsa", "Zsuzsanna", "Zsuzska", "Zsuzsi", "Zsuzsika", "Zsuzsimama",
    "Zsuzsipapa", "Zsuzsanyi", "Zsuzsanyika", "Zsuzsanyi mama", "Zsuzsanyi papa", "Zsuzsanyi nagymama", "Zsuzsanyi nagypapa"];
  filteredNames: string[] = [];

  filterNames(event: Event) {
    console.log(event.target);
    const elem = event.target as HTMLInputElement;
    const valueName = elem.value;
    console.log(valueName);
    this.filteredNames = this.names.filter((value)=> {return value.toLowerCase().startsWith(valueName.toLowerCase());});
  }








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
