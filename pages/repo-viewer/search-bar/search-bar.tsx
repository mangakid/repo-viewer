import TextField from "@mui/material/TextField";

type Props = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ value, handleChange }: Props) => {
  return (
    <TextField
      label="Search..."
      variant="outlined"
      value={value}
      onChange={handleChange}
    />
  );
};
