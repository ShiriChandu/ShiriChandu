/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';



@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {
  assignProjList: any = [];
   sb: any= '';


  constructor(private database: DatabaseService,
    private router: Router) {
    this.getAssignedProjects();
  }

  ngOnInit() {
  }
  getAssignedProjects(){
    this.database.getAssignedProjects().then((data) =>{
      this.assignProjList = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.assignProjList.push(data.rows.item(i));
        }
      }

    });
  }

  moveToAddProjects(){
    this.router.navigate(['add-projects']);
  }
  // moveToProjectDetails(){
  //   this.router.navigate(['project-details']);
  // }

  generateui() {
    const content = document.createElement('div');
    content.innerHTML = this.gen();
    document.getElementById('child').appendChild(content);
  }





new1(){
  const jdata = [{"id":"1","task":"KD - 1: Project Commencement","parent_task":"0","has_child":0},{"id":"2","task":"KD - 2: Submission of Inception Report","parent_task":"0","sub":[{"id":"6","task":"Preparation of Inception Report","parent_task":"2","has_child":0},{"id":"7","task":"Submission & Approval of Inception Report","parent_task":"2","has_child":0}],"has_child":1},{"id":"3","task":"KD - 3: Submission of Alignment Report Stage - 1 (Desk Study)","parent_task":"0","has_child":0},{"id":"4","task":"KD - 4: Submission of Alignment Report Stage - 2 (Study on Stereo Satellite Imagery)","parent_task":"0","sub":[{"id":"8","task":"Reconnaissance Survey (Experts)","parent_task":"4","sub":[{"id":"16","task":"Site Survey","parent_task":"8","has_child":0},{"id":"17","task":"Reconnaissance Survey Report","parent_task":"8","has_child":0}],"has_child":1},{"id":"9","task":"SSI Procurement and Processing","parent_task":"4","sub":[{"id":"18","task":"Stereo Satellite Imagery Procurement","parent_task":"9","sub":[{"id":"19","task":"Alignment Shape Files Generation","parent_task":"18","has_child":0},{"id":"20","task":"Filling SSI application","parent_task":"18","has_child":0},{"id":"21","task":"SSI Procurement","parent_task":"18","has_child":0}],"has_child":1},{"id":"22","task":"SSI Processing (500 Mtr Corridor Width)","parent_task":"9","has_child":0},{"id":"23","task":"SSI Processing (Remaining Corridor Width)","parent_task":"9","has_child":0}],"has_child":1},{"id":"10","task":"Structure Span Configuration","parent_task":"4","sub":[{"id":"24","task":"Identification of existing bridge requirement","parent_task":"10","has_child":0},{"id":"25","task":"Cordination for collection of balance bridge drawings","parent_task":"10","has_child":0},{"id":"26","task":"Preparation of bridge inventory details","parent_task":"10","has_child":0},{"id":"27","task":"Preparation of Structure Span Configuration","parent_task":"10","has_child":0}],"has_child":1},{"id":"11","task":"Alignment Design (Opt-1)","parent_task":"4","sub":[{"id":"28","task":"HAL","parent_task":"11","has_child":0},{"id":"29","task":"VAL","parent_task":"11","has_child":0},{"id":"30","task":"ESP\/Yard","parent_task":"11","has_child":0},{"id":"31","task":"CAD","parent_task":"11","has_child":0}],"has_child":1},{"id":"12","task":"Alignment Design (Opt-2)","parent_task":"4","has_child":0},{"id":"13","task":"Alignment Design (Opt-3)","parent_task":"4","has_child":0},{"id":"14","task":"Village Mapping","parent_task":"4","has_child":0},{"id":"15","task":"Stage - 2 Report","parent_task":"4","has_child":0}],"has_child":1},{"id":"5","task":"KD - 5: Traffic Study","parent_task":"0","has_child":0}];

    this.sb = document.querySelector('#list');
return	this.addOptions(jdata);

}

 addOptions(data){
   console .log('data',data);
  const ni = data.length;


  for (let i = 0;  i < ni; i++) {
     if (data[i].parent_task  === 0) {
      //data[i].id data[i].task
       const option = new Option(data[i].task, data[i].id);
       option.setAttribute('class','optionGroup');
       // add it to the list


       this.sb.add(option, undefined);

       if (data[i].has_child  === 1) {
         let subdata: any = '';
        subdata = data[i].sub;
        let ci: any = '';
        ci = subdata.length;
        for (let k = 0;  k < ci; k++) {
           const option1 = new Option(subdata[k].task, subdata[k].id);
           option1.setAttribute('class','optionChild');
           // add it to the list
           this.sb.add(option1, undefined);
        }
       }
    }


  }

  return this.sb;


}


