import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatseconds'
})
export class FormatsecondsPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    let s;
    let min = Math.floor(value/60)
    let sec = Math.floor(((value/60)-min)*60)
    if (sec < 10) {
      s = "0"+sec
    }
    if (isNaN(min))  {
      return "0:00";
    } else {
      return min + ":" + s;
    }
  }

}
