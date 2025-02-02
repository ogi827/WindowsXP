import defaultProfile from "./defaultProfile";

export default {
  settings: {
    crt: true,
    sound: true,
    soundVolume: 100,
    music: true,
    musicVolume: 100
  },
  profiles: [
    {
      name: "Demo",
      ...defaultProfile
    }
  ]
};
