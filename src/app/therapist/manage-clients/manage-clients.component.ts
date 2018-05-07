import {Component, OnInit} from '@angular/core';
import {ClientModel} from '../../shared/entities/client.model';
import {ClientService} from '../../shared/services/client.service';

@Component({
  selector: 'rehab-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {
  selectedClient: ClientModel;

  // TODO ALH: Should be false!
  evaluationMode = true;

  constructor(private clientService: ClientService) { }


  ngOnInit() {
  }

  /**
   * Delete selectedClient!
   */
  deleteClient() {
    this.clientService.deleteClient(this.selectedClient)
      .then(() => {
        this.selectedClient = null;
      });
  }

}
