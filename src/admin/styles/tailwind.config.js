const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: "#5927E5",
        background: "#F6F7FB",
        buttonSubmit: "#5B6CE1",
        activeStatus: "#05D34E",
        form: "#acacac",
      },
    },
  },
  plugins: [],
});
