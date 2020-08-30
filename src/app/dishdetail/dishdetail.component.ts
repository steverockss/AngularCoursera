import { Component, OnInit, Input, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
})
export class DishdetailComponent implements OnInit {
  commentForm: FormGroup;
  comment: Comment;
  dishIds: string[];
  dish: Dish;
  prev: string;
  next: string;
  errMess: string;
  dischCopy: Dish;
  formErrors = {
    author: '',
    comment: '',
  };
  validationMessages = {
    author: {
      required: `The author's name is required.`,
      minlength: `The author's name should at least have 2 characters`,
    },
    comment: {
      required: 'The comment is required',
    },
  };
  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseUrl') private BaseURL
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe(
        (dish) => {
          this.dish = dish;
          this.dischCopy = dish;
          this.setPrevNext(dish.id);
        },
        (errmess) => (this.errMess = <any>errmess)
      );
  }

  createForm(): void {
    //author, rating and comment.
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: ['5'],
      comment: ['', [Validators.required]],
    });
    this.commentForm.valueChanges.subscribe((data) => {
      this.onValueChanged(data);
    });
    this.onValueChanged();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + (index + 1)) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.comment = this.commentForm.value;
    console.log(this.comment);

    this.comment.date = new Date().toISOString();
    //this.dish.comments.push(this.comment);
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5,
    });
    this.commentForm.reset();
    this.dischCopy.comments.push(this.comment);
    this.dishService.putDish(this.dischCopy).subscribe(
      (dish) => {
        this.dish = dish;
        this.dischCopy = dish;
      },
      (errmess) => {
        this.dish = null;
        (this.dischCopy = null), (this.errMess = <any>errmess);
      }
    );
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
