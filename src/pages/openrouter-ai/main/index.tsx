import {
  useEffect,
  useState
} from 'react';
import { styled as _styled } from '@mui/material/styles';
import { Grid, Typography, FormHelperText, Input as _Input, Button } from "@mui/material";
import { Modal as BaseModal } from "@mui/base/Modal";
import { FormControl } from '@mui/base/FormControl';
import { LocalStorageHelper, cloneDeep } from 'micro-util-ts'

import {
  IParamsFetch,
  dataFetch
} from '@/data'

import {
  Avatar,
  Nickname,
  Input,
  StyledBackdrop,
  ModalContent
} from '../ui'

const ScDiv = _styled('div')`
  width:80%;
  height: 100%;
  margin: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

const ScConTentDiv = _styled('div')`
  flex: 1;
  overflow: auto;
  margin-bottom: 10px;
`

const ScGrid = _styled(Grid)`
  display: flex;
  justify-content: end;
`
const Modal = _styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScImg = _styled('img')`
  width: 50px;
  height: 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;




export default function Dialogue() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { set, get } = LocalStorageHelper

  useEffect(() => {
    if (!get('key')) {
      handleOpen()
    }
  }, [get])


  const [str, setStr] = useState('');
  const handleSubmitClick = () => {
    set({
      key: 'key',
      value: str
    })
  }

  const [dialogueList, setDialogueList] = useState<IParamsFetch[]>([])
  const [loading, setLoading] = useState(false);

  const handleMessageClick = async (e: string) => {

    setLoading(true)

    const list: IParamsFetch[] = cloneDeep(dialogueList) as IParamsFetch[]

    list.push({
      role: 'user',
      content: e
    })

    setDialogueList(list)

    await dataFetch(list).then(res => {
      if (!res) return
      list.push(res)
      setDialogueList(list)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <ScDiv>
      {/* TODO 应该使用 useModal 更合适 */}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent>
          <FormControl error defaultValue="" required>
            <p>请输入 key</p>

            <_Input placeholder="Write your key here" onChange={(e) => setStr(e.target.value)} sx={{
              width: '100%',
              marginTop: '10px'
            }} />
            <FormHelperText sx={{
              color: '#d32f2f'
            }} children={str ? '' : '不能为空'} />
          </FormControl>
          <div className='footer'>
            <Button onClick={handleSubmitClick}>确认</Button>
            <Button color={'error'} onClick={handleClose}>取消</Button>
          </div>
        </ModalContent>
      </Modal>

      <ScConTentDiv>
        {
          dialogueList.length === 0 ? <ScImg src="src/assets/ai.svg" alt="" /> : null
        }
        {
          dialogueList.map((item, index) => {
            return <Grid container spacing={2} rowSpacing={4} key={index} sx={{
              marginTop: 0
            }}>
              <ScGrid item xs={1} >
                <Avatar type={item.role} />
              </ScGrid>
              <Grid item xs={11}>
                <Nickname type={item.role} />
                <Typography>{item.content}</Typography>
              </Grid>
            </Grid>
          })
        }
      </ScConTentDiv>
      <Input onClick={handleMessageClick} loading={loading} />
    </ScDiv>
  );
}