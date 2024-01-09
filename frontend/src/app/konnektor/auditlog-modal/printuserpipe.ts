import { Pipe } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'printuser',
  pure: true
})
export class PrintuserpipePipe {

  transform(username: string) {
    console.log("&&&&&&&&&&&&&&&& PrintuserpipePipe");
    return username + "....";
  }


}
