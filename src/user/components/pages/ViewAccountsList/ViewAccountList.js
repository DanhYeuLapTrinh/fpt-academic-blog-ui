import { Box, Button, Stack } from "@mui/material";
import React from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import Text from "../../atoms/Text/Text";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function ViewAccountList({
  users,
  followAccount,
  unfollowAccount,
}) {
  const auth = useAuth();
  return (
    <Box sx={{ m: "37px 0 100px", minHeight: "calc(100vh - 93px)" }}>
      <SectionTitle title="Mọi người" />
      <Stack spacing={2}>
        {users?.map((item) => (
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            bgcolor={"secondary.alt"}
            p={3}
            borderRadius={"10px"}
            justifyContent={"space-between"}
          >
            <Link
              to={`/profile/${item.userId}`}
              style={{ textDecoration: "none" }}
            >
              <Stack direction={"row"} spacing={4} alignItems={"center"}>
                <UserProfile src={item.profileUrl} width="90px" height="90px" />
                <Stack>
                  <Text fontSize="18px">{item.fullname}</Text>
                  {item.userId !== auth.id ? (
                    <Text fontWeight="400" fontSize="15px">
                      Người theo dõi: {item.numOfFollower}
                    </Text>
                  ) : (
                    <Text fontWeight="400" fontSize="15px">
                      Bạn
                    </Text>
                  )}
                </Stack>
              </Stack>
            </Link>
            {item.userId !== auth.id && (
              <Button
                variant={item.followStatus ? "contained" : "outlined"}
                sx={{ width: "150px", textTransform: "none" }}
                startIcon={
                  item.followStatus ? (
                    <Icon icon="mingcute:check-fill" width="14" />
                  ) : (
                    <Icon icon="vaadin:plus" width={"14px"} />
                  )
                }
                onClick={() =>
                  item.followStatus
                    ? unfollowAccount(item.userId)
                    : followAccount(item.userId)
                }
              >
                {item.followStatus ? "Đang theo dõi" : "Theo dõi"}
              </Button>
            )}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
