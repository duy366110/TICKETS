import { BooleanInput } from 'react-admin';

const SwitchField = (props: any) => {
    return (
        <div>
            <BooleanInput
                source={props.source}
                label={props.label}
                defaultValue={false}
            />
        </div>
    );
};

export default SwitchField;
