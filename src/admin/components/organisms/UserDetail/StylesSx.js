const PaperSx = {
  backgroundColor: "#fff",
  color: "#2b2b36",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  backgroundImage: "none",
  overflow: "hidden",
  position: "relative",
  boxShadow:
    "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
  borderRadius: 4,
  zIndex: 0,
  padding: 5,
};

const BoxSx = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 5,
};

const StackSx = {
  display: "flex",
  gap: 2,
  marginTop: 5,
  alignItems: "flex-end",
};

const chipStyles = {
  margin: "4px 2px",
  maxWidth: "46%",
  marginRight: 1,
  marginBottom: 1,
};

export { PaperSx, BoxSx, StackSx, chipStyles };
