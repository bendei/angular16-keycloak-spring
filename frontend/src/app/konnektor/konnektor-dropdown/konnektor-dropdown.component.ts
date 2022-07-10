import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-konnektor-dropdown',
  templateUrl: './konnektor-dropdown.component.html'
})
export class KonnektorDropdownComponent implements  OnInit {

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  public onRemove(): void {
    this.router.navigate(['/konnektor/remove']);
  }

  public onModify(): void {
    this.router.navigate(['/konnektor/modify']);
  }
}
