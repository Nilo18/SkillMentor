import { Component } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Experience, MentorsServiceService } from '../../services/mentors-service.service';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { BackendUrlHolderService } from '../../services/backend-url-holder.service';
import { firstValueFrom } from 'rxjs';

// Describes the allowed actions for ChangedExperience
export enum ExperienceAction {
  Update = 'update',
  Remove = 'remove'
}

export interface ChangedExperience {
  _id: any,
  action: ExperienceAction,
  data?: Experience
}

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrl: './mentor.component.scss'
})

export class MentorComponent {
  selectedMentor: any;
  // descriptionIsLong : boolean = false;
  shouldBeAbleToDelete : boolean = false // A flag to control the data which the current user is supposed to delete
  experienceWasDeleted : boolean = false
  currentUser : any;
  mentorsBaseLocal : any[] = []
  isLoading: boolean = true
  decodedToken!: any
  experiencesLocal: Experience[] = [] // This array is to display all the experiences
  topExperiences: Experience[] = [] // This array is used to display top 3 pinned experiences on the main page
  showPinModal: boolean = false;
  showFullPinInfo: boolean[] = []; // A flag to control pin full visibility
  changesArr: ChangedExperience[] = []
  spliceCounter: number = 0
  // localStorage is used for this counter to make sure that experiences are still selectable even after unselecting them all
  stored: string | null = localStorage.getItem('availableTopSlots')
  availableTopSlots: number = this.stored? JSON.parse(this.stored) : 0

  constructor (private route: ActivatedRoute, private mentorsService: MentorsServiceService, 
  private http: HttpClient, private urlHolder: BackendUrlHolderService) {}

  async ngOnInit() {
    const token = this.mentorsService.retrieveToken()
    if (token) {
      this.decodedToken = jwtDecode<any>(token)
    }
    this.route.params.subscribe(async (params) => {
      try {
        const id = params['id'];
        this.selectedMentor = await this.mentorsService.getMentorById(id); 
        console.log("The mentor is: ", this.selectedMentor)
        // If the user viewing the page is logged in, grant them full control by fully utilizing their experiences array
        if (this.decodedToken && this.selectedMentor.id === this.decodedToken.id) {
          // Copy the experiences to a local array and iterate over that later on in HTML
          // This will allow for live removal of experiences from the page without using websockets or observables
          // One potential downside to this could've been that there might've been too many experiences
          // which would overload the local array, but a single mentor will have to pin only 3 of their top experiences
          // on the page (Similar to how GitHub pins only 6 repos on the profile page)
          this.experiencesLocal = this.selectedMentor.experiences
          this.shouldBeAbleToDelete = true
        }
        // If the user viewing the page is NOT logged in, only show top 3 of their experiences 
        else {
          for (let experience of this.selectedMentor.experiences) {
            // Only move 3 marked experiences to topExperiences
            if (experience.isOnTop && this.spliceCounter < 3) {
              this.topExperiences.push(experience)
              this.spliceCounter++
            }
          }
          // this.topExperiences = this.selectedMentor.experiences.slice(0, 3)
          console.log("Initialized top experiences on default:", this.topExperiences)
          this.shouldBeAbleToDelete = false
        }
        console.log("The experiencesLocal array is: ", this.experiencesLocal)
        // Move first 3 experiences into the top experiences
        // If the user is not logged in, experiencesLocal will be empty and thus nothing will be pushed into it
        for (let experience of this.experiencesLocal) {
          // Only move 3 marked experiences to topExperiences
          if (experience.isOnTop && this.spliceCounter < 3) {
            this.topExperiences.push(experience)
            this.spliceCounter++
          }
        }
         // Initialize the pin flags as false
        this.showFullPinInfo = this.experiencesLocal.map(() => false)
        // console.log(this.selectedMentor)
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    });
  }

  pushToChangesArr(id: any, action: ExperienceAction, data?: Experience) {
    const existingIndex = this.changesArr.findIndex(exp => exp._id === id);
    console.log(`existingIndex: ${existingIndex}`)
    const experience = data || this.experiencesLocal.find(experience => experience._id === id)
    console.log("The experience is: ", experience)

    if (!experience) {
      console.log(`Experience with id ${id} not found.`);
      return;
    }

    // If the given object hasn't been added to the changes array, add it
    if (existingIndex === -1) {
      this.changesArr.push({
        _id: id,
        action: action,
        data: experience
      });
    }
    // Otherwise replace it
    else {
      this.changesArr[existingIndex] = {
        _id: id,
        action: action,
        data: experience
      };
    }
    console.log("Changed the changesArr: ", this.changesArr)
  }

  async removeExperience(experienceId: any) {
    // const mentorId = this.selectedMentor._id
    // Remove the experience both from the local array and the database
    const indexToRemove = this.experiencesLocal.findIndex(experience => experience._id === experienceId)
    const removedItem = this.experiencesLocal[indexToRemove]
    this.experiencesLocal.splice(indexToRemove, 1)
    this.pushToChangesArr(experienceId, ExperienceAction.Remove, removedItem)
    // If all experiences have been deleted, reset the top slot count to 0
    if (this.experiencesLocal.length === 0) {
      this.availableTopSlots = 0
      localStorage.setItem('availableTopSlots', JSON.stringify(this.availableTopSlots))
    }
    // this.changesArr.push({
    //   _id: mentorId,
    //   action: 'delete',
    //   data: this.experiencesLocal[indexToRemove]
    // })
    
    // const indexInTop = this.topExperiences.findIndex(experience => experience._id === experienceId)
    // this.topExperiences.splice(indexInTop, 1)
    // await this.mentorsService.removeMentorExperience(mentorId, experienceId)
  } 

  toggleTop(experienceId: any) {
    const experienceIndex = this.experiencesLocal.findIndex(experience => experience._id === experienceId) 
    this.experiencesLocal[experienceIndex].isOnTop = !this.experiencesLocal[experienceIndex].isOnTop 
    if (!this.experiencesLocal[experienceIndex].isOnTop) {
      this.availableTopSlots++
      localStorage.setItem('availableTopSlots', JSON.stringify(this.availableTopSlots))
    } else {
      this.availableTopSlots--
      localStorage.setItem('availableTopSlots', JSON.stringify(this.availableTopSlots))
    }
    this.pushToChangesArr(experienceId, ExperienceAction.Update)
  }

  checkForFreeTopSlots(experience: Experience) {
    return (experience.isOnTop || this.availableTopSlots > 0) ? false : true
  }

  toggleModal(val: boolean) {
    this.showPinModal = val;
    // this.showFullPinInfo = false;
    if (!val) {
      // Reset the changesArr where exiting the modal to prevent stale data in the array and thus bugs
      this.changesArr = []
      console.log("Reset the changesArr: ", this.changesArr)
      // this.experiencesLocal = this.experiencesLocal
      // window.location.reload()
    }
  }

  togglePinFullVisibility(index: number) {
    this.showFullPinInfo[index] = !this.showFullPinInfo[index]
  }

  async saveChanges() {
    try {
      const mentorId = this.selectedMentor._id
      const token = this.mentorsService.retrieveToken()
      const baseURL = this.urlHolder.getBaseURL();
      const headers = this.mentorsService.formatTokenAsHeader(token)
      const body = {
        mentorId: mentorId,
        changes: this.changesArr
      }
      const res = await firstValueFrom(this.http.put(`${baseURL}/mentors/experiences`, body, {headers}))
      if (res) {
        this.toggleModal(false)
        window.location.reload()
      } 
    } catch (err) {
      console.log("Couldn't save changes: ", err)
    }
  }
}
