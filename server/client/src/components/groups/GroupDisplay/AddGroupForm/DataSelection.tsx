import React from 'react';
import { User } from '../../../../modles/User';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

interface DataSelectionProps {
  data: any[],
  selectedData: any[]
  handleChange: (data: (any)[]) => void,
  label: string
}

interface DataSelectionState {
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function DataSelection(props: DataSelectionProps, state: DataSelectionState) {

  const { data, handleChange, label, selectedData } = props;
  const selectedValues = data.filter((currData) => {
    return selectedData.includes(currData._id);
  })

  return (
    <>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={data}
        defaultValue={selectedValues}
        disableCloseOnSelect
        limitTags={4}
        getOptionLabel={(option) => option.displayName}
        getOptionSelected={(option, value) => {
          return option.displayName === value.displayName;
        }}
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
        onChange={(event, value, reason) => {
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
