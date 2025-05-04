import { isEqual } from "lodash";
import { UserRequest } from "./types";

interface GetChangedValuesProps {
  initialValues: UserRequest;
  formValues: UserRequest;
}

export const getChangedValues = ({ initialValues, formValues }: GetChangedValuesProps) => {
  return (Object.keys(initialValues) as Array<keyof UserRequest>).reduce<UserRequest>((acc, curr) => {
    if (!isEqual(initialValues[curr], formValues[curr])) {
      acc[curr] = formValues[curr];
    }

    return acc;
  }, {});
};
