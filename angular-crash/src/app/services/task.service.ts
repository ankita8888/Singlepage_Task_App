import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Task } from 'src/app/Task'; 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL = 'http://localhost:9000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<[]>(this.apiURL);
  }

  getTask(_id: number): Observable<Task>{
    const url = `${this.apiURL}/${_id}`;
    return this.http.get<Task>(url);
  }

  deleteTasks(task: Task): Observable<Task>{
    const url = `${this.apiURL}/${task._id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task>{
    const url1 = `${this.apiURL}/${task._id}`;
    //console.log(task)
    return this.http.put<Task>(url1, task, httpOptions);
  }

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.apiURL, task , httpOptions);
  }

  updateTask(_id: number, task: Task): Observable<Task>{
    const url1 = `${this.apiURL}/${task._id}`;
    console.log(task) 
    return this.http.put<Task>(url1, task, httpOptions);
  }
}
