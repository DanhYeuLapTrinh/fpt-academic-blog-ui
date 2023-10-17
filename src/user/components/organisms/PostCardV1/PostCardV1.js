import React from "react";
import Author from "../../molecules/Author/Author";
import PostTag from "../../atoms/PostTag/PostTag";
import Text from "../../atoms/Text/Text";
import { Box, Stack } from "@mui/material";
export default function PostCardV1(props) {
  return (
    <Stack
      sx={{ width: props.boxWidth, height: props.boxHeight }}
      justifyContent={"space-between"}
    >
      <Box
        sx={{
          width: "100%",
          height: props.h ? props.h : "268px",
          backgroundImage:
            'url("https://images.unsplash.com/photo-1696362400167-0af7071b500c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1952&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
      />
      <Author author={true} text="bởi Chat GPT" color={props.authorColor}/>
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        <Text fontSize={props.title} lineHeight={props.small ? "22px" : "26px"} color={props.color}>
          Những khoảnh khắc đáng nhớ trong cuộc hành trình đời
        </Text>
      </Box>
      {props.hasDescription && (
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
        >
          <Text fontWeight="400" fontSize="13px" color={props.color}>
            Dưới trái tim của thành phố náo nhiệt, nơi ánh đèn neon làm cho bầu
            trời đêm sáng bóng với những màu sắc rực rỡ, một cảm giác vô tận của
            những khả năng không ngừng tràn ngập không khí. Mọi người vội vã đi
            dọc theo những con phố đông đúc, mỗi người một câu chuyện riêng, tạo
            nên một bức tranh động lực của cuộc sống. Các quán cà phê tràn ra
            tiếng cười vào không khí khi bạn bè tụ tập qua những cốc cà phê nóng
            hổi, chia sẻ những giấc mơ và ước mơ. Trong khi đó, một nghệ sĩ độc
            tấu chơi một giai điệu êm dịu trên một cây đàn guitar cũ, hòa nhạc
            những nốt hồn nhiên đến qua những người qua đường. Mùi thơm của thức
            ăn đường phố lan tỏa từ những quán nổi loạn, kích thích vị giác với
            một đồng diễn của hương vị. Phía trên, các tòa nhà chọc trời chạm
            tới thiên đàng, bề mặt phản chiếu của chúng bắt chước múa ánh sáng
            thành phố.
          </Text>
        </Box>
      )}
      <Stack direction={"row"} spacing={"12px"}>
        <PostTag color={props.tagColor ? props.tagColor : 'primary.main'} />
        <PostTag color={props.tagColor ? props.tagColor : 'primary.main'} />
        <PostTag color={props.tagColor ? props.tagColor : 'primary.main'} />
      </Stack>
    </Stack>
  );
}
