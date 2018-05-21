import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseEntity} from '../../shared/entities/exercise.entity';
import {ManageExercisesListComponent} from './manage-exercises-list/manage-exercises-list.component';
import {ClientService} from '../../shared/services/firestore/client.service';

@Component({
  selector: 'rehab-manage-exercises',
  templateUrl: './manage-exercises.component.html',
  styleUrls: ['./manage-exercises.component.scss']
})
export class ManageExercisesComponent implements OnInit {
  @ViewChild('exerciseList') childExerciseList: ManageExercisesListComponent;
  selectedCategory: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSelectedCategory(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    // Clear search field
    if (this.childExerciseList) {
      this.childExerciseList.searchValue = ' ';
    }

  }
}
