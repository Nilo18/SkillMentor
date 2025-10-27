import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first, firstValueFrom } from 'rxjs';
import { BackendUrlHolderService } from './backend-url-holder.service';

export interface Experience {
  company: string,
  position: string,
  description: string,
}

export interface Mentor {
  _id: string;
  id: string;
  name: string;
  image: string;
  position: string;
  charge: string;
  experiences: Experience[]
}

interface MentorsResponse {
  mentorsData: Mentor[]
}

@Injectable({
  providedIn: 'root'
})
export class MentorsServiceService {
  private baseURL: string
  constructor(private router: Router, private http: HttpClient, private urlHolder: BackendUrlHolderService) { 
    this.baseURL = this.urlHolder.getBaseURL();
  }

  private mentors: Mentor[]= []

    // Specify the return type so that typescript knows that we're returning an array
    async getMentorsByAmount(amount: number) : Promise<MentorsResponse> {
      // return this.mentors.slice(0, amount);
      try {
        // Wrap amount in curly braces because the backend expects an object, without them amount would be received as undefined
        const res = await firstValueFrom(this.http.post<MentorsResponse>(`${this.baseURL}/mentors/amount`, { amount }))
        return res
      } catch (err) { 
        console.log("Error while trying to get mentors by amount: ", err)
        throw err
      }
    }

    async getAllMentors(): Promise<any> {
      try {
        const res = await firstValueFrom(this.http.get<MentorsResponse>(`${this.baseURL}/mentors`))
        this.mentors = res.mentorsData;
        console.log(res)
        console.log(this.mentors)
        return res
      } catch (err) {
        console.log("Failed to get all the mentors: ", err)
        throw err
      }
    } 

    async getMentorById(id: string) : Promise<Mentor> {
      try {
        const res = firstValueFrom(this.http.get<Mentor>(`${this.baseURL}/mentors/${id}`))
        return res
      } catch (err) {
        console.log('Failed to get mentor by id: ', err)
        throw err
      }
      // return this.getAllMentors().mentorsData.find(m => m.id == id);
    }

    async addMentorExperience(id: string, experience: Experience) {
      try {
        const stored = localStorage.getItem('seefAccessToken')
        const token = stored ? JSON.parse(stored) : null
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })

          const body = {
            id: id,
            experience: experience
          }
          
          const res = await firstValueFrom(this.http.patch(`${this.baseURL}/mentors/experiences`, body, {headers}))
          console.log(res)
        } else {
          console.log("Didn't add the experience beceause the token was missing.")
          return;
        }
      } catch (err) {
        console.log("Failed to add the experience: ", err)
        throw err
      }
    }

    selectMentor(mentor: any) {
      // localStorage.setItem('selectedMentor', JSON.stringify(mentor))
      this.router.navigate(['/mentor', mentor._id]);
    }

    searchMentorByPosition(position : string) {
      return this.mentors.find(mentor => mentor.position.toLowerCase() === position.toLowerCase())
    }
}
