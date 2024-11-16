import { TextInput } from 'react-admin';
import { Box } from '@mui/material';

const InputField = (props: any) => {
    return (
        <Box sx={{ width: '100%' }}>
            <TextInput
                source={props.source}
                label={props.label}
                validate={props.validate}
            />
        </Box>
    );
};

export default InputField;
