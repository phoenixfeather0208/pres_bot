"strict mode";

// This module contains Preston's personal information.

module.exports = {
    name:
    {
        name: "Preston Ong",
        fullName: "Preston Liat Sheng Ong",
        chineseName: "王列圣",
        pinyin: "wáng-liè-shèng",
        printStatement: function() {
            return `My full name is ${this.fullName}, and ${this.chineseName} in Chinese, pronounced: ${this.pinyin}.`
        }
    },

    age: 
    {
        dob: new Date(1996,8,6), // note: month begins at 0. January = 0, February = 1, and so on...
        getAge: function() {
            let ageInMilliseconds = Date.now() - this.dob;
            let ageDate = new Date(ageInMilliseconds);
            return Math.abs(ageDate.getFullYear() - 1970);
        },
        birthdayStatement: function() {
            return `I was born on ${this.dob.toDateString() } 👶`
        },
        ageStatement: function() {
            return `I am ${this.getAge()} years old! `
        }
    },

    origin:
    {
        country: "Malaysia",
        hometown: "Malacca Town",
        ethnicity: "Chinese Malaysian",
        originStatement: function() {
            return `I was born and raised in the beautiful town of ${this.hometown}, ${this.country} 🇲🇾`
        },
        ethnicityStatement: function() {
            return `I identified myself as a proud ${this.ethnicity}, I speak fluent Mandarin Chinese, English and learning French.`
        }
    },

    interest: 
    [
        {
            text: "My favorite sitcom of all time is Friends. Hands down!",
            imgURL: "https://drive.google.com/uc?export=view&id=1YCZb7ObRDbBz33O8j9WhcMefKrVNYPsB"
        },
        {
            text: "I like swimming, running and hiking. I enjoy doing outdoor activities. Here's a picture of me by the beautiful Lake Berryessa, California.",
            imgURL: "https://drive.google.com/uc?export=view&id=1Z7MIBdUO7uGvqTaU9CoLQdIx6yEMjE2h"
        },
        {
            text: "My favorite European country is Italy 🇮🇹. (France comes at a close second, I swear :P )",
            imgURL: "https://drive.google.com/uc?export=view&id=1rlDzYCNeMB9gn5tzfCci3IIx3x1_P4oX"
        },
        {
            text: "I was born with congenital cataract. I went through a surgical procedure which my eyes were implanted with artificial lenses. Interestingly in a way, that makes human Preston partially a bot. What an EYE-OPENING story huh? 👀"
        },
        {
            text: "One of my favorite dish in the world, is the signature Malaysian dish, a.k.a. Nasi Lemak! 🇲🇾",
            imgURL: "https://drive.google.com/uc?export=view&id=1cjXWc2dKvTyuhxB0ZplCkZvDnwI0Mful"
        },
        {
            text: "Because of the condition with my eyes, I am constantly taking extra measures to maintain the wellness of my vision. Funny thing though, I also work with computers almost 24/7, which has been proven that it could be detrimental to the human eye after prolonged exposure. Maybe I should switch careers huh? What an EYE-rony! 👀"
        },
        {
            text: "I have absolutely zero fear of heights. In fact, I hope to plan a trip to skydiving one day. This is a picture of me on top of the world's tallest building, Burj Khalifa, in Dubai. 800 meters (or 2600 ft) above ground.",
            imgURL: "https://drive.google.com/uc?export=view&id=16PLi113irMAKjj5Lu-Ccd3Acz0mT4a4U"
        },
        {
            text: "My lucky number is 4896, you might have noticed the numbers in most of my social media handles. If you say the numbers 4896 out loud in the Chinese dialect of Hokkien (pronounced: see-bae-gow-lut), it is a slang said to describe an object, a person, an action (pretty much anything else) to be really 'awesome', 'epic', 'strong and powerful' (but can also be used negatively). Most Chinese Malaysians (or Taiwanese) immediately understood the numbers, because that's how 4896 it is! An example you can say is, 'I got promoted and I am going to get paid 4896-ly???' (Ok it sounds way better if this were in Chinese, I swear lol)"
        },
        {
            text: "I travel a lot. The only continents left that I am yet to be visiting are Africa and South America. ✈️"
        }
    ],

    // // response objects array
    // random: 
    // [
        
    // ],

    profession: 
    {
        tech: 
        {
            language: "C++, C, JavaScript, Swift, Solidity and Python",
            interest: "Machine Learning, NLP, Blockchain, Full-Stack Web and iOS Software Development",
            stack: "ReactJS, NodeJS, NoSQL, Truffle Framework",
            languageStatement: function() {
                return `I am proficient in ${this.language}. Tech stack: ${this.stack}`;
            },
            interestStatement: function() {
                return `My specific field of interests are: ${this.interest}`;
            }
        },

        education:
        {
            grad_year: new Date(2020,5,12),
            college: "University of California, Davis",
            major: "Computer Science with an Econ minor",
            educationStatement: function() {
                return `I graduated from ${this.college}, on ${this.grad_year.toDateString()}, majored in ${this.major} 🎓 #GoAggies.`
            }
        },

        achievement:
        {
            certificate: "2019 Apple Certified Macintosh Service Exam",
            description: "I am certified to repair all 2019 and previous Mac Computers",
            achievementStatement: function() {
                return `I passed the ${this.certificate}. In other words, ${this.description}! 👨‍💻`
            }
        },

        elevator_pitch: function() {
            return `I am proud that ${this.education.educationStatement()}. I am actively seeking in a full time role at full-stack software engineering. As an aspiring software engineer, my goal is to make technology to become more accessible and user-friendly. :)`
        }
    },

    favoriteMemesURL: [
       "https://drive.google.com/uc?export=view&id=1SvThhSM1AGZVQIJk5HQpi8eWHakycSv0",
       "https://drive.google.com/uc?export=view&id=1kh-p6rZxVgmhrXxCuVtv6WxqMVF-lxP7",
       "https://drive.google.com/uc?export=view&id=1PmOQkuy2OKsFE7zXVvjljj7gSoKp5dHn",
       "https://drive.google.com/uc?export=view&id=1YRvaJ29iiuOVoLWOd4MrJk5KyLgxV5Uc",
       "https://drive.google.com/uc?export=view&id=1_iXxKh8S2z1EW796kKvfT9gxKsawPiHt",
       "https://drive.google.com/uc?export=view&id=1i58h69KFQjI10IB_6ScOt3YIbfuOKI4V"
    ],

    url: {
        website: "https://prestonong.com/",
        facebook: "https://www.facebook.com/prestonong4896/",
        github: "https://github.com/preston4896",
        linkedin: "https://www.linkedin.com/in/prestonong/"
    },

    prestonBio: function() {
        return `Hello, my name is ${this.name.name}, I am ${this.age.getAge()} years old, ${this.origin.originStatement()}. I moved to California pursuing the American dream and wanting to make a social impact with my passion in technology. Aside from my professional interest, I enjoy laughing at memes, watching tv, and spending time outdoors.`
    }
}