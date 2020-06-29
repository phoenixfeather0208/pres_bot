"strict mode";

const attachment = require("./attachment");

module.exports = {
    name:
    {
        name: "Preston Ong",
        fullName: "Preston Liat Sheng Ong",
        chineseName: "王列圣",
        pinyin: "wáng-liè-shèng",
        printStatement: function() {
            return `My full name is ${this.fullName}, or ${this.chineseName} in Chinese, pronounced: ${this.pinyin}.`
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
        ethnicity: "Chinese Malaysian",
        originStatement: function() {
            return `I was born and raised in the beautiful town of ${this.hometown}, ${this.country}`
        },
        ethnicityStatement: function() {
            return `I identified myself as a proud Chinese Malaysian, I speak Mandarin Chinese.`
        }
    },

    interest: 
    [
        {
            text: "My favorite sitcom is Friends.",
            imgURL: "https://media3.giphy.com/media/lPoxtQlcX30doRbHTN/giphy.gif"
        },
        {
            text: "I like swimming, running and hiking. I enjoy doing outdoor activities. Here's a picture of me by the beautiful Lake Berryessa, California.",
            imgURL: "https://lh3.googleusercontent.com/yPX1SyLTu0a4-8KVZtB87viFxMncTPlu2whYtoGeBUjxQzHU9-sEkpwnH_HpLgUtzPVFXKMvoz90PCNSmSsWPY4nCCZ1br7sNFGDGhKmzKPOWFqC4ZnttGL5xa8pOGxSZGeArqetVGRMkot9ZN7V_t9gNRr3Az2_EHWOKWvOb0Y4evkSw041XQjPBEknVe_czZDQfTOY2UTCjnuoRvriSNz62zkssI4ybegwsgGIXLuG5lMxFnWWORKOFPmqCxKMzeXahOnxPEmLH_4tjAFzsYHBAzqsHfLSFQcpzyWjN-cjAx_fdl_vN9-ZXI820b9Mi2hc9qqvP8e67cdo9iYZPW5uxo3tC87LzPx4TgQQf9PCrXzmE4PLf21kec0-JjZlpVzv3yDnDAWHqauoEqjuJksRriYu7O0bYI92MXk7pMX9CKxyfKCU2vo35S7SVuWHMj9UY4PXaOEp-uFY4Sqk0ojj64zURljVyKoZ94w-SeiQrCs1X8_66_hU496axhmK0BUDXdFI_ic_HIQyq8mtwGiM1dSrbo7BWFWYTSMmqcFlhKXW85Z-YMdMh1xUNAHzN1_KjPdPGX4OAocnwTZfMI7jwrHz9dTDloa4d8gd4SDlUwSbth-OPDsiR4x_Q_Yq3VWXv1vzxT9zVfiG51ntMPZiLWyoAjEjXF0uV6dJBCXnGnXFWCPuJrgdSKNI-Lqu_jda=w3000-h6495-ft"
        },
        {
            text: "My favorite European country is Italy 🇮🇹. (France comes at a close second, I swear :P )",
            imgURL: "https://lh3.googleusercontent.com/cuOBwdBNSiUs5b9GRrJ3LXoDx6CITlhFDBIbFQsp6ShjPZtiCm-bp7d9jMrZaPTDshllVxcQKflsCuR6Huvd1V-KNEstiC7HZuDK3DCMvT06o02X3nx6cfiqfOO9o-UNJ1rfGga70OaVHtMBQDZI_5QCcgAXqo0a5G5t5d5FFqcA12-75kyQPNZPclwzLIJOvQrQS1onlIAmo85hmPt0QerpGZf_RimU2ORGEXReqGsrnNNcGYnL3iO2sdzb3x1EgopbDRPFF-TfSRU_SiEdg7z7drYoGTtq9ifuRwVwMEXryfUTQVX6Uia6vkFB7QqupG1RWIfV5it0LwNWeQCEy7fPVb5QNqhduCH4MZ4S76I_EW1DaeLm2MsSbAgbkoyFLXduY117oUADcEO61kZxzPaUyaMEvVfWDHkngw-NpzNPjQHrHJ7eZcMThh1hznBCjyTrOPZXlVBUrQH8R3alSEav2oMXn2u6Z6zlUVXHAwAg8OZMCZvhUFbaiKBHvsS2KdlkhgtC0W9MNgb0-2O_wxurpAsmjiVL_bHr-aQjlk9NcGSjLcUmVqk7Q_xBl8_uyhPSaz56P8N8XlPtmsEThBFJfaoCbqhMRU07f8ulDCqY71fIPErwojbNcQfEeDs9cqy69IKRtdV1SDPjyd10ksl6Yw_w43Txdw6xe1q3eo9Whqh_AmkyOxqjKhML4A_O1FxZ=w1849-h949-ft"
        },
        {
            text: "I was born with congenital cataract. For that, I went through a surgical procedure which my eyes were implanted with artificial lenses. Interestingly in a way, that makes human Preston partially a bot. What an EYE-OPENING story huh? 👀"
        },
        {
            text: "One of my favorite dish in the world, is the signature Malaysian dish, a.k.a. Nasi Lemak! 🇲🇾",
            imgURL: "https://1.bp.blogspot.com/_wjO9ZSr8ZTA/S8dAoPOHqwI/AAAAAAAAId4/Jzj3FesR28I/s800/SSWF-NasiLemak.jpg"
        },
        {
            text: "I am a meme collector. You should ask me to send memes."
        },
        {
            text: "Because of my condition with my eyes, I am constantly taking extra measures to maintain the wellness of my vision. Funny thing though, I also work with computers almost 24/7. Computers has been proven that it could be detrimental to the human eye after prolonged exposure. What an EYE-rony huh? 👀"
        },
        {
            text: "I have absolutely zero fear of heights. In fact, I hope to plan a trip to skydiving one day. This is a picture of me on top of the world's tallest building, Burj Khalifa, in Dubai. 800 meters (or 2600 ft in American) above ground.",
            imgURL: "https://lh3.googleusercontent.com/0oA7GUkrTXgw0fV88LL_Na7X2n383I5RIO-VQejT_5yqAvae7c66nFy7w3ls_t8tg_Om1E526kOT-Y9iQaBR_5rHgyEpKHplXvTfWI1rrdzgQWYqIB4HMAdm3MY5EOpv-K1tVXcv57xwEQ_ppMUpYSHGXcuOAy_2ksFMyn3ivzUuUesVwKltWbtdw3aBjTcFq2DbRSnSvKJNqegNgHi8a6ZZlX56yDqMb_go73xSi1qQQW2vMOHTQztxvEpPt41Q3-T6-aqHlrrMhx9Q2woxEE0lAqCQos6tCc4Ficx5gZiB2gUps5fVj4ToV25KXq2GGHB9IVoc_Px-leZgAx1r3O5jP3cQKjIowNUUMeOwcfXSXsM1a2i56d5YKvAVU8fNAYdL5E8spI8rQgPx0nbQ7sJSvEU9wYiRyZEpy7C1l03yjMhn398lNX9zjaNPxjAnXzdh5peGNgZ9ifXhucG6SUZ85Xagp3HLkVE8cxrHE6s0wZoxJ__v9k8otvS-QQBzDIQbMUTC-ua9L-aPB2ongwT5WRJ6Leh8BCNXi4EioRFTSocpFsIIltP1xbLlyw1_9o5DIVo-EckVzxSzKXrT2D8Cupobb69CvykrNT55yh5blr4myBCluqTqfkC5mYPYU08PCNTy-oWSoGZHvsAeJ9TmVAE6U-5lewu7wOD1stXM9fz0aSOoKbE3Fysrn4y4e1Pv=w1543-h949-ft"
        },
        {
            text: "My lucky number is 4896, you might have noticed the numbers are included in most of my social media handles. If you say the numbers 4896 out loud in the Chinese dialect of Hokkien (pronounced: see-bae-gow-lut), it is said to describe an object, a person or an activity to be really 'awesome' or 'epic'. Most Chinese Malaysians (or Taiwanese) immediately understood the numbers, because that's how 4896 it is. Another example you can say is, 'I got promoted and I am going to get paid 4896-ly???' (Ok it sounds way better if this were in Chinese, I swear lol)"
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
            language: "C++, C, JavaScript, Swift and Python",
            interest: "Machine Learning, NLP, Blockchain, Full-Stack Web and iOS Software Development",
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
            grad_year: new Date(2020,5,12),
            college: "University of California, Davis",
            major: "Computer Science with Econ minor",
            educationStatement: function() {
                return `I graduated from ${this.college}, on ${this.grad_year.toDateString()}, majored in ${this.major}.`
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
            return `I am proud and happy to announce that ${this.education.educationStatement()}. I am actively seeking in a full time position of full-stack software engineering. :)`
        }
    },

    favoriteMemesURL: [
        "https://i.imgflip.com/46dsxq.jpg",
        "https://scontent.fsac1-2.fna.fbcdn.net/v/t1.0-9/103202898_1973235532815614_8084487426080901849_n.jpg?_nc_cat=109&_nc_sid=9267fe&_nc_ohc=LCGqHO9mKWEAX_d67BZ&_nc_ht=scontent.fsac1-2.fna&oh=2ae711b4ef1531d40e0c5e4b177b0a2f&oe=5F1A3EB2",
        "https://scontent.fsac1-2.fna.fbcdn.net/v/t1.0-9/96238092_1944292952376539_4173439581451976704_n.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_ohc=F6d5eFmGNqEAX97ywbD&_nc_ht=scontent.fsac1-2.fna&oh=50db8efd96b215f62825e1e58fa7b769&oe=5F1CC9D4",
        "https://scontent.fsac1-1.fna.fbcdn.net/v/t1.0-9/95261376_996699880810681_8062892545153171456_n.jpg?_nc_cat=101&_nc_sid=9267fe&_nc_ohc=zIioADZLINoAX9Npx9I&_nc_ht=scontent.fsac1-1.fna&oh=7cdeb371b51e3b40240c6e0093d8b36f&oe=5F1AEC40",
        "https://i.kym-cdn.com/photos/images/original/001/591/277/8f3.jpg",
        "https://scontent.fsac1-1.fna.fbcdn.net/v/t1.0-9/87329811_947786155702054_8177006690881765376_n.jpg?_nc_cat=101&_nc_sid=9267fe&_nc_ohc=jjXbqM3a0pYAX_imH41&_nc_ht=scontent.fsac1-1.fna&oh=259c91ff222407598454f35d57c67044&oe=5F1D8446",
        "https://i.kym-cdn.com/entries/icons/original/000/033/222/moneyprintergobrrr.jpg",
        "https://i.redd.it/3uxn3hznsp751.jpg",
        "https://scontent.fsac1-1.fna.fbcdn.net/v/t1.0-9/99150366_1962510987221402_1871085752129945600_o.jpg?_nc_cat=108&_nc_sid=9267fe&_nc_ohc=024hPipmgZsAX8eCKl0&_nc_ht=scontent.fsac1-1.fna&oh=1252f112d257f53e2e7dfef752c218f3&oe=5F20F322",
        "https://preview.redd.it/gpkzwghyor751.jpg?width=640&crop=smart&auto=webp&s=d52113dcfc5950cb936df3a26f9d379ece3a4f80"
    ],

    url: {
        website: "https://prestonongis.online/",
        facebook: "https://www.facebook.com/prestonong4896/",
        github: "https://github.com/preston4896",
        linkedin: "https://www.linkedin.com/in/prestonong/"
    },

    prestonBio: function() {
        return `Hello, my name is ${this.name.name}, I am ${this.age.getAge()} years old, ${this.origin.originStatement()}. I moved to California pursuing the American dream and wanting to make a social impact with my passion in technology. Aside from my professional interest, I enjoy laughing at memes, watching tv, and spending time outdoors.`
    }
}