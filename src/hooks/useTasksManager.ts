import { useCallback, useEffect, useState } from "react";
import { getTasks } from "../api";
import { DEFAULT_RESPONSE } from "../consts";
import { Filter, MetaResponse } from "../types";

export const useTasksManager = () => {
  const [metaData, setMetaData] = useState<MetaResponse>(DEFAULT_RESPONSE);
  const [filter, setFilter] = useState<Filter>("all");

  const updateTasks = useCallback(async () => {
    const newMetaData = await getTasks(filter);

    if (newMetaData) {
      setMetaData(newMetaData);
    }
  }, [filter]);

  useEffect(() => {
    updateTasks();
  }, [updateTasks]);

  return {
    tasks: metaData.data,
    tasksInfo: metaData.info,
    filter,

    updateTasks,
    setFilter,
  };
};
