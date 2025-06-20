import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MentorsServiceService {

  constructor(private router: Router) { }

  mentors: any[] = [
    {
      id: '1',
      image: "assets/mentor-1.jpg",
      name: "გიორგი",
      position: "Senior Frontend დეველოპერი",
      charge: "100"
    },
    {
      id: '2',
      image: "assets/mentor10.jpg",
      name: "ნინო",
      position: "პროექტების მენეჯერი",
      charge: "60"
    },
    {
      id: '3',
      image: "assets/mentor1.jpg",
      name: "ლუკა",
      position: "ანალიტიკოსი",
      charge: "50"
    },
    {
      id: '4',
      image: "assets/mentor00.jpg",
      name: "ანა",
      position: "UI/UX Designer",
      charge: "70"
    },
    {
      id: '5',
      image: "assets/mentor2.jpg",
      name: "დავით",
      position: "DevOps ხელმძღვანელი",
      charge: "90"
    },
    {
      id: '6',
      image: "assets/mentor03.jpg",
      name: "მარიამ",
      position: "მარკეტინგის მენეჯერი",
      charge: "55"
    },
    {
      id: '7',
      image: "assets/mentor3.jpg",
      name: "სანდრო",
      position: "Backend დეველოპერი",
      charge: "80"
    },
    {
      id: '8',
      image: "assets/mentorBonus03.jpg",
      name: "ეკა",
      position: "HR მენეჯერი",
      charge: "40"
    },
    {
      id: '9',
      image: "assets/mentor5.jpg",
      name: "ნიკა",
      position: "თამაშების დიზაინერი",
      charge: "65"
    },
    {
      id: '10',
      image: "assets/mentor04.jpg",
      name: "სალომე",
      position: "ბიზნეს ანალიტიკოსი",
      charge: "50"
    },
    {
      id: '11',
      image: "assets/mentor50.jpg",
      name: "თამარ",
      position: "Project Manager",
      charge: "60"
    },
    {
      id: '12',
      image: "assets/mentor6.jpg",
      name: "ირაკლი",
      position: "Cloud Architect",
      charge: "110"
    },
    {
      id: '13',
      image: "assets/mentor40.jpg",
      name: "ლია",
      position: "Content Strategist",
      charge: "45"
    },
    {
      id: '14',
      image: "assets/mentor-3.jpg",
      name: "ზვიად",
      position: "Security Analyst",
      charge: "85"
    },
    {
      id: '15',
      image: "assets/mentor80.jpg",
      name: "ქეთევან",
      position: "AI Researcher",
      charge: "120"
    },
    {
      id: '16',
      image: "assets/mentor-2.jpg",
      name: "ლევან",
      position: "Operations Manager",
      charge: "55"
    },
    {
      id: '17',
      image: "assets/mentor9.jpg",
      name: "საბა",
      position: "Mobile აპლიკაციების დეველოპერი",
      charge: "75"
    },
    {
      id: '18',
      image: "assets/mentor02.jpg",
      name: "ნათია",
      position: "გრაფიკული დიზაინერი",
      charge: "60"
    },
    {
      id: '19',
      image: "assets/mentorBonus.jpg",
      name: "ვახტანგ",
      position: "Systems Administrator",
      charge: "70"
    },
    {
      id: '20',
      image: "assets/mentorBonus02.jpg",
      name: "ელენე",
      position: "Customer Success Manager",
      charge: "50"
    }
  ]

    getMentorsByAmount(amount: number): any[] {
      return this.mentors.slice(0, amount);
    }

    getAllMentors(): any[] {
      const stored = localStorage.getItem('mentorsBase');
      const newMentors = stored ? JSON.parse(stored) : [];
      return [...this.mentors, ...newMentors];
    } 

    getMentorById(id: string) {
      return this.getAllMentors().find(m => m.id == id);
    }

    selectMentor(mentor: any) {
      localStorage.setItem('selectedMentor', JSON.stringify(mentor))
      this.router.navigate(['/mentor', mentor.id]);
    }

    searchMentorByPosition(position : string) {
      return this.mentors.find(mentor => mentor.position.toLowerCase() === position.toLowerCase())
    }
}
