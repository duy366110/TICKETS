import {
    FunctionField,
} from 'react-admin';

const CustomFunctionField = (props: any) => {
    return (
        <FunctionField
            label={props.label}
            render={props.render}
        />
    );
};

export default CustomFunctionField;
