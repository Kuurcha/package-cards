import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NpmPackage } from "../model/npm-package";

@Injectable({
  providedIn: "root",
})
export class PackageService {
  private baseUrl: string = "http://localhost:3000/packages";
  constructor(private http: HttpClient) {}

  getAll(): Observable<NpmPackage[]> {
    return this.http.get<NpmPackage[]>(`${this.baseUrl}`);
  }

  get(id: string): Observable<NpmPackage[]> {
    return this.http.get<NpmPackage[]>(`${this.baseUrl}/${id}`);
  }

  getDepenencies(id: string): Observable<NpmPackage[]> {
    return this.http.get<NpmPackage[]>(`${this.baseUrl}/${id}/dependencies`);
  }
}
