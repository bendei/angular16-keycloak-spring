import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {KonnektorDTO} from "../../../../target/generated-sources/openapi";

@Component({
  standalone: true,
  selector: 'app-konnektor-dropdown',
  templateUrl: './konnektor-dropdown.component.html'
})
export class KonnektorDropdownComponent implements  OnInit {

  @Input()
  konnektor!: KonnektorDTO;

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  public onRemove(): void {
    this.router.navigate(['/konnektor/', this.konnektor.id, 'remove']);
  }

  public onModify(): void {
    // http://localhost:4200/konnektor/5/modify
    this.router.navigate(['/konnektor/', this.konnektor.id, 'modify']);
  }

  public onNew(): void {
    this.router.navigate(['/konnektor/new']);
  }

}
