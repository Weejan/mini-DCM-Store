import { ReactElement } from "react";
import { TEntityType, TPermissionType } from "./state/authSlice";
import useStore from "./store";

// interface WithPermissionProps {
//   entityType: TEntityType;
//   permissionType: TPermissionType[];
// }

type AccessControlProps = {
  jsx: ReactElement;
  entity: TEntityType;
  permissions: TPermissionType[];
};

// const withPermission = <P extends object>(
//   WrappedComponent: React.ComponentType<P>,
//   { entityType, permissionType }: WithPermissionProps
// ) => {
//   return (props: P) => {
//     const { wsPermissions } = useStore();
//     // Check if all required permissions are present in wsPermissions[entityType]
//     const hasPermission = permissionType.every((perm) =>
//       wsPermissions?.[entityType]?.includes(perm)
//     );

//     if (!hasPermission) return null; // If permissions are missing, render nothing
//     return <WrappedComponent {...props} />;
//   };
// };

// export const AccessControl = ({
//   jsx,
//   entity,
//   permissions,
// }: AccessControlProps) => {
//   const WrappedComponent = withPermission(() => jsx, {
//     entityType: entity,
//     permissionType: permissions,
//   });

//   return (
//     <>
//       <WrappedComponent />
//     </>
//   );
// };

export const AccessControl = ({
  jsx,
  entity,
  permissions,
}: AccessControlProps) => {
  const { wsPermissions } = useStore();

  // Check if the entity has all required permissions
  const hasPermission = permissions.every((perm) =>
    wsPermissions?.[entity]?.includes(perm)
  );

  if (!hasPermission) return null; // If permissions are missing, render nothing

  return jsx;
};
