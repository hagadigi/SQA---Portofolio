import {useState} from 'react';

function useInput(defaultValue = ''){
    const [value, setValue] = useState(defaultValue);
    const onValueChangeHandler = (e) => {
        setValue(e.target.value);
    }

    return [value, onValueChangeHandler];
}

export default useInput;