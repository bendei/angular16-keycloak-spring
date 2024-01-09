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


@Component({
  standalone: true,
  selector: 'cd2child1',
  templateUrl: 'cd2child1.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Cd2child1Component implements OnChanges, DoCheck, OnDestroy, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

  private _nevem: string = "bende";

  get nemem(): string {
    return this._nevem;
  }

  heavyCalculation(): string {
    console.log("heavyCalculation");
    return "heavy calculated";
  }

  @Input() parentCounter: number;
  @ContentChild("footer") projectedContent: ElementRef;

  constructor(public renderer: Renderer2) {
    console.log("   Cd2child1Component:Contructed");
  }

  doNothing(): void {

  }

  ngOnChanges() {
    console.log("   Cd2child1Component:ngOnChanges");
  }

  ngOnInit() {
    console.log("   Cd2child1Component:ngOnInit");
  }

  ngDoCheck() {
    console.log("   CHANGE DETECTION TGRIGGERED - Cd2child1Component:DoCheck");
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
