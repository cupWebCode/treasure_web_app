import { Component, OnInit, HostListener, Input, Output, EventEmitter, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { SquareMouse } from 'src/app/utils/types/square-mouse';
import { ChosenValueDto } from 'src/app/utils/dto/chosenValueDto';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit, OnChanges, OnDestroy {
  @Input() position: string;
  @Input() chosenSquares: ChosenValueDto[];
  @Output() setChosenPosition: EventEmitter<SquareMouse> = new EventEmitter<SquareMouse>();

  private wasChosen = false;
  constructor(private hostElement: ElementRef) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.chosenSquares) {
      this.checkChosenSquare();
    }
  }

  ngOnDestroy() {
    this.wasChosen = false;
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    if (!this.wasChosen) {
      this.wasChosen = true;
      const el = e.target as HTMLElement;
      el.classList.add('chosen');
      const data = {
        [this.position]: e.target as HTMLElement
      };
      this.setChosenPosition.emit(data);
    }
  }

  private checkChosenSquare() {
    const matched = this.chosenSquares.find(el => el.position === this.position);
    if (matched) {
      const elLink = this.hostElement.nativeElement.firstChild;
      elLink.classList.add('chosen');
      
      elLink.classList.add(`chosen_${matched.val}`);
      elLink.innerText = matched.val;
      this.wasChosen = true;
    }
  }
}
