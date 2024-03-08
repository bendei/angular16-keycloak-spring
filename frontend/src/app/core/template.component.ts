import {
  Component,
  ElementRef,
  inject, OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer.component";
import {NavigationComponent} from "./navigation.component";
import {ErrorService, MyError} from "./error.service";
import {catchError, filter, from, Observable, of, Subscription, throwError} from "rxjs";
import {ErrorsignalService} from "./errorsignal.service";
import {map} from "rxjs/operators";

@Component({
  standalone: true,
  selector: 'app-template',
  template: `
    <app-navigation></app-navigation>
    <div class="container-fluid mt-3">
      <div #errorStrip style="background-color: aquamarine; display: none">

            @for (msg of errorMessage; track msg.code) {
                Message text: {{msg.message}}, code: {{msg.code}}, statusText: {{msg.statusText}}<br/>
                <b>This message disappears in 4 sec</b>
        }
      <br>
        Error from Signals Service
        {{errorsignalService.errors()}}

        @if(errorsignalService.errors().length > 0) {
          @for (err of errorsignalService.errors(); track err.code) {
          <div>
            {{err.code}} - {{err.statusText}} - {{err.message}}
          </div>
          }
        }
      <br>

      </div>
        <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  imports: [
    RouterOutlet,
    RouterLinkWithHref,
    FooterComponent,
    NavigationComponent
  ]
})
export class TemplateComponent implements OnInit, OnDestroy {

  private renderer = inject(Renderer2);
  private errorService = inject(ErrorService);
  errorsignalService = inject(ErrorsignalService);

  errorMessage: MyError[] = [];
  private subscription!: Subscription;

  @ViewChild("errorStrip") errorStrip!: ElementRef;


  ngOnInit(): void {
    console.log("TemplateComponent ngOnInit() called");




    /////////////////////////////////////////////////////////////////////////////////////////////////
    const user: UserInterface = {
      id: '1',
      name: 'John',
      age: 9,
      getMessage: () => "wwwww"

    };

    const DATA = [ {
      id: '1',
      name: 'John',
      age: 9,
      getMessage: () => "wwwww"
      },
      {
        id: '2',
        name: 'Bende',
        age: 22,
        getMessage: () => "wwwww"

      }
    ];

   from([1, 2, 3, 4, 5]).pipe(map(num => num * 10)).subscribe((res) => console.log(res));



    /////////////////////////////////////////////////////////////////////////////////////////////////










    this.subscription = this.errorService.errors$.subscribe((data) => {
      this.errorMessage = data;
      if(this.errorStrip) {   // kell mert a display:none-nal ki is epitjük a DOM-bol, igy ez még nem létezik
        this.renderer.setStyle(this.errorStrip.nativeElement, "display", "block");
      }
      setTimeout(() => {
        this.errorsignalService.clearErrors();
        this.renderer.setStyle(this.errorStrip.nativeElement, "display", "none");
      }, 20000);
    });
  }




  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


interface UserInterface {
  id: string,
  name: string,
  age: number,
  getMessage: () => string
}
interface ProfileInterface {
  name: string,
  profileUrl: string,
  isActive: boolean
}


