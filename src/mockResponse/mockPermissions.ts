import { TEntityType, TPermissionType, TUserType } from "../state/authSlice";

export const roles: Record<string, Record<TEntityType, TPermissionType[]>> = {
  super_admin: {
    workspace: ["view", "create", "update", "delete"],
    patient: ["view", "create", "update", "delete"],
    study: ["view", "create", "update", "delete"],
    report: ["view", "create", "update", "delete"],
  },
  admin: {
    workspace: ["view"],
    patient: ["view", "create", "update", "delete"],
    study: ["view", "create", "update", "delete"],
    report: ["view", "create", "update", "delete"],
  },
  annotator: {
    workspace: ["view"],
    patient: ["view"],
    study: ["view", "update"],
    report: ["view", "create", "update", "delete"],
  },
};

export interface IPermissionResponse {
  permission: Record<TEntityType, TPermissionType[]>;
}

const validPermission = (
  roles: Record<string, Record<TEntityType, TPermissionType[]>>,
  role: string
): Record<TEntityType, TPermissionType[]> | null => {
  for (const key in roles) {
    if (key === role) {
      return roles[key];
    }
  }
  return null;
};

function permissionsPromise(userType: TUserType): Promise<IPermissionResponse> {
  return new Promise((resolve, reject) => {
    const response = validPermission(roles, userType);
    if (response) {
      resolve({ permission: response });
    } else {
      reject("login error");
    }
  });
}

export default permissionsPromise;
