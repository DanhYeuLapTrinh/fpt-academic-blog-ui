import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/base";
const AddNewButton = ({ title, data, handleClick }) => {
  return (
    <Button
      onClick={() => handleClick(data)}
      className="px-4 h-12 rounded-lg shadow-md bg-custom text-white text-center"
    >
      <AddCircleIcon className="mr-2"/>
      {title}
    </Button>
  );
};

export default AddNewButton;
