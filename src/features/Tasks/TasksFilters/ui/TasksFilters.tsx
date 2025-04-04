import { Filter, TaskInfo } from "@/entities/Task";
import { Flex, Typography } from "antd";
import { FILTERS } from "../model";
import styles from "./TasksFilters.module.css";

const { Text } = Typography;

interface TasksFiltersProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  tasksInfo: TaskInfo;
}

export const TasksFilters = ({ filter, setFilter, tasksInfo }: TasksFiltersProps) => {
  return (
    <Flex className={styles.filters}>
      {(Object.keys(FILTERS) as Filter[]).map((currentFilter, index) => (
        <Text
          key={`${currentFilter}-${index}`}
          onClick={() => setFilter(currentFilter)}
          className={`${styles.button} ${filter === currentFilter ? styles.active : ""}`}
          style={{ fontSize: "1.2rem" }}
        >
          {`${FILTERS[currentFilter]} (${tasksInfo[currentFilter]})`}
        </Text>
      ))}
    </Flex>
  );
};
