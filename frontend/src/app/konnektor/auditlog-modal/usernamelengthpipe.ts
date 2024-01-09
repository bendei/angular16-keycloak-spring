import { Pipe } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'usernamelength',
  pure: true
})
export class UsernamelengthpipePipe {

  transform(username: string): number {
    console.log("................................UsernamelengthpipePipe:" + username);
    return this.havyCalculating(username);
    //return username.length;
  }

  private havyCalculating(user: string): number {
    console.log("..................UsernamelengthpipePipe...havyCalculating");
    return user.length;
  }

}
