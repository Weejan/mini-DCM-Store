import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, Link as RouterLink } from "react-router-dom";

export default function BreadCrumbs() {
  const { pathname } = useLocation();

  // Helper function to map paths to breadcrumb labels
  const pathNamesToLabels: Record<string, string> = {
    "": "Home",
    workspace: "Workspace",
    patient: "Patient",
  };

  // Split pathname into segments
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Generate breadcrumb links
  const breadcrumbs = pathSegments.map((segment, index) => {
    // Create a URL for each breadcrumb
    const to = `/${pathSegments.slice(0, index + 1).join("/")}`;

    // Render a Link for intermediate breadcrumbs, Typography for the last one
    return index < pathSegments.length - 1 ? (
      <Link
        underline="hover"
        key={to}
        color="inherit"
        component={RouterLink}
        to={to}
      >
        {pathNamesToLabels[segment] || segment}
      </Link>
    ) : (
      <Typography key={to} sx={{ color: "text.primary" }}>
        {pathNamesToLabels[segment] || segment}
      </Typography>
    );
  });

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {[
          <Link
            underline="hover"
            key="/"
            color="inherit"
            component={RouterLink}
            to="/"
          >
            {pathNamesToLabels[""] || "Home"}
          </Link>,
          ...breadcrumbs,
        ]}
      </Breadcrumbs>
    </Stack>
  );
}
