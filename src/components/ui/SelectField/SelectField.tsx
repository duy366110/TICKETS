import { SelectInput, SelectArrayInput } from 'react-admin';
import { Box } from '@mui/material';

const SelectField = (props: any) => {
    return (
        <Box sx={{ width: '100%' }}>
            {props.type === 'multiple' && (
                <SelectArrayInput
                    source={props.source}
                    label={props.label}
                    choices={props.choices}
                    validate={props.validate}
                />
            )}
            {props.type === 'single' && (
                <SelectInput
                    source={props.source}
                    label={props.label}
                    choices={props.choices}
                    validate={props.validate}
                />
            )}
        </Box>
    );
};

export default SelectField;
