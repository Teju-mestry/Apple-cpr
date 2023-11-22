import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cprForm : FormGroup = new FormGroup({
    hf_request: new FormControl(''),
    dev: new FormControl(''),
    prod: new FormControl(''),
    sre: new FormControl('')
  });
  development_phase = 'hf';
  hf_request = {
    hf_request_title : '',
    approvals:{
      dev:false,
      prod:false,
      sre:false
    },
    qa_status : ''
  };
  deployed_on_prod = false;
  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.cprForm = this.formBuilder.group({
      hf_request: [''],
      dev: ['decline'],
      prod: ['decline'],
      sre: ['decline']
    });
  }

  hfSubmit(){
    /*Here call an api for hf request by providing 
    below data and after requesting move to next phase*/

    this.hf_request['hf_request_title'] = this.cprForm.value.hf_request

    //After successful api response
    this.development_phase = 'dev'
  }
  devSubmit(){
    /*Here call an api for submitting dev/prod/sre approvals 
     and after submitting move to next phase*/

     this.hf_request['approvals']['dev'] = this.cprForm.value.dev
     this.hf_request['approvals']['sre'] = this.cprForm.value.sre
     this.hf_request['approvals']['prod'] = this.cprForm.value.prod

     //After successful api response
     this.development_phase = 'qa'
  }

  qaSubmit(qa_status : string){

      /*Here call an api to update qa status 
     and move to next phase*/

    this.hf_request['qa_status'] = qa_status

     //After successful api response
    this.development_phase = 'prod'
  }

  deployToProd(){
    /*Here we will deploy it with all hq request data*/
    console.log(this.hf_request)
    this.deployed_on_prod = true;
  }
}
