import React from 'react';  
import { User } from '../../../../modles/User';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

interface DataSelectionProps {
  data: any[],
  handleChange: (data: (any)[]) => void,
  label: string
}

interface DataSelectionState {
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function UsersSelection(props: DataSelectionProps, state: DataSelectionState) {

  const { data, handleChange, label } = props;

  return (
    <>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={data}
          disableCloseOnSelect
          getOptionLabel={(option) => option.displayName}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.displayName}
            </React.Fragment>
          )}
          onChange={(event, value) => {
            handleChange(value);
          }}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label={label} placeholder={label} />
          )}
        />
    </>
  );
}
