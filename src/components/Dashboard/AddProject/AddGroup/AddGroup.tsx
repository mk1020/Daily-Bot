const [eventAddGroup, doEventAddGroup] = useState<boolean>(false);
const [groupAdded, setGroupAdded] = useState<boolean>(false);
const AddGroup = () => {
	return (
		<div className={classes.addGroup}>
			<TextField
				id="outlined-basic"
				label="Group name"
				variant="outlined"
				value={groupName}
				onChange={e => changeGroupName(e.target.value)}
			/>
			<Autocomplete
				className={classes.addGroup_Autocomplete}
				multiple
				id="tags-standard"
				options={usersList}
				getOptionLabel={(option): string =>
					`${option.Attributes[2].Value} (${option.Attributes[3].Value})`
				}
				defaultValue={[]}
				renderInput={params => (
					<TextField
						{...params}
						variant="outlined"
						label="Select people"
						placeholder="Next"
					/>
				)}
				/* onInputChange={(event: object, value: string, reason: string) => {debugger}}
				 */ onChange={(event: object, value, reason: string) => {
					const listEmployee = value.map(el => ({
						sub: el.Attributes[0].Value,
						name: el.Attributes[2].Value,
						email: el.Attributes[3].Value,
					}));

					changeListSelectedEmployee(listEmployee);
				}}
			/>
			<Autocomplete
				/* 						  className={classes.addGroup_Autocomplete}*/
				id="tags-standard"
				options={listPermissions}
				getOptionLabel={(option): any => option}
				renderInput={params => (
					<TextField {...params} variant="outlined" label="Select permission" />
				)}
				/* onInputChange={(event: object, value: string, reason: string) => {debugger}}
				 */

				onChange={(event: object, value, reason: string) =>
					changeSelectedPermission(value)
				}
			/>
			<Button
				variant="contained"
				color="primary"
				disableElevation
				onClick={() => {
					const group: GroupEmployee = {
						groupName: groupName,
						listEmployee: listSelectedEmployee,
						permissions: selectedPermission,
					};
					changeListGroup([...listGroup, group]);
					setGroupAdded(true);
					doEventAddGroup(false);
					doEventAddPeople(false);
				}}
			>
				ADD
			</Button>
		</div>
	);
};
