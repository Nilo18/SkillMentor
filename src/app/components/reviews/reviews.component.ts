import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews: any[] = [
    {
      name: "გიორგი",
      description: "ძალიან კმაყოფილი ვარ, გამოცდილი და თავისი საქმის პროფესიონალია!"
    },
    {
      name: "ნინო",
      description: "მენტორი ძალიან ყურადღებიანი და გულისხმიერია, დამეხმარა სწორი გზის დაჭერაში კარიერულად."
    },
    {
      name: "ლაშა",
      description: "პრაქტიკული რჩევებით სავსე შეხვედრა მქონდა, დიდი მადლობა მხარდაჭერისთვის!"
    }
  ];
}
