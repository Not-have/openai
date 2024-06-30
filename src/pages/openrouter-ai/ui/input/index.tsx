import {
  useState
} from "react"
import { styled as _styled } from '@mui/material/styles';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';


import {
  IPropsInput
} from '../../types'

const ScDiv = _styled('div')`
  height: 120px;
`

const Input = (props: IPropsInput) => {

  const [str, setStr] = useState('')

  const handleClick = () => {
    if (!props?.onClick) return
    props?.onClick(str)
    setStr('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setStr(e.target.value)
  }

  const handleKeyDown = () => {
    if (!props?.onClick) return
    props?.onClick(str)
    setStr('');
  }

  return <ScDiv>
    <TextField
      variant="outlined"
      placeholder="Message ChatGPT..."
      multiline
      maxRows={4}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={str}
      sx={{
        width: '100%',
        height: "40px",
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          paddingRight: '8px',
          paddingLeft: '8px',
          '& fieldset': {
            borderColor: '#ccc',
          },
          '&:hover fieldset': {
            borderColor: '#aaa',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#aaa',
          },
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ marginRight: '8px' }}>

            {
              props.loading ? <LoadingButton loading /> : <IconButton disabled={!str} sx={{
                padding: '4px',
                borderRadius: '6px'
              }}
                onClick={handleClick}>
                  <SendIcon />
              </IconButton>
            }
          </InputAdornment>
        ),
      }}
    />
  </ScDiv>
};

export default Input;
