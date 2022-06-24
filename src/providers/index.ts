import { registry } from "tsyringe";
import config from "./config";
import screenbuffer from "./screenbuffer";
import termkit from "./termkit";

@registry([termkit, config, screenbuffer])
export default class ContainerRegistry { }
