import { FILTERS } from "../../consts";
import { Filter, TaskInfo } from "../../types";
import styles from "./TasksFilters.module.css";

interface TasksFiltersProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  tasksInfo: TaskInfo;
}

export const TasksFilters = ({ filter, setFilter, tasksInfo }: TasksFiltersProps) => {
  return (
    <section className={styles.filters}>
      {(Object.keys(FILTERS) as Filter[]).map((currentFilter, index) => (
        <button
          key={`${currentFilter}-${index}`}
          onClick={() => setFilter(currentFilter)}
          className={`${styles.button} ${filter === currentFilter ? styles.active : ""}`}
        >
          {`${FILTERS[currentFilter]} (${tasksInfo[currentFilter]})`}
        </button>
      ))}
    </section>
  );
};
