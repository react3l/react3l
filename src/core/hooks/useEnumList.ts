import {Model} from 'core/models';
import React from 'reactn';

export function useEnumList<T extends Model>(
  list: () => Promise<T[]>,
  onError?: (error: Error) => void,
): [T[], (list: T[]) => void, boolean] {
  const [enums, setEnums] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(
    () => {
      setLoading(true);
      list()
        .then((enums: T[]) => {
          setEnums(enums);
        })
        .catch(onError)
        .finally(
          () => {
            setLoading(false);
          },
        );
    },
    [list, onError],
  );
  return [enums, setEnums, loading];
}
