import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string='';
  @Input() appareilStatus: string= '';
  @Input() indexOfAppereil: number = 0;
  @Input() id: number = 1;

  constructor(private appareilService: AppareilService) { }

  ngOnInit(): void {
  }

  getStatus(){
    return this.appareilStatus;
  }

  getColor(){
    return this.appareilStatus === 'allumé' ? 'green' : 'red';
  }

  onSwitchOn(){
    this.appareilService.switchOnOne(this.indexOfAppereil);
  }

  onSwitchOff(){
    this.appareilService.switchOffOne(this.indexOfAppereil);
  }

}
