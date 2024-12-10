import { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, Link as RouterLink } from "react-router-dom";
import workshopsPromise from "../mockResponse/workspaceResponse";
import patientPromise from "../mockResponse/patientResponse";

const breadCrumbConfig: Record<string, string> = {
  "": "Home",
  workspace: "Workspace",
  patient: "Patient",
  study: "Study",
  report: "Report",
};

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

        if (labels[`${prevSegment}_${segment}`]) continue;

        if (prevSegment === "workspace") {
          labels[`${prevSegment}_${segment}`] = await fetchWorkspaceName(
            segment
          );
        } else if (prevSegment === "patient") {
          labels[`${prevSegment}_${segment}`] = await fetchPatientName(segment);
        }
      }

      setDynamicLabels(labels);
    };

    fetchLabels();
  }, [pathSegments]);

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
