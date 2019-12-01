import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { GuitarServiceService } from '../Services/guitar-service.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private guitarService: GuitarServiceService) { }

  model:string;

  ngOnInit() {
  }
  myDate : Date;
  onAddGuitar(form: NgForm) {
    
    if(!form.valid)
    {
      return;
    }

    console.log(form.value);
    console.log(form.value.date);
    this.myDate = new Date(form.value.date);
    console.log(this.myDate);

    this.guitarService.AddGuitarInformation(form.value.model,
      form.value.colour, form.value.image).subscribe(
        ()=>{
          //do something after out operation has finished
        }
      );
    console.log(form.value);
    form.resetForm();
  }

}
  
