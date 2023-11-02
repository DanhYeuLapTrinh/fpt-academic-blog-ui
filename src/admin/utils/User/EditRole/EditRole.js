import React from "react";
import Select from "@mui/material/Select";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
function UserRoleEditor({
  isEditing,
  role,
  newRole,
  onRoleChange,
  onSaveRole,
  onCancel,
  onEditClick,
}) {
  return (
    <div>
      {isEditing ? (
        <>
          <Select
            value={newRole}
            onChange={(e) => onRoleChange(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="lecturer">Lecturer</option>
            <option value="mentor">Mentor</option>
            <option value="student">Student</option>
          </Select>

          <CheckCircleIcon
            sx={{ color: "green", marginLeft: "10px" }}
            onClick={onSaveRole}
          />
          <CancelIcon sx={{ color: "red" }} onClick={onCancel} />
        </>
      ) : (
        <div className="role-col">
          {role}

          <EditIcon
            sx={{ marginLeft: "10px", float: "right" }}
            onClick={onEditClick}
          />
        </div>
      )}
    </div>
  );
}

export default UserRoleEditor;
