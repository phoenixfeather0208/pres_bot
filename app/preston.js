"strict mode";

const attachment = require("./attachment");

module.exports = {
    name:
    {
        firstName: "Preston",
        fullName: "Preston Liat Sheng Ong",
        chineseName: "王列圣",
        pinyin: "wáng-liè-shèng",
        printStatement: function() {
            return `My full name is ${this.firstName}, or ${this.chineseName} in Chinese, pronounced: ${this.pinyin}.`
        }
    },

    age: 
    {
        dob: new Date(1996,9,6),
        getAge: function() {
            let ageInMilliseconds = Date.now() - this.dob;
            let ageDate = new Date(ageInMilliseconds);
            return Math.abs(ageDate.getFullYear() - 1970);
        },
        birthdayStatement: function() {
            return `I was born on ${ this.dob.toDateString() }`
        },
        ageStatement: function() {
            return `I am ${this.getAge()} years old! `
        }
    },

    origin:
    {
        country: "Malaysia",
        hometown: "Malacca Town",
        originStatement: function() {
            return `I was born and raised in the beautiful town of ${this.hometown}, ${this.country}`
        }
    },

    // response objects array
    interest: 
    [
        {
            "text": "My favorite sitcom is Friends."
        },
        {
            "text": "I like swimming, running and hiking. I enjoy doing outdoor activities."
        },
        {
            "text": "My favorite European country is Italy. (France comes at a close second, I swear :P)"
        },
        {
            "text": "If I were not outdoors, I would be comfortably sitting on my couch, watching TV for countless hours."
        },
        {
            "text": "I am a meme collector. You should check out my meme collection."
        }
    ],

    // response objects array
    random: 
    [
        
    ],

    profession: 
    {
        tech: 
        {
            language: "C++, C, JavaScript, Swift, Python",
            interest: "Machine Learning, NLP, Blockchain, Full-Stack Software Development",
            stack: "ReactJS, NodeJS, NoSQL",
            languageStatement: function() {
                return `I am proficient in ${this.language}. Tech stack: ${this.stack}`;
            },
            interestStatement: function() {
                return `My specific field of interests are: ${this.interest}`;
            }
        },

        education:
        {
            grad_year: new Date(2020,5,13),
            college: "University of California, Davis",
            major: "Computer Science with Econ minor",
            educationStatement: function() {
                return `I graduated from ${this.college}, on ${this.grad_year.toDateString()}, majored in ${this.major}.`
            }
        },

        achievement:
        {
            certificate: "2019 Apple Certified Macintosh Service Exam",
            description: "I am certified to repair all 2019 and previous Mac Computers.",
            achievementStatement: function() {
                return `I passed the ${this.certificate}. In other words, ${this.description}! 👨‍💻`
            }
        },

        elevator_pitch: function() {
            return `I am proud and happy to announce that ${this.education.educationStatement()}. I am actively seeking in the role of full-stack software engineering. Select an option, or you can ask me questions about my favorite stacks or my interest in tech.`
        }
    },

    favoriteMemesURL: [
        "https://i.imgflip.com/46dsxq.jpg",
        "https://scontent.fsac1-2.fna.fbcdn.net/v/t1.0-9/103202898_1973235532815614_8084487426080901849_n.jpg?_nc_cat=109&_nc_sid=9267fe&_nc_ohc=LCGqHO9mKWEAX_d67BZ&_nc_ht=scontent.fsac1-2.fna&oh=2ae711b4ef1531d40e0c5e4b177b0a2f&oe=5F1A3EB2",
        "https://scontent.fsac1-2.fna.fbcdn.net/v/t1.0-9/96238092_1944292952376539_4173439581451976704_n.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_ohc=F6d5eFmGNqEAX97ywbD&_nc_ht=scontent.fsac1-2.fna&oh=50db8efd96b215f62825e1e58fa7b769&oe=5F1CC9D4",
        "https://scontent.fsac1-1.fna.fbcdn.net/v/t1.0-9/95261376_996699880810681_8062892545153171456_n.jpg?_nc_cat=101&_nc_sid=9267fe&_nc_ohc=zIioADZLINoAX9Npx9I&_nc_ht=scontent.fsac1-1.fna&oh=7cdeb371b51e3b40240c6e0093d8b36f&oe=5F1AEC40",
        "https://i.kym-cdn.com/photos/images/original/001/591/277/8f3.jpg",
        "https://scontent.fsac1-1.fna.fbcdn.net/v/t1.0-9/87329811_947786155702054_8177006690881765376_n.jpg?_nc_cat=101&_nc_sid=9267fe&_nc_ohc=jjXbqM3a0pYAX_imH41&_nc_ht=scontent.fsac1-1.fna&oh=259c91ff222407598454f35d57c67044&oe=5F1D8446"
    ],

    url: {
        website: "https://prestonongis.online/",
        facebook: "https://www.facebook.com/prestonong4896/",
        github: "https://github.com/preston4896",
        linkedin: "https://www.linkedin.com/in/prestonong/"
    },

    prestonBio: function() {
        return `Hello, my name is ${this.name.firstName}, I am ${this.age.getAge()} years old, ${this.origin.originStatement()}. I moved to California pursuing the American dream and wanting to make a social impact with my passion in technology. Aside from my professional interest, I enjoy laughing at memes, watching tv, and spending time outdoors.`
    }
}