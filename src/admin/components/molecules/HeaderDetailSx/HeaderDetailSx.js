const PaperSx = {
  backgroundColor: "rgb(255, 255, 255)",
  color: "rgb(33, 43, 54)",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  backgroundImage: "none",
  overflow: "hidden",
  position: "relative",
  boxShadow:
    "0px 0px 2px 0px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
  borderRadius: "16px",
  zIndex: 0,
  marginBottom: "24px",
  height: "290px",
};

const BoxSx = {
  height: "100%",
  color: "rgb(255, 255, 255)",
  background: `linear-gradient(rgba(0, 75, 80, 0.8), rgba(0, 75, 80, 0.8)) center center / cover no-repeat, url(https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
};

const stackAvatarSx = {
  bottom: "24px",
  left: "24px",
  zIndex: 10,
  position: "absolute",
  display: "flex",
};

const avatarSx = {
  width: "124.8px",
  height: "124.8px",
  border: "1px solid black",
};

const fullNameSx = {
  fontSize: "1.7rem",
  fontWeight: 700,
  lineHeight: 1.5,
  margin: 0,
  display: "block",
};

const subHeaderSx = {
  margin: "4px 0px 0px",
  color: "inherit",
  display: "block",
  lineHeight: 1.57143,
  fontSize: "0.95rem",
  fontWeight: 400,
  fontFamily: "Public Sans, sans-serif",
  opacity: 0.48,
};

const backgroundDetailBottom = {
  position: "absolute",
  overflow: "hidden",
  bottom: "0",
  right: "0",
  minHeight: "48px",
  width: "100%",
  display: "flex",
  zIndex: 9,
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor: "#fff",
};

export {
  PaperSx,
  BoxSx,
  fullNameSx,
  subHeaderSx,
  backgroundDetailBottom,
  stackAvatarSx,
  avatarSx,
};
