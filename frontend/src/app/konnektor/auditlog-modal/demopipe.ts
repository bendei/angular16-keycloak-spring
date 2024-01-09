import { Pipe } from '@angular/core';


@Pipe({
  standalone: true,
  name: 'demo'
})
export class DemoPipe {

  transform(username: string): number {
    console.log(".......................pure pipe");
    return username.length;
  }

}
