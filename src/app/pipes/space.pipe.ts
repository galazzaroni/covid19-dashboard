import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'space'
})
export class SpacePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/([a-z]+?(?=[A-Z]))/g, '$1 ').replace(/([A-Z]+?(?=[A-Z][a-z]))/g, '$1 ');;
  }

}
