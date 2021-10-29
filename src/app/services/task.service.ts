import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  getTasks(pid: any) {
    return this.http.get(
      `${environment.apiUrl}getallprojecttasksnew/projectid/` + pid
    );
  }
}
