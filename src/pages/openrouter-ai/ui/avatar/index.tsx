import {
  styled as _styled
} from '@mui/material/styles';
import {
  Avatar as _Avatar
} from '@mui/material';

import {
  IPropsAvatar
} from '../../types';

const ScImg = _styled('img')`
  width: 18px;
  height: 18px;
`;


export default function Avatar({
  type
}: IPropsAvatar) {


  const ScAvatar = _styled(_Avatar)(({ theme }) => ({
    backgroundColor: type === 'user' ? '#ffbf00' : '#04cb80',
    ...theme.typography.body2,
    color: theme.palette.text.primary,

  }))

  return <ScAvatar sx={{ width: 24, height: 24 }}>
    {
      type === 'user' ? 'Y' : <ScImg src="src/assets/ai.svg" alt="" />
    }
  </ScAvatar>
}
