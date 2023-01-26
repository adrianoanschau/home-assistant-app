import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffectOnce } from "usehooks-ts";
import { useApiGet } from "../../api/hooks/use-api/use-api-get";

type IntegrationData = {
  id: string;
  attributes: {
    name: string;
  };
};

export type FiltersType = {
  date: { from: Date; to: Date };
  account?: string;
};

type FiltersProps = {
  loading?: boolean;
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
  onDone: () => void;
};

export const Filters = ({
  loading = false,
  filters,
  onChange,
  onDone,
}: FiltersProps) => {
  const { data: integrations, perform: loadIntegrations } = useApiGet<{
    data: IntegrationData[];
  }>(`/integrations`);

  const handleChangeDateFrom = (date: Date) => {
    onChange({ ...filters, date: { ...filters.date, from: date } });
  };

  const handleChangeDateTo = (date: Date) => {
    onChange({ ...filters, date: { ...filters.date, to: date } });
  };

  const handleChangeAccount = (account: string) => {
    onChange({ ...filters, account });
  };

  useEffectOnce(() => {
    loadIntegrations();
  });

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="De"
          inputFormat="dd/MM/yyyy"
          value={filters.date.from}
          onChange={(value) => handleChangeDateFrom(value ?? new Date())}
          renderInput={(params) => <TextField type="date" {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Até"
          inputFormat="dd/MM/yyyy"
          value={filters.date.to}
          onChange={(value) => handleChangeDateTo(value ?? new Date())}
          renderInput={(params) => <TextField type="date" {...params} />}
        />
      </LocalizationProvider>
      <FormControl variant="standard" sx={{ width: 300, p: "10px" }}>
        <Select
          value={filters.account}
          onChange={(event) => handleChangeAccount(event.target.value)}
        >
          {(integrations?.data ?? []).map(({ id, attributes: { name } }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ p: "10px" }}>
        <Button
          variant="contained"
          color="info"
          disabled={!filters.account || loading}
          onClick={onDone}
        >
          Carregar
        </Button>
      </FormControl>
    </Box>
  );
};
