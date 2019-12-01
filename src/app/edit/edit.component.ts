import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {Router, ActivatedRoute} from '@angular/router';
import {GuitarServiceService} from '../Services/guitar-service.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
guitar:any=[];
  constructor(private guitarService:GuitarServiceService, private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.guitarService.GetGuitar(this.route.snapshot.params['id']).subscribe(
      (data) =>{
          this.guitar = data;
          console.log(this.guitar);
      }
    );

  }
  onEditGuitar(form:NgForm){
    console.log(form.value.model);
    this.guitarService.UpdateGuitar(this.guitar._id, form.value.model,
      form.value.colour, form.value.image).subscribe();
  }
}
