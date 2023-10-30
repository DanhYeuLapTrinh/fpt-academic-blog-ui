import {
  Box,
  Container,
  Divider,
  List,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import FooterFblog from "../../molecules/FooterDetail/FooterFblog";
import FooterCommunity from "../../molecules/FooterDetail/FooterCommunity";
import FooterAddress from "../../molecules/FooterDetail/FooterAddress";
import FooterContact from "../../molecules/FooterDetail/FooterContact";
import './Footer.scss'

export default function Footer() {
  return (
    <div className="footer">
      <Box sx={{ bgcolor: "primary.main" }}>
        <Container>
          <List sx={{ display: "flex", gap: "30px", p: "20px 0" }}>
            <Link style={{ textDecoration: "none" }}>
              <ListItemText>
                <Text color="secondary.main" lineHeight="16px">
                  Trang chủ
                </Text>
              </ListItemText>
            </Link>
            <Link style={{ textDecoration: "none" }}>
              <ListItemText>
                <Text color="secondary.main" lineHeight="16px">
                  Bảng tin
                </Text>
              </ListItemText>
            </Link>
            <Link style={{ textDecoration: "none" }}>
              <ListItemText>
                <Text color="secondary.main" lineHeight="16px">
                  Tin tức
                </Text>
              </ListItemText>
            </Link>
            <Link style={{ textDecoration: "none" }}>
              <ListItemText>
                <Text color="secondary.main" lineHeight="16px">
                  Về chúng tôi
                </Text>
              </ListItemText>
            </Link>
          </List>
        </Container>
      </Box>
      <Box padding="80px 0 0 0" bgcolor={"secondary.alt"}>
        <Container sx={{ marginBottom: "80px" }}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <FooterFblog />
            <FooterCommunity />
            <FooterAddress />
            <FooterContact />
          </Stack>
        </Container>
        <Divider orientation="horizontal" />
        <Stack alignItems={"center"} padding={"40px 0 20px 0"}>
          <Text fontWeight="400" fontSize="12px">
            Kênh thông tin số 1 dành cho sinh viên, giảng viên thuộc trường Đại
            học FPT
          </Text>
          <Text fontWeight="400" fontSize="12px">
            Mọi chi tiết xin liên hệ Liên Hợp Quốc
          </Text>
        </Stack>
      </Box>
    </div>
  );
}
