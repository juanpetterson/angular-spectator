import { Component, OnInit, Input } from '@angular/core';
import { Media } from 'app/shared/models/media';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.scss'],
})
export class BillboardComponent implements OnInit {
  @Input() media: Media;

  constructor() {}

  ngOnInit(): void {}
}
