import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: number): any {
    let round= Math.round(value)
    let filedStar='★'.repeat(round);
    let emptyStar='☆'.repeat(5-round);
    return filedStar+emptyStar;
  }

}
