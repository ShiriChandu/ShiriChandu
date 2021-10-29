import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/project.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {

  assignProjList: any = [];


  constructor(private activatedRoute: ActivatedRoute,
    private database: DatabaseService) {
      this.activatedRoute.paramMap.subscribe(paraMap =>{
        if(!paraMap.has('projectId')) {
          // redirect
          return;
        }
        const projectId = paraMap.get('projectId');
        this.getAssignedProjectsById(projectId);


      });

    }

  ngOnInit() {

  }



  getAssignedProjectsById(projectId: string){
    this.database.getAssignedProjectsById(projectId).then((data) =>{
      this.assignProjList = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.assignProjList.push(data.rows.item(i));
        }
      }

    });
  }
}
