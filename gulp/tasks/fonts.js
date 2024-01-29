import gulp from "gulp";
import ttf2woff2 from "gulp-ttf2woff2";

export const ttfToWoff = () => {
  return app.gulp
    .src(`./src/fonts/**/*.ttf`)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(`${app.path.build.fonts}`));
};
