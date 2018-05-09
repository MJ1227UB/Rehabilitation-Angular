import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {MilestoneEntity} from '../entities/milestone.entity';
import {FirestoreModel} from './firestore.model';
import {VisitEntity} from '../entities/visit.entity';
import {s} from '@angular/core/src/render3';

@Injectable()
export class MilestoneService {

  constructor(private angularFireStore: AngularFirestore) { }

  /**
   * Get milestone by id
   * @param {string} milestoneId
   */
  getMilestoneById(milestoneId: string) {
    return this.angularFireStore.collection<MilestoneEntity>(FirestoreModel.MILESTONE_COLLECTION,
      ref => ref.where('uid', '==', milestoneId))
      .valueChanges();
  }

  /**
   * Get all milestones from user
   * @param {string} clientUid
   */
  getMilestonesByClientUid(clientUid: string) {
    return this.angularFireStore.collection<MilestoneEntity>(FirestoreModel.MILESTONE_COLLECTION,
      ref => ref.where('clientUid', '==', clientUid)).valueChanges();
  }

  /**
   * Add milestone to firestore with provided client uid
   * @param clientUid
   * @param {MilestoneEntity} newMilestone
   */
  addMilestoneWithClientUid(clientUid: string, newMilestone: MilestoneEntity) {
    // Create UID for firestore document
    const docUid = this.angularFireStore.createId();
    // Create new doc object (specific to firestore)
    const milestoneDoc = {
      uid: docUid,
      clientUid: clientUid,
      purpose: newMilestone.purpose,
      title: newMilestone.title
    };
    return this.angularFireStore
      .collection<MilestoneEntity>(FirestoreModel.MILESTONE_COLLECTION)
      .ref.doc(docUid).set(milestoneDoc);
  }

  /**
   * Update the provided milestone
   * @param {MilestoneEntity} selectedMilestone
   * @returns {Promise<void>}
   */
  updateMilestone(selectedMilestone: MilestoneEntity) {
    return this.angularFireStore.collection<MilestoneEntity>(FirestoreModel.MILESTONE_COLLECTION)
      .doc(selectedMilestone.uid)
      .set(selectedMilestone, {merge: true});
  }
}