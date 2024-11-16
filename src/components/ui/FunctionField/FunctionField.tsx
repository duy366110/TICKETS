import {
    FunctionField,
} from 'react-admin';

const FunctionsField = (props: any) => {
    return (
        <FunctionField
            label={props.label}
            render={props.render}
        />
    );
};

export default FunctionsField;
