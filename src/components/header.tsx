import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

type HeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

export const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: `0 0 5px 0` }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};
