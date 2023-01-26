import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  useProSidebar,
  menuClasses,
  SubMenu,
} from "react-pro-sidebar";
import {
  Dashboard as DashboardIcon,
  MenuOutlined as MenuIcon,
  PointOfSaleOutlined as BudgetIcon,
  AttachMoneyOutlined as IncomesIcon,
  MoneyOffOutlined as ExpensesIcon,
  InsightsOutlined as InvestmentsIcon,
  IntegrationInstructionsOutlined as IntegrationInstructionsIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

type ItemProps = {
  title: string;
  to: string;
  icon?: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
};

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      component={<Link to={to} />}
      active={selected === title}
      icon={icon}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collapsed, collapseSidebar } = useProSidebar();
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box sx={{ display: "flex" }}>
      <ProSidebar
        backgroundColor={colors.primary[400]}
        width="300px"
        rootStyles={{
          border: "none !important",
          [`.${menuClasses.button}`]: {
            backgroundColor: `transparent !important`,
            padding: `5px 35px 5px 20px !important`,
            "&:hover": {
              color: `#868dfb !important`,
            },
          },
          [`.${menuClasses.active}`]: {
            color: `#6870fa !important`,
          },
          [`.${menuClasses.subMenuContent}`]: {
            backgroundColor: `transparent !important`,
            paddingLeft: `30px`,
          },
        }}
      >
        <Menu>
          <MenuItem
            icon={collapsed ? <MenuIcon /> : undefined}
            onClick={() => collapseSidebar(!collapsed)}
            style={{
              margin: `10px 0 20px 0`,
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  HOME ASSISTANT
                </Typography>
                <IconButton onClick={() => collapseSidebar()}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!collapsed && (
            <Box mb="25px">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: `10px 0 0 0 ` }}
                >
                  Adriano Anschau
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orçamento"
              to="/budget"
              icon={<BudgetIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Receitas"
              to="/income"
              icon={<IncomesIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu label="Despesas" icon={<ExpensesIcon />}>
              <Item
                title="Fixas"
                to="/expenses/fixed"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Variáveis"
                to="/expenses/variable"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Cartão de Crédito"
                to="/expenses/credit-card"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Parcelamentos"
                to="/expenses/installment"
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <Item
              title="Investimentos"
              to="/investments"
              icon={<InvestmentsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Integrações"
              to="/integrations"
              icon={<IntegrationInstructionsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
