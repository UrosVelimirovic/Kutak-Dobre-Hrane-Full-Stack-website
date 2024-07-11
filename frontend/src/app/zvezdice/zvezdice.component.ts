import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-zvezdice',
  templateUrl: './zvezdice.component.html',
  styleUrls: ['./zvezdice.component.css']
})
export class ZvezdiceComponent {
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = Array(5).fill(0);
  temporaryRating = 0;

  ngOnChanges() {
    this.updateStars();
  }

  updateStars() {
    this.stars = this.stars.map((_, i) => {
      const fullStars = this.rating
      if (i < fullStars) return 1;
      return 0;
    });
  }

  rate(rating: number) {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
    this.updateStars();
  }

  setTemporaryRating(rating: number) {
    this.temporaryRating = rating;
    this.stars = this.stars.map((_, i) => {
      if (i < this.temporaryRating) return 1;
      return 0;
    });
  }

  clearTemporaryRating() {
    this.updateStars();
  }
}
