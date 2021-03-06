import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {ExerciseEntity} from '../../entities/exercise.entity';

@Injectable()
export class ExerciseService {

  private EXERCISES_COLLECTION = 'Exercises';

  constructor(private angularFireStore: AngularFirestore) {
  }

  /**
   * Get observable list of exercise collection from FireStore
   * @returns {Observable<ExerciseEntity[]>}
   */
  public getExercises() {
    return this.angularFireStore.collection<ExerciseEntity>(this.EXERCISES_COLLECTION,
      ref => ref.orderBy('title')).valueChanges();
  }

  /**
   * Get observable amount exercise collection from FireStore
   * @returns {Observable<ExerciseEntity[]>}
   */
  public getAmountOfExercises(): Observable<number> {
    return this.angularFireStore.collection<ExerciseEntity>(this.EXERCISES_COLLECTION)
      .valueChanges()
      .map(exercises => {
        return exercises.length;
      });
  }

  /**
   * Get paginated observable list of exercise collection from FireStore
   * @returns {Observable<ExerciseEntity[]>}
   */
  public getExercisesPaginated(limit: number, lastExercise?: ExerciseEntity) {
    // Check if last exercise wasn't provided (we paginate from first page)
    if (!lastExercise) {
      return this.angularFireStore.collection<ExerciseEntity>(this.EXERCISES_COLLECTION,
        ref => ref
          .orderBy('title')
          .limit(limit))
        .valueChanges();
      // Paginate, starting after last element on previous page
    } else {
      return this.angularFireStore.collection<ExerciseEntity>(this.EXERCISES_COLLECTION,
        ref => ref
          .orderBy('title')
          .startAfter(lastExercise.title)
          .limit(limit))
        .valueChanges();
    }
  }

  /**
   * Get observable amount exercises in category from FireStore
   * @returns {Observable<ExerciseEntity[]>}
   */
  public getAmountOfExercisesInCategory(categoryName: string): Observable<number> {
    return this.angularFireStore.collection<ExerciseEntity>(this.EXERCISES_COLLECTION,
      ref => ref
        .where('category', '==', categoryName))
      .valueChanges()
      .map(exercises => {
        return exercises.length;
      });
  }

  /**
   * Get observable list of exercise collection in provided category from FireStore
   * @returns {Observable<ExerciseEntity[]>}
   */
  public getExercisesByCategoryNamePaginated(categoryName: string, limit: number, lastExercise?: ExerciseEntity) {
    // Check if last exercise wasn't provided (we paginate from first page)
    if (!lastExercise) {
      return this.angularFireStore.collection<ExerciseEntity>(this.EXERCISES_COLLECTION,
        ref => ref
          .where('category', '==', categoryName)
          .orderBy('title')
          .limit(limit))
        .valueChanges();
    } else {
      // Paginate, starting after last element on previous page
      return this.angularFireStore.collection<ExerciseEntity>(this.EXERCISES_COLLECTION,
        ref => ref
          .where('category', '==', categoryName)
          .orderBy('title')
          .startAfter(lastExercise.title)
          .limit(limit))
        .valueChanges();
    }
  }

  /**
   * Add new exercise
   * @param {ExerciseEntity} newExercise
   * @returns {Promise<DocumentReference>}
   */
  addExercise(newExercise: ExerciseEntity) {
    const id = this.angularFireStore.createId();
    newExercise.uid = id;
    return this.angularFireStore.collection<ExerciseEntity>(this.EXERCISES_COLLECTION)
      .doc(id).set(newExercise);
  }

  /**
   * Delete parsed exercise
   */
  deleteExercise(currentExercise: ExerciseEntity) {
    return this.angularFireStore.collection<ExerciseEntity>(this.EXERCISES_COLLECTION)
      .doc(currentExercise.uid).delete();
  }

  /**
   * Update parsed exercise
   */
  updateExercise(updatedExercise: ExerciseEntity) {
    return this.angularFireStore.collection<ExerciseEntity>(this.EXERCISES_COLLECTION)
      .doc(updatedExercise.uid).set(updatedExercise);
  }

  /**
   * Get exercise by provided id
   * @param {string} exerciseId
   * @returns {Observable<ExerciseEntity>}
   */
  getExerciseById(exerciseId: string): Observable<ExerciseEntity> {
    return this.angularFireStore.collection(this.EXERCISES_COLLECTION)
      .doc(exerciseId).valueChanges();
  }
}
