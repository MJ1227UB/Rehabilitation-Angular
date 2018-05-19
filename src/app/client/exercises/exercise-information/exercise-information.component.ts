import {Component, Input, OnInit} from '@angular/core';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {ExerciseService} from '../../../shared/services/exercise.service';
import {Observable} from 'rxjs/Observable';
import {E} from '@angular/core/src/render3';

@Component({
  selector: 'rehab-exercise-information',
  templateUrl: './exercise-information.component.html',
  styleUrls: ['./exercise-information.component.scss']
})
export class ExerciseInformationComponent implements OnInit {

  @Input()
  exerciseUid: string;

  $loadedExercise: Observable<ExerciseEntity>;

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.$loadedExercise = this.exerciseService.getExerciseById(this.exerciseUid);
  }
}
