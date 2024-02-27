import {Directive, DoCheck, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {ObjectForDirective} from "./auditlog.component";


@Directive({
  selector: '[auditlog]',
  standalone: true,

})
export class AuditlogDirective implements DoCheck, OnChanges, OnInit {

  // host eleme által átadott parames
  @Input('auditlog') atadottPrimitive = '';
  @Input('objectForDirective') objectForDirective!: ObjectForDirective;

  // hier wir haben ein directive class property, was wird an das Host Element class property binden und dann setzten wird seinen Wert
  @HostBinding('class') class = "fontuserItalic";
 // @HostBinding('class') get class() {return "fontuserItalic"}
  @HostBinding('style') style = "border: 1px solid #ccc";
  //@HostBinding('style.display') isVisible= "inline";
  // das geleich mit dynamischen Wertsetzung

  // directen Zugriff auf dem Host-Element
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.color = 'red';

  }



  // ez mindig lefut!!!
  ngDoCheck(): void {
    console.log("ngDoCheck atadott: " + this.atadottPrimitive);
  }

  // nyilván egy get() metódussal is lefigyelhetnénk, mikor a CD updateli a z input prop értékét
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges atadott Đirectivában kiolvasott érték: " + this.objectForDirective.age);
  }

  ngOnInit(): void {
    //this.class = "fontuserItalic"
  }



}
