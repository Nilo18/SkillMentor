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
        charge: "100",
        experiences: [
          {
            company: "ExactSoft",
            position: "Frontend დეველოპერი",
            description: "პასუხისმგებელი იყო Vue კომპონენტების შექმნაზე და UI სისტემის ოპტიმიზაციაზე."
          },
          {
            company: "Redberry",
            position: "React დეველოპერი",
            description: "განახორციელა დიზაინის იმპლემენტაცია და API-თან ინტეგრაცია React გარემოში."
          }
        ]
      },
      {
        id: '2',
        image: "assets/mentor10.jpg",
        name: "ნინო",
        position: "პროექტების მენეჯერი",
        charge: "60",
        experiences: [
          {
            company: "EPAM Georgia",
            position: "Project Coordinator",
            description: "მართავდა რამდენიმე ტექნიკური გუნდის ჩაშვებას Agile მიდგომით."
          },
          {
            company: "Bank of Georgia",
            position: "IT პროექტების მენეჯერი",
            description: "გაუძღვა მობ. ბანკინგის განახლებულ ვერსიას — მომხმარებლების რაოდენობა 30%-ით გაიზარდა."
          }
        ]
      },
      {
        id: '3',
        image: "assets/mentor1.jpg",
        name: "ლუკა",
        position: "ანალიტიკოსი",
        charge: "50",
        experiences: [
          {
            company: "TBC",
            position: "Data Analyst",
            description: "აწარმოებდა მომხმარებელთა ქცევის ანალიზს და გენერირებდა BI-ანგარიშებს Power BI-ში."
          },
          {
            company: "Silknet",
            position: "ბიზნეს ანალიტიკოსი",
            description: "დამუშავებული ჰქონდა პროცესების ოპტიმიზაცია და KPI სისტემების დანერგვა."
          }
        ]
      },
      {
        id: '4',
        image: "assets/mentor00.jpg",
        name: "ანა",
        position: "UI/UX Designer",
        charge: "70",
        experiences: [
          {
            company: "Leavingstone",
            position: "UI დიზაინერი",
            description: "დამუშავებული ჰქონდა ვიზუალური სისტემები და სტილგაიდები Web და Mobile პროდუქტებისთვის."
          },
          {
            company: "Flutter Studio",
            position: "UX კვლევითი სპეციალისტი",
            description: "ჩატარა მომხმარებელთა ტესტირებები და შექმნა ინტერფეისის გამარტივებული ვერსიები."
          }
        ]
      },
      {
        id: '5',
        image: "assets/mentor2.jpg",
        name: "დავით",
        position: "DevOps ხელმძღვანელი",
        charge: "90",
        experiences: [
          {
            company: "Ucrosoft",
            position: "System Engineer",
            description: "განახორციელა CI/CD მექანიზმების დანერგვა Jenkins და GitLab–ზე."
          },
          {
            company: "Fintech.ge",
            position: "DevOps Lead",
            description: "კოორდინირებდა DevOps გუნდს და უზრუნველყოფდა სისტემის უწყვეტ ხელმისაწვდომობას."
          }
        ]
      },
      {
        id: '6',
        image: "assets/mentor03.jpg",
        name: "მარიამ",
        position: "მარკეტინგის მენეჯერი",
        charge: "55",
        experiences: [
          {
            company: "Adjarabet",
            position: "Digital მარკეტერი",
            description: "განახორციელა ციფრული კამპანიების ანალიტიკა და Google Ads სტრატეგიების ოპტიმიზაცია."
          },
          {
            company: "Leavingstone",
            position: "Content Manager",
            description: "დაგეგმა და განახორციელა ბრენდირებული შინაარსის სტრატეგიები სხვადასხვა კლიენტისთვის."
          }
        ]
      },
      {
        id: '7',
        image: "assets/mentor3.jpg",
        name: "სანდრო",
        position: "Backend დეველოპერი",
        charge: "80",
        experiences: [
          {
            company: "Bank of Georgia",
            position: "Java დეველოპერი",
            description: "განავითარა შიდა ბანკინგის სერვისები Spring Boot ტექნოლოგიებით."
          },
          {
            company: "Sweeft",
            position: ".NET Developer",
            description: "მუშაობდა API-ების შექმნაზე და მონაცემთა ბაზებთან ინტეგრაციაზე .NET გარემოში."
          }
        ]
      },
      {
        id: '8',
        image: "assets/mentorBonus03.jpg",
        name: "ეკა",
        position: "HR მენეჯერი",
        charge: "40",
        experiences: [
          {
            company: "Tegeta",
            position: "HR Officer",
            description: "განახორციელა შერჩევის და რეკრუტინგის პროცესი ტექნიკური პოზიციებისთვის."
          },
          {
            company: "EPAM Georgia",
            position: "HR მენეჯერი",
            description: "მოამზადა კადრების შეფასების სისტემა და HR ანალიტიკა."
          }
        ]
      },
      {
        id: '9',
        image: "assets/mentor5.jpg",
        name: "ნიკა",
        position: "თამაშების დიზაინერი",
        charge: "65",
        experiences: [
          {
            company: "Pulsar AI",
            position: "Game Designer",
            description: "დააპროექტა თამაშის მექანიკები და ლოგიკა ინტერაქტიული პროდუქტებისთვის."
          },
          {
            company: "Strada",
            position: "Level Designer",
            description: "შექმნა თამაშის დონეები და UI კონცეფციები Unity-ში."
          }
        ]
      },
      {
        id: '10',
        image: "assets/mentor04.jpg",
        name: "სალომე",
        position: "ბიზნეს ანალიტიკოსი",
        charge: "50",
        experiences: [
          {
            company: "Silknet",
            position: "Operations Analyst",
            description: "აწარმოებდა ბიუჯეტირების ანალიზს და ეფექტიანობის მაჩვენებლების შეფასებას."
          },
          {
            company: "Liberty Bank",
            position: "ბიზნეს ანალიტიკოსი",
            description: "განახორციელა ბიზნეს პროცესების დახვეწა და BI სისტემების დანერგვა."
          }
        ]
      },
      {
        id: '11',
        image: "assets/mentor50.jpg",
        name: "თამარ",
        position: "Project Manager",
        charge: "60",
        experiences: [
          {
            company: "EPAM Georgia",
            position: "Team Lead",
            description: "ხელმძღვანელობდა გუნდს Fintech პროექტის ჩაშვებაში, Scrum მეთოდოლოგიით."
          },
          {
            company: "Adjara Group",
            position: "Project Manager",
            description: "განახორციელა ციფრული ინოვაციების დანერგვა სასტუმროების ქსელში."
          }
        ]
      },
      {
        id: '12',
        image: "assets/mentor6.jpg",
        name: "ირაკლი",
        position: "Cloud Architect",
        charge: "110",
        experiences: [
          {
            company: "Amazon AWS",
            position: "Cloud Engineer",
            description: "მუშაობდა cloud ინფრასტრუქტურის შენებაზე და CI/CD პროცესების ავტომატიზაციაზე."
          },
          {
            company: "Silknet",
            position: "Cloud Solutions Architect",
            description: "განახორციელა ჰიბრიდული ინფრასტრუქტურის არქიტექტურა და სერვისების მიგრაცია."
          }
        ]
      },
      {
        id: '13',
        image: "assets/mentor40.jpg",
        name: "ლია",
        position: "Content Strategist",
        charge: "45",
        experiences: [
          {
            company: "Leavingstone",
            position: "Content Creator",
            description: "შექმნა ბრენდირებული სტატიები, სლოგანები და კამპანიის ტექსტები."
          },
          {
            company: "WeAreMarketing",
            position: "Content Lead",
            description: "ხელმძღვანელობდა შინაარსობრივი სტრატეგიის შექმნას საერთაშორისო კლიენტებისთვის."
          }
        ]
      },
      {
        id: '14',
        image: "assets/mentor-3.jpg",
        name: "ზვიად",
        position: "Security Analyst",
        charge: "85",
        experiences: [
          {
            company: "GISS",
            position: "Cybersecurity Specialist",
            description: "განახორციელა ქსელის სკანირება, მოწყვლადობების ანალიზი და PenTest-ები."
          },
          {
            company: "Bank of Georgia",
            position: "Security Analyst",
            description: "გააძლიერა ბანკის IT უსაფრთხოება და შეიმუშავა SOC პროცესები."
          }
        ]
      },
      {
        id: '15',
        image: "assets/mentor80.jpg",
        name: "ქეთევან",
        position: "AI Researcher",
        charge: "120",
        experiences: [
          {
            company: "TBC",
            position: "Machine Learning Engineer",
            description: "განახორციელა კრედიტის რისკების პროგნოზირება ML ალგორითმებით."
          },
          {
            company: "AI Lab Georgia",
            position: "AI Research Fellow",
            description: "შეიმუშავა NLP მოდელები ქართული ენისთვის და ჩაატარა აკადემიური კვლევა."
          }
        ]
      },
      {
        id: '16',
        image: "assets/mentor-2.jpg",
        name: "ლევან",
        position: "Operations Manager",
        charge: "55",
        experiences: [
          {
            company: "Glovo",
            position: "Logistics Supervisor",
            description: "კოორდინირებდა კურიერთა ოპერაციებს და განახორციელა მიწოდების ოპტიმიზაცია."
          },
          {
            company: "Carrefour",
            position: "Operations Manager",
            description: "უზრუნველყო მარაგის მართვა და გაყიდვების პროცესის ოპტიმიზაცია ქსელში."
          }
        ]
      },
      {
        id: '17',
        image: "assets/mentor9.jpg",
        name: "საბა",
        position: "Mobile აპლიკაციების დეველოპერი",
        charge: "75",
        experiences: [
          {
            company: "Sweeft",
            position: "Android Developer",
            description: "განავითარა ნატივ აპლიკაციები Kotlin-ში და დააინტეგრა Firebase სერვისები."
          },
          {
            company: "Leavingstone",
            position: "Flutter Developer",
            description: "დამზადა კროს-პლატფორმული აპლიკაციები Flutter Framework-ზე."
          }
        ]
      },
      {
        id: '18',
        image: "assets/mentor02.jpg",
        name: "ნათია",
        position: "გრაფიკული დიზაინერი",
        charge: "60",
        experiences: [
          {
            company: "White Studio",
            position: "Senior Graphic Designer",
            description: "შექმნა სარეკლამო ბანერები, ბრენდბუქები და სოციალური მედიის ვიზუალები."
          },
          {
            company: "Holmes & Watson",
            position: "Creative Designer",
            description: "განავითარა კრეატიული კონცეფციები და იმუშავა მულტიმედიურ დიზაინზე."
          }
        ]
      },
      {
        id: '19',
        image: "assets/mentorBonus.jpg",
        name: "ვახტანგ",
        position: "Systems Administrator",
        charge: "70",
        experiences: [
          {
            company: "Tegeta Motors",
            position: "IT Support Specialist",
            description: "უზრუნველყო სისტემების ტექნიკური მხარდაჭერა და აღჭურვილობის მოვლა."
          },
          {
            company: "TBC Leasing",
            position: "Systems Administrator",
            description: "განახორციელა სერვერების და ქსელური ინფრასტრუქტურის მონიტორინგი."
          }
        ]
      },
      {
        id: '20',
        image: "assets/mentorBonus02.jpg",
        name: "ელენე",
        position: "Customer Success Manager",
        charge: "50",
        experiences: [
          {
            company: "TNET",
            position: "Client Support Officer",
            description: "მომხმარებელთა დახმარება და უკუკავშირის სისტემის მართვა."
          },
          {
            company: "Rebank",
            position: "Customer Success Manager",
            description: "უზრუნველყო კლიენტების ჩართულობა და წარმატებული პროდუქტის დანერგვა."
          }
        ]
      }
    ];

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
