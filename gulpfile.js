import gulp from "gulp";
import less from "less";
//const del = require("del");

import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import { res } from "./gulp/tasks/reset.js";
import { copy } from "./gulp/tasks/copy.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { server } from "./gulp/tasks/server.js";

import { ttfToWoff } from "./gulp/tasks/fonts.js";

global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins
};

const fonts = gulp.series(ttfToWoff);

const mainTasks = gulp.series(gulp.parallel(copy, html, scss, js, images));

const dev = gulp.series(res, mainTasks, gulp.parallel(server, watcher));

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

gulp.task("default", dev);

gulp.task("del", res);
gulp.task("copy", copy);
gulp.task("watcher", watcher);
gulp.task("dev", dev);
gulp.task("html", html);
gulp.task("css", scss);
gulp.task("img", images);
gulp.task("fonts", fonts);
