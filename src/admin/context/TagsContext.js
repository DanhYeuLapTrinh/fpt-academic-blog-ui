import { createContext, useContext, useEffect, useState } from "react";

const TagsContext = createContext();

export const useTagsContext = () => {
  return useContext(TagsContext);
};

export const TagsProvider = ({ children }) => {
  const [tagData, setTagData] = useState([]);

  const [open, setOpen] = useState(false);

  const [newTagName, setNewTagName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [tagToDelete, setTagToDelete] = useState({ id: null, name: null });
  return (
    <TagsContext.Provider
      value={{
        tagData,
        setTagData,
        open,
        setOpen,
        newTagName,
        setNewTagName,
        errorMessage,
        setErrorMessage,
        deleteConfirmationOpen,
        setDeleteConfirmationOpen,
        tagToDelete,
        setTagToDelete,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};
