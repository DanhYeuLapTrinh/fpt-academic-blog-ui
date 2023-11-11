import React from 'react'
import { Icon } from "@iconify/react";
import { IconButton, Stack } from '@mui/material';
import Text from '../../atoms/Text/Text';

export default function QAVote(props) {
  return (
    <Stack alignItems={'center'} paddingBottom={'15px'}>
      {/* <Icon
        icon="tabler:arrow-big-up"
        style={{ color: "#5927e5" }}
        vFlip={false}
      />
      <Icon
        icon="tabler:arrow-big-up-filled"
        style={{ color: "#5927e5" }}
        vFlip={true}
      /> */}
      <IconButton sx={{p: '3px'}}>
        <Icon
          icon="tabler:arrow-big-up"
          style={{ color: "#c3c3c3", fontSize: '28px' }}
          vFlip={false}
        />
      </IconButton>
      <Text color="middleText.main" fontWeight="400" fontSize="14px">{props.vote}</Text>
      <IconButton sx={{p: '3px'}}>
        <Icon
          icon="tabler:arrow-big-up"
          style={{ color: "#c3c3c3", fontSize: '28px' }}
          vFlip={true}
        />
      </IconButton>
    </Stack>
  )
}
