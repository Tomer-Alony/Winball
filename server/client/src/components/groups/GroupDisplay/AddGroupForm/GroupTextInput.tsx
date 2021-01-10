import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface GroupTextInputProps {
    handleChange: (name: string) => void,
    label: string,
    isFocused: boolean
}

interface GroupsTestInputState {
}

export default function GroupTextInput(props: GroupTextInputProps, state: GroupsTestInputState) {
    const { handleChange, label, isFocused } = props;

    return (
        
            <TextField id="standard-required"
                label={label}
                autoFocus={isFocused}
                onChange={(e) =>
                    handleChange(e.target.value)}
            />
        
    );
}