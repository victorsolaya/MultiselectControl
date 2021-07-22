import * as React from "react";
import { useState, useEffect } from 'react'
import AsyncSelect from 'react-select/async';

export interface IProps {
	isControlVisible: boolean;
	isControlDisabled: boolean;
	displayValueField: any;
	displayFieldLabel: any;
	columns: any;
	topCount: any;
	filterField: any;
	entityName: any;
    value: string;
	onChange: (value:string) => void;
	onSearch: (value:string) => void;
	records: any,
	label: string | null
}

export interface IState {
    value: string;
}


const MultiSelectControl = (props: IProps) => {
	const [value, setValue] = useState(props.value);
	useEffect(() => {
		setValue(props.value);
	}, [props.value])
	
	const selectStyles = { menuPortal: (zindex: any) => ({ ...zindex, zIndex: 9999 }) };

	const onChange = (valueMapped: any) => {
		if (valueMapped == null) {
			setValue("")
			onChange("");
			return;
		}
		var response = valueMapped.map((val: any) => val[props.displayValueField]).join(",");
		setValue(response);
		props.onChange(response);
	}

	const loadOptions = async (inputValue: string) => {
		const res = props.onSearch(inputValue);
		return res;
	}

	if (props.isControlVisible) {
		return (
			<>
				<div className="labelDescription">{props.label}</div>
				<div>
					<AsyncSelect
						isMulti={true}
						menuPortalTarget={document.body}
						styles={selectStyles}
						getOptionLabel={e => e[props.displayFieldLabel]}
						getOptionValue={e => e[props.displayValueField]}
						loadOptions={loadOptions}
						defaultOptions
						isDisabled={props.isControlDisabled}
						onChange={onChange}
					/></div>
			</>
		)
	} else {
		return <></>
	}
}

export default MultiSelectControl;