import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );

  const [profileDetail, setProfileDetail] = useState({});

  const getUserById = (id) => {
    return data.find((user) => user.id === parseInt(id));
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const [isAddUserFormOpen, setAddUserFormOpen] = useState(false);

  const [showMuteModal, setShowMuteModal] = useState(false);

  const [muteDuration, setMuteDuration] = useState(1);

  const [isMuted, setIsMuted] = useState({});

  const [isMutedChanged, setIsMutedChanged] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState("");

  const [selectedUsername, setSelectedUsername] = useState("");

  const [editingUserId, setEditingUserId] = useState(null);

  const [role, setRole] = useState("");

  const [newRole, setNewRole] = useState("");

  const [originalRole, setOriginalRole] = useState("");

  const [loading, setLoading] = useState(false);

  const [noRows, setNoRows] = useState(false);

  const [banStatus, setBanStatus] = useState({});

  const [banStatusChanged, setBanStatusChanged] = useState(false);

  const [setRoleChanged, setSetRoleChanged] = useState(false);

  const [addUserChanged, setAddUserChanged] = useState(false);

  const [value, setValue] = useState(0);

  const [filterRole, setFilterRole] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [allUsersCount, setAllUsersCount] = useState(0);

  const [bannedUsersCount, setBannedUsersCount] = useState(0);

  const [records, setRecords] = useState([]);

  const allUsers = filterRole
    ? records.filter((user) => user.role.roleName === filterRole)
    : records.filter(
        (user) => user.isBanned === false && user.isMuted === false
      );
  const bannedUsers = records.filter((user) => user.isBanned === true);

  return (
    <UserContext.Provider
      value={{
        data,
        records,
        setRecords,
        getUserById,
        setData,
        profileDetail,
        setProfileDetail,
        isAddUserFormOpen,
        setAddUserFormOpen,
        showMuteModal,
        setShowMuteModal,
        muteDuration,
        setMuteDuration,
        isMuted,
        setIsMuted,
        isMutedChanged,
        setIsMutedChanged,
        selectedUserId,
        setSelectedUserId,
        selectedUsername,
        setSelectedUsername,
        editingUserId,
        setEditingUserId,
        role,
        setRole,
        newRole,
        setNewRole,
        originalRole,
        setOriginalRole,
        loading,
        setLoading,
        noRows,
        setNoRows,
        banStatus,
        setBanStatus,
        banStatusChanged,
        setBanStatusChanged,
        setRoleChanged,
        setSetRoleChanged,
        addUserChanged,
        setAddUserChanged,
        value,
        setValue,
        filterRole,
        setFilterRole,
        isLoading,
        setIsLoading,
        allUsersCount,
        setAllUsersCount,
        bannedUsersCount,
        setBannedUsersCount,
        allUsers,
        bannedUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
