import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpamValidatorService {

  constructor() { }

  isRepetitive(value: string): boolean {
    if (!value) return false;
    return /^(.)1{1,}$/.test(value)
  }

  isSpammyText(exp: any): boolean {
    return (
      this.isRepetitive(exp.company) ||
      this.isRepetitive(exp.position) ||
      this.isRepetitive(exp.description) 
    )
  }

  // looksMeaningless(text: string): boolean {
  //   const cleanedText = text.toLowerCase().replace(/[^\wა-ჰ]/g, '')
  //   return nonsenseWords.some((word: string) => cleanedText.includes(word)) // .some() checks if atleast one element in an array passes a test
  // }
}
