export default [
  {
    id: "welcome",
    characterId: "adam",
    to: "all",
    subject: "[welcome email]",
    message: `[welcome email body]`
  },
  {
    id: "test",
    characterId: "test",
    subject: "How to play",
    message: `See attached.`,
    attachments: [
      {
        name: "Instructions.exe",
        icon: '<img class="block" src="https://i.imgur.com/8iwNV0r.png" />',
        screenId: "bsod",
        mailId: "test"
      }
    ]
  }
];