gen(){
 let jdata: any=[];

  '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" crossorigin="anonymous">';

  '  <link rel="stylesheet" type="text/css" href="./mgaccordion.css"/>';

'<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>';
'<script type="text/javascript" src="./mgaccordion.js"></script>';


' <h1>jQuery mgAccordion Plugin Examples</h1>';
' <div id="div_sel"></div>';
     ' <div class="row">';
        '<div class="col-12 d-flex align-content-start justify-items-evenly">';


'        <!-- <div class="col-xs-4"> -->';
'          <nav class="my-menu">';
'            <ul class="my-nav">';

            '</ul>';
'          </nav>';
'        </div>';
'      </div>';
   ' </div>';

' <script>';


	 // eslint-disable-next-line max-len
	 jdata = [{"id":"1","task":"KD - 1: Project Commencement","parent_task":"0","sub":null,"ic_sub":0},{"id":"2","task":"KD - 2: Submission of Inception Report","parent_task":"0","sub":[{"id":"6","task":"Preparation of Inception Report","parent_task":"2","sub":null,"ic_sub":0},{"id":"7","task":"Submission & Approval of Inception Report","parent_task":"2","sub":null,"ic_sub":0}],"ic_sub":1},{"id":"3","task":"KD - 3: Submission of Alignment Report Stage - 1 (Desk Study)","parent_task":"0","sub":null,"ic_sub":0},{"id":"4","task":"KD - 4: Submission of Alignment Report Stage - 2 (Study on Stereo Satellite Imagery)","parent_task":"0","sub":[{"id":"8","task":"Reconnaissance Survey (Experts)","parent_task":"4","sub":[{"id":"16","task":"Site Survey","parent_task":"8","sub":null,"ic_sub":0},{"id":"17","task":"Reconnaissance Survey Report","parent_task":"8","sub":null,"ic_sub":0}],"ic_sub":1},{"id":"9","task":"SSI Procurement and Processing","parent_task":"4","sub":[{"id":"18","task":"Stereo Satellite Imagery Procurement","parent_task":"9","sub":[{"id":"19","task":"Alignment Shape Files Generation","parent_task":"18","sub":null,"ic_sub":0},{"id":"20","task":"Filling SSI application","parent_task":"18","sub":null,"ic_sub":0},{"id":"21","task":"SSI Procurement","parent_task":"18","sub":null,"ic_sub":0}],"ic_sub":1},{"id":"22","task":"SSI Processing (500 Mtr Corridor Width)","parent_task":"9","sub":null,"ic_sub":0},{"id":"23","task":"SSI Processing (Remaining Corridor Width)","parent_task":"9","sub":null,"ic_sub":0}],"ic_sub":1},{"id":"10","task":"Structure Span Configuration","parent_task":"4","sub":[{"id":"24","task":"Identification of existing bridge requirement","parent_task":"10","sub":null,"ic_sub":0},{"id":"25","task":"Cordination for collection of balance bridge drawings","parent_task":"10","sub":null,"ic_sub":0},{"id":"26","task":"Preparation of bridge inventory details","parent_task":"10","sub":null,"ic_sub":0},{"id":"27","task":"Preparation of Structure Span Configuration","parent_task":"10","sub":null,"ic_sub":0}],"ic_sub":1},{"id":"11","task":"Alignment Design (Opt-1)","parent_task":"4","sub":[{"id":"28","task":"HAL","parent_task":"11","sub":null,"ic_sub":0},{"id":"29","task":"VAL","parent_task":"11","sub":null,"ic_sub":0},{"id":"30","task":"ESP\\\/Yard","parent_task":"11","sub":null,"ic_sub":0},{"id":"31","task":"CAD","parent_task":"11","sub":null,"ic_sub":0}],"ic_sub":1},{"id":"12","task":"Alignment Design (Opt-2)","parent_task":"4","sub":null,"ic_sub":0},{"id":"13","task":"Alignment Design (Opt-3)","parent_task":"4","sub":null,"ic_sub":0},{"id":"14","task":"Village Mapping","parent_task":"4","sub":null,"ic_sub":0},{"id":"15","task":"Stage - 2 Report","parent_task":"4","sub":null,"ic_sub":0}],"ic_sub":1},{"id":"5","task":"KD - 5: Traffic Study","parent_task":"0",
   "sub":null,"ic_sub":0}];

		const list = this.addCategories(jdata);









    '</script>';

return this.addCategories(jdata);
}
 fncheckradio(rid){
  // ('#div_sel').html(rid);
  // ('#'+rid).attr('checked','true');
}
   addCategories(obj){

	let	htmlBuilder = '';
		// eslint-disable-next-line @typescript-eslint/prefer-for-of
		for (let i = 0; i < obj.length;i++)
		{
			// eslint-disable-next-line max-len
			htmlBuilder +='<li class="dropdown"><a href="#" onclick="fncheckradio('+obj[i].id+');"><input type="radio" name="tasks" value="'+obj[i].id+'" id="'+obj[i].id+'"> '+obj[i].task+'</a>';

			if (obj[i].ic_sub==1)
			{
				htmlBuilder +='<ul>';
				htmlBuilder += this.addCategories(obj[i].sub);
				htmlBuilder +='</ul>';
			}
			htmlBuilder +='</li>';
		}

		return htmlBuilder;
	 }

}
