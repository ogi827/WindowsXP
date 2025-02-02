import apps from "./apps";
import characters from "./characters";
import websites from "./websites";
import profilePictures from "./profilePictures";

const adam = characters.find((char) => char.id === "adam");

export default {
  avatar: profilePictures[0],
  apps: apps.map((app) => app.id),
  desktop: {
    background: "",
    icons: [
      {
        appId: "explorer",
        meta: {
          title: "My Computer",
          directory: ""
        }
      },
      {
        appId: "word-clock"
      },
      {
        appId: "spotify"
      },
      {
        appId: "internet",
        meta: {
          title: "not spam!",
          data: {
            address: "tour.windows.com"
          }
        }
      }
      // {
      //   appId: "notepad",
      //   meta: {
      //     title: "About Me",
      //     data: {
      //       // content: "custom param to window",
      //       file: "about.txt"
      //     }
      //   }
      // }
    ]
  },
  windows: [
    // {
    //   appId: "messenger",
    //   meta: {
    //     title: adam.name,
    //     data: { characterId: adam.id }
    //   }
    // }
  ],
  notifications: [
    {
      appId: "messenger",
      appMeta: {
        title: adam.name,
        data: { characterId: adam.id }
      },
      title: "Adam",
      message: "Don't click this!"
    }
  ],
  files: [
    {
      name: "about.txt",
      content: `After starting out in IT as a support technician, I soon realised a true passion for web development through hacking away at open source examples, discovering the possibilities of web technologies and unlocking key problem solving abilities along the way. I work mainly as a backend php developer using Laravel and my experience includes researching, designing, testing, implementing and maintaining internal and external web applications for corporations, small and medium businesses. I also enjoy frontend development and design work using frameworks like Vue and Tailwind. I have a keen eye for detail and usability and my work is standards compliant and accessible.`
    },
    {
      name: "about2.txt",
      content: `After starting out in IT as a support technician, I soon realised a true passion for web development through hacking away at open source examples, discovering the possibilities of web technologies and unlocking key problem solving abilities along the way.
    I work mainly as a backend php developer using Laravel and my experience includes researching, designing, testing, implementing and maintaining internal and external web applications for corporations, small and medium businesses.
    I also enjoy frontend development and design work using frameworks like Vue and Tailwind. I have a keen eye for detail and usability and my work is standards compliant and accessible.`
    },
    {
      name: "about3.txt",
      content: `After starting out in IT as a support technician, I soon realised a true passion for web development through hacking away at open source examples, discovering the possibilities of web technologies and unlocking key problem solving abilities along the way.
    I work mainly as a backend php developer using Laravel and my experience includes researching, designing, testing, implementing and maintaining internal and external web applications for corporations, small and medium businesses.
    I also enjoy frontend development and design work using frameworks like Vue and Tailwind. I have a keen eye for detail and usability and my work is standards compliant and accessible.`
    }
  ],
  mail: ["welcome", "test"],
  contacts: [
    {
      status: "away",
      characterId: "adam"
    },
    {
      status: "online",
      characterId: "test"
    }
  ],
  chats: [
    {
      characterId: "adam"
    }
  ],
  bookmarks: websites
    .filter((website) => website.preBookmarked)
    .map((website) => website.id)
};
