const skillsContainer = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 0,
  margin: "25px 0",
};

const skillItem = {
  margin: "10px 20px",
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "5px",
  transition: "all .2s ease-in-out",
  cursor: "pointer",

  "&:hover": {
    background: "#ccc",
    transform: "scale(1.1)",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const divHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "15px",
};

export { skillsContainer, skillItem, container, item, divHeader };
