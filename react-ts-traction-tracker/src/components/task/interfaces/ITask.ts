import { ITaskDescription } from "./ITaskDescription";
import { ITaskFooter } from "./ITaskFooter";
import { ITaskHeader } from "./ITaskHeader";

export interface ITask
    extends ITaskHeader,
            ITaskDescription,
            ITaskFooter {
        id: string;
        status?: string;
        priority?: string;
    }