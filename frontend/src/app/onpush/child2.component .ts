import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: 'childB',
  templateUrl: './child2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child2Component {

  private _c2text = 'c2textem';

  public get c2text() {
    console.log('--CHILD B-c2text reeavluated--get- ');
    return this._c2text;
  }
  public set c2text(c2: string) {
    console.log('-CHILD B--c2text reeavluated--set- ');
    this._c2text = c2;
  }

}
