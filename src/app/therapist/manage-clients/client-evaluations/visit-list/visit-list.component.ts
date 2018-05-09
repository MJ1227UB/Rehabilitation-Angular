import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ClientModel} from '../../../../shared/entities/client.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VisitEntity} from '../../../../shared/entities/visit.entity';
import {RehabModalService} from '../../../../shared/services/rehab-modal.service';
import {V} from '@angular/core/src/render3';

@Component({
  selector: 'rehab-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss']
})
export class VisitListComponent implements OnInit, OnChanges {

  @Output()
  visitSelected = new EventEmitter<VisitEntity>();
  @Output()
  visitAdded = new EventEmitter<VisitEntity>();

  @Input()
  allVisits: VisitEntity[];

  currentVisit: VisitEntity;
  paginatedVisits: VisitEntity[];
  page: number;
  limit = 5;

  constructor(public modalService: RehabModalService) {
  }

  ngOnInit() {
    this.page = 1;
    if (this.allVisits) {
      this.paginatedVisits = this.allVisits.slice(0, this.limit);
    }
  }

  /**
   * Add a new visit to the milestone
   * @param {string} visitNote
   */
  addVisit(visitNote: string) {
    const newVisit: VisitEntity = {
      note: visitNote,
      date: new Date()
    };
    this.visitAdded.emit(newVisit);
  }

  /**
   * Gets the information when the visit is selected
   * @param {ClientModel} visit
   */
  onVisitSelected(visit: VisitEntity) {
    this.visitSelected.emit(visit);
  }

  /**
   * We will paginate
   * @param {number} page
   */
  paginate(page: number) {
    // TODO ALH: Reimplement
    // let latest: any;
    //
    // // Check for first page
    // if (page === 1) {
    //   latest = this.allClients[0];
    //   // Get a hold of last element on current page
    // } else {
    //   latest = this.allClients[(page - 1) * this.limit];
    // }
    //
    // // Paginate from last element on current page
    // this.clientService.getClientsPaginated(this.limit, latest).subscribe(paginatedClients => {
    //   this.paginatedClients = paginatedClients;
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.allVisits) {
      this.paginatedVisits = this.allVisits.slice(0, this.limit);
    }
  }

}