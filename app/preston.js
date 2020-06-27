"strict mode";

const attachment = require("./attachment");

module.exports = {
    name:
    {
        firstName: "Preston",
        fullName: "Preston Liat Sheng Ong",
        chineseName: "王列圣",
        pinyin: "wáng-liè-shèng",
        // statement: `My full name is ${this.name.fullName}, or ${this.name.chineseName} in Chinese. Pronounced: ${this.name.pinyin}.`
    },

    age: 
    {
        dob: new Date(1996,9,6),
        getAge: function(inputDOB) {
            let ageInMilliseconds = Date.now() - inputDOB;
            let ageDate = new Date(ageInMilliseconds);
            return Math.abs(ageDate.getFullYear() - 1970);
        },
        // birthdayStatement: `I was born on ${dob.toDateString()}`,
        // ageStatement: `I am ${getAge(dob)} years old! `
    },

    origin:
    {
        country: "Malaysia",
        hometown: "Malacca Town",
        // originStatement: `I was born and raised in the beautiful town of ${hometown}, ${country}`
    },

    // response objects array
    interest: [
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
    random: [
        
    ],

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

    // longIntro: this.name.statement + " " + this.origin.originStatement + " " + this.age.ageStatement
}