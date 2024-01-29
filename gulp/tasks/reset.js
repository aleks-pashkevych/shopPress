import { rimraf } from "rimraf";
import { path } from "../config/path.js";
console.log(` \b Cleaning ${path.clean} ...\b `);
export const res = () => {
  return rimraf(path.clean);
}
