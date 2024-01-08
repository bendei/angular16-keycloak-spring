import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit, Input, ContentChild, ElementRef, Renderer2
} from "@angular/core";


@Component({
  selector: 'cd1child1',
  templateUrl: 'cd2child1.component.html'
})
export class Cd2child1Component implements OnChanges, DoCheck, OnDestroy, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

  @Input() parentCounter: number;
  @ContentChild("footer") projectedContent: ElementRef;

  constructor(public renderer: Renderer2) {
    console.log("   Cd2child1Component:Contructed");
  }

  ngOnChanges() {
    console.log("   Cd2child1Component:ngOnChanges");
  }

  ngOnInit() {
    console.log("   Cd2child1Component:ngOnInit");
  }

  ngDoCheck() {
    console.log("   Cd2child1Component:DoCheck");
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
