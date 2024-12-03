// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import Stack from "@mui/material/Stack";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { useLocation, Link as RouterLink } from "react-router-dom";

// export default function BreadCrumbs() {
//   const { pathname } = useLocation();

//   // Helper function to map paths to breadcrumb labels
//   const pathNamesToLabels: Record<string, string> = {
//     "": "Home",
//     workspace: "Workspace",
//     patient: "Patient",
//   };

//   // Split pathname into segments
//   const pathSegments = pathname.split("/").filter((segment) => segment);

//   // Generate breadcrumb links
//   const breadcrumbs = pathSegments.map((segment, index) => {
//     // Create a URL for each breadcrumb
//     const to = `/${pathSegments.slice(0, index + 1).join("/")}`;

//     // Render a Link for intermediate breadcrumbs, Typography for the last one
//     return index < pathSegments.length - 1 ? (
//       <Link
//         underline="hover"
//         key={to}
//         color="inherit"
//         component={RouterLink}
//         to={to}
//       >
//         {pathNamesToLabels[segment] || segment}
//       </Link>
//     ) : (
//       <Typography key={to} sx={{ color: "text.primary" }}>
//         {pathNamesToLabels[segment] || segment}
//       </Typography>
//     );
//   });

//   return (
//     <Stack spacing={2}>
//       <Breadcrumbs
//         separator={<NavigateNextIcon fontSize="small" />}
//         aria-label="breadcrumb"
//       >
//         {[
//           <Link
//             underline="hover"
//             key="/"
//             color="inherit"
//             component={RouterLink}
//             to="/"
//           >
//             {pathNamesToLabels[""] || "Home"}
//           </Link>,
//           ...breadcrumbs,
//         ]}
//       </Breadcrumbs>
//     </Stack>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, Link as RouterLink } from "react-router-dom";
import workshopsPromise from "../mockResponse/workspaceResponse";
import patientPromise from "../mockResponse/patientResponse";

// Static labels for known paths
const breadCrumbConfig: Record<string, string> = {
  "": "Home",
  workspace: "Workspace",
  patient: "Patient",
  study: "Study",
  report: "Report",
};

// Helper functions
const fetchWorkspaceName = async (id: string): Promise<string> => {
  const workspaces = await workshopsPromise();
  const workspace = workspaces.find((w) => w.id.toString() === id);
  return workspace ? workspace.name : `Unknown Workspace (${id})`;
};

const fetchPatientName = async (id: string): Promise<string> => {
  const patients = await patientPromise();
  const patient = patients.find((p) => p.id.toString() === id);
  return patient ? patient.name : `Unknown Patient (${id})`;
};

export default function BreadCrumbs() {
  const { pathname } = useLocation();
  const [dynamicLabels, setDynamicLabels] = useState<Record<string, string>>(
    {}
  );

  // Memoize path segments to avoid recalculations
  const pathSegments = useMemo(
    () => pathname.split("/").filter((seg) => seg),
    [pathname]
  );

  useEffect(() => {
    const fetchLabels = async () => {
      const labels: Record<string, string> = { ...dynamicLabels };

      for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        const prevSegment = pathSegments[i - 1];

        if (labels[`${prevSegment}_${segment}`]) continue; // Skip if label already exists

        // Handle dynamic labels for different segments
        if (prevSegment === "workspace") {
          labels[`${prevSegment}_${segment}`] = await fetchWorkspaceName(
            segment
          ); // Use a unique key for workspace
        } else if (prevSegment === "patient") {
          labels[`${prevSegment}_${segment}`] = await fetchPatientName(segment); // Use a unique key for patient
        }
      }

      setDynamicLabels(labels); // Update state with new labels
    };

    fetchLabels(); // Trigger label fetching
  }, [pathSegments]);

  // Generate breadcrumbs
  const breadcrumbs = pathSegments.map((segment, index) => {
    const to = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const prevSegment = pathSegments[index - 1];
    const label =
      dynamicLabels[`${prevSegment}_${segment}`] ||
      breadCrumbConfig[`${prevSegment}_${segment}`] ||
      segment;

    return index < pathSegments.length - 1 ? (
      <Link
        underline="hover"
        key={to}
        color="inherit"
        component={RouterLink}
        to={to}
      >
        {label}
      </Link>
    ) : (
      <Typography key={to} sx={{ color: "text.primary" }}>
        {label}
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
            {breadCrumbConfig[""] || "Home"}
          </Link>,
          ...breadcrumbs,
        ]}
      </Breadcrumbs>
    </Stack>
  );
}
