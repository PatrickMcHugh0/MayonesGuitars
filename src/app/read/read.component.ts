import { Component, OnInit } from '@angular/core';
import { GuitarServiceService } from '../Services/guitar-service.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  MyGuitars: any = [];
  constructor(private guitarService: GuitarServiceService) { }

  ngOnInit() {
    this.guitarService.GetGuitarInformation().subscribe((data) => {
      this.MyGuitars = data.guitars;
      console.log(this.MyGuitars);
    })
  }

  onDelete(id:String){
    console.log("Deleting guitar with id: "+id);
    this.guitarService.DeleteGuitar(id).subscribe(
      ()=>{
        this.ngOnInit();
      }
    );
  }

}
