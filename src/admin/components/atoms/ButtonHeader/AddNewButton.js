import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";

const AddNewButton = ({ title, data, handleClick }) => {
  const sharedBgColor = "rgb(89, 39, 229)";

  return (
    <Button
      sx={{
        bgcolor: sharedBgColor,
        borderRadius: "10px",
        color: "white",
        height: "55px",
        "&:hover": {
          bgcolor: sharedBgColor,
          transform: "scale(1.1)",
        },
      }}
      onClick={() => handleClick(data)}
    >
      <AddCircleIcon sx={{ marginRight: "5px" }} />
      {title}
    </Button>
  );
};

export default AddNewButton;
