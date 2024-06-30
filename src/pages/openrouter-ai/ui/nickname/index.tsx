import { styled as _styled } from '@mui/material/styles';

import {
  IPropsNickname
} from '../../types'

const ScSpan = _styled('span')`
  font-weight: 900;
  font-size: 18px;
`

export default function Nickname({
  type,
  label
}: IPropsNickname) {
  return <ScSpan>
    {label ? label : type === 'user' ? 'You' : 'ChatGPT'}
  </ScSpan>
}