import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ClientEntity} from '../entities/client.entity';
import {FirestoreModel} from './firestore.model';
import {RehabilitationPlan} from '../entities/rehabilitation-plan.entity';
import {e} from '@angular/core/src/render3';

@Injectable()
export class ClientService {

  clients: ClientEntity[];

  constructor(private afs: AngularFirestore) {
  }

  /**
   * Get list of category.
   * @returns {Observable<any[]>}
   */
  getClients() {
    return this.afs.collection<ClientEntity>(FirestoreModel.CLIENTS_COLLECTION,
      ref => ref.orderBy('fullName')).valueChanges();
  }

  /**
   * Get list of category.
   * @returns {Observable<any[]>}
   */
  getClientsPaginated(limit: number, lastClient?: ClientEntity) {
    return this.afs.collection<ClientEntity>(FirestoreModel.CLIENTS_COLLECTION,
      ref => ref.orderBy('fullName').startAt(lastClient.fullName).limit(limit)).valueChanges();
  }

  /**
   * Create new client in the CLIENTS_COLLECTION
   * @returns {Promise<DocumentReference>}
   * @param newClient
   */
  createClient(newClient: ClientEntity) {
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION).doc(newClient.uid).set(newClient);
  }

  // TODO ALH: Keep until epic future functions implementation
  /**
   * Delete provided client
   * @param {ClientEntity} clientToDelete
   * @returns {AngularFirestoreCollection<any>}
   */
  deleteClient(clientToDelete: ClientEntity) {
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION).doc(clientToDelete.uid).delete();
  }

  /**
   * Update client doc on FireStore
   * @param {ClientEntity} clientToUpdate
   * @returns {Promise<void>}
   */
  updateClient(clientToUpdate: ClientEntity) {
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION).doc(clientToUpdate.uid).set(clientToUpdate, {merge: true});
  }

  /**
   * Send updated plan to firestore
   * @param {string} clientId
   * @param {RehabilitationPlan} rehabilitationPlan
   * @returns {Promise<void>}
   */
  updateRehabilitationPlanByClientUid(clientId: string, rehabilitationPlan: RehabilitationPlan) {
    this.afs.collection(FirestoreModel.ASSIGNED_EXERCISES_COLLECTION);
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION)
      .doc(clientId)
      .set(
        {rehabilitationPlan: rehabilitationPlan}
        , {merge: true});
  }

  /**
   * Assign provided exercise id to client
   * @param {string} clientUid
   * @param {string} exerciseUid
   */
  assignExerciseToClient(clientUid: string, exerciseUid: string) {
    this.afs.doc(`${FirestoreModel.ASSIGNED_EXERCISES_COLLECTION}/${exerciseUid}`)
      .set({
        exerciseUid: exerciseUid,
        clientUid: clientUid
      }, {merge: true});
  }

  /**
   * Unassign exercise from client, by provided exerciseId
   * @param exerciseUid
   */
  unassignExerciseFromClient(exerciseUid: string) {
    this.afs.doc(`${FirestoreModel.ASSIGNED_EXERCISES_COLLECTION}/${exerciseUid}`)
      .delete();
  }

  getAssignedExercisesByExerciseId() {
    return this.afs.collection('AssignedExercises', ref =>
      ref.where('exerciseUid', '==', 'b6qp1932W8CiuzEQCy5r')).valueChanges();
  }

  /**
   * Get currentClient by id
   */
  getCurrentClientById(uid: string) {
    return this.afs.collection<ClientEntity>(FirestoreModel.CLIENTS_COLLECTION)
      .doc(uid)
      .valueChanges();
  }
}
