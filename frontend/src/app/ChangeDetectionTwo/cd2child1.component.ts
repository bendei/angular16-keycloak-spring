import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2
} from "@angular/core";
import {Cd2child11Component} from "./cd2child11.component";
import {Counter} from "./cd2.component";


@Component({
  standalone: true,
  selector: 'cd2child1',
  templateUrl: 'cd2child1.component.html',
  imports: [
    Cd2child11Component
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cd2child1Component implements OnChanges, DoCheck, OnDestroy, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

  private _nevem: string = "bende";

  @Input() parentCounter: Counter;
  @ContentChild("footer") projectedContent: ElementRef;

  get nevem(): string {
    console.log(" nevem proerty get - Cd2child1Component:" + this._nevem);
    return this._nevem;
  }

  heavyCalculation(): string {
    console.log("heavyCalculation");
    return "heavy calculated";
  }

  constructor(public renderer: Renderer2) {
    console.log("   Cd2child1 Component:Contructed");
  }

  doNothing(): void {

  }

  valamitCsinalok(): void {
    console.log("valamitCsinalok");
  }

  ngOnChanges() {
    console.log("   Cd2child1 Component:ngOnChanges");
  }

  ngOnInit() {
    console.log("   Cd2child1Component:ngOnInit");
  }

  ngDoCheck() {
    console.log("---Cd2child1 Component:DoCheck");
  }

  ngAfterContentInit() {
    console.log("   Cd2child1Component:ngAfterContentInit");

  }

  ngAfterContentChecked() {
    console.log("   Cd2child1Component:AfterContentChecked");
    console.log(this.projectedContent);
    //this.redenerWorkaroung();
  }

  redenerWorkaroung(): void {
    this.renderer.setStyle(this.projectedContent.nativeElement, "font-size", "15");
  }

  ngAfterViewInit() {
    console.log("   Cd2child1Component:AfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("   Cd2child1Component:AfterViewChecked");
  }

  ngOnDestroy() {
    console.log("   Cd2child1Component:ngOnDestroy");
  }

}
