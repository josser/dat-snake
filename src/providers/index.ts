import { registry } from "tsyringe";
import termkit from "./termkit";

@registry([termkit])
export default class ContainerRegistry { }
