const buttonSx = {
  width: "auto",
  borderRadius: "20px",
  fontSize: "0.6rem",
  padding: "2px 4py",
  color: "#fff",
};

const banButtonSx = {
  ...buttonSx,
  background: "linear-gradient(45deg, #4CAF50 30%, #45a049 90%)",
  "&:hover": {
    background: "linear-gradient(45deg, #45a049 30%, #4CAF50 90%)",
  },
};

const unbanButtonSx = {
  ...buttonSx,
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  "&:hover": {
    background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
  },
};

export { banButtonSx, unbanButtonSx };
