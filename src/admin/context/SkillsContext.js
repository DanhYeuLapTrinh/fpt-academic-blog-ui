import { createContext, useContext, useEffect, useState } from "react";

const SkillsContext = createContext();

export const useSkillsContext = () => {
  return useContext(SkillsContext);
};

export const SkillsProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const [idToDelete, setIdToDelete] = useState(null);

  const [newSkillName, setNewSkillName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <SkillsContext.Provider
      value={{
        open,
        setOpen,
        idToDelete,
        setIdToDelete,
        newSkillName,
        setNewSkillName,
        errorMessage,
        setErrorMessage,
        deleteDialogOpen,
        setDeleteDialogOpen,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
