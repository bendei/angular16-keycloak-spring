import {PipeTransform, Pipe} from "@angular/core";

@Pipe({
  name: "puredatepipe",
  pure: true
})
export class PureDatePipe implements PipeTransform {

  transform(datum: Date, ...args: []): any {
  console.log("----PureDatePipe");
    return new Date();

  }

}
