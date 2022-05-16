import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const Field = styled(TextField)(() => ({
    borderRadius: '5px',
    '& .MuiFilledInput-root::before': {
        content: 'none'
    }
}))

export {
    Field
}