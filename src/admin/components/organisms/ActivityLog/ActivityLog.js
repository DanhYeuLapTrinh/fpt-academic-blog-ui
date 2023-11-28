import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  Typography,
  Link,
  Tooltip,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import truncateText from "../../../utils/TruncateText/TruncateText";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

function ActivityLog({ activityLogData }) {
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedActivityLogData = [...activityLogData].sort((a, b) =>
    sortOrder === "desc"
      ? new Date(b.actionTime) - new Date(a.actionTime)
      : new Date(a.actionTime) - new Date(b.actionTime)
  );

  return (
    <Box>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CardHeader title="Nhật ký hoạt động" />
          <Box sx={{ padding: 2 }}>
            <Link
              component="button"
              onClick={() => setSortOrder("asc")}
              color={sortOrder === "asc" ? "#212121" : "#9e9e9e"}
            >
              <ArrowUpwardIcon />
            </Link>
            <Link
              component="button"
              onClick={() => setSortOrder("desc")}
              color={sortOrder === "desc" ? "#212121" : "#9e9e9e"}
            >
              <ArrowDownwardIcon />
            </Link>
          </Box>
        </div>

        <Box sx={{ maxHeight: "365px", overflow: "auto", pb: 1 }}>
          <List>
            {sortedActivityLogData.map((log) => (
              <ListItem key={log.id}>
                <FiberManualRecordIcon fontSize="small" />
                <Box
                  sx={{
                    ml: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    borderBottom: "1px solid gray",
                    py: 1,
                  }}
                >
                  <Box>
                    <Tooltip title={log.action}>
                      <Typography variant="subtitle1">
                        {truncateText(log.action, 10)}
                      </Typography>
                    </Tooltip>
                    <Typography
                      variant="subtitle2"
                      color="gray"
                      fontWeight="normal"
                      fontSize="0.8rem"
                    >{`Thực hiện bởi ${log.actor} vào lúc ${new Date(
                      log.actionTime
                    ).toLocaleString()}`}</Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    title={new Date(log.actionTime).toLocaleString()}
                  >{`${formatDistanceToNow(log.actionTime, {
                    addSuffix: true,
                    locale: vi,
                  })}`}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Card>
    </Box>
  );
}

export default ActivityLog;
