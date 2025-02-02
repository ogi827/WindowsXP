export default [
  {
    id: "first",
    message: `It looks like you're trying to go back in time!
Would you like help?`,
    options: [
      {
        label: "Get help with starting",
        // tipId: "server"
        screenId: "bsod"
      },
      {
        label: "Just take over the world without help",
        tipId: "no"
      }
    ]
  },
  {
    id: "no",
    message: `Are you sure you don't need my help?`,
    options: [
      {
        label: "Get off my screen you god damn paperclip",
        mailId: "clippy1"
      }
    ]
  }
];
