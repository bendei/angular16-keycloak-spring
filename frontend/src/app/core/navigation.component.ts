import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ObservableService} from "./observable.service";
import {Observable, Subscription} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy {

  routeParamOne = "44342";
  data = 0;
  subscription!: Subscription;
  observableForAsyncPipe!: Observable<number>;

  constructor(private observableService: ObservableService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscription = this.observableService.subject$.subscribe( (data) =>  {
      this.whenDataChanges(data);
      this.changeDetectorRef.markForCheck();    // to manuylly run CD if onPush

      // async pipehoz: igy nem kell manually trigger CD, és unsubscribe sem kell
      this.observableForAsyncPipe = this.observableService.subject$;
    });
  }

  private whenDataChanges(data: number) {
    this.data = data;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
