import fileInclude from "gulp-file-include";
import versionNumber from "gulp-version-number";

export const html = () => {
  return app.gulp.src(app.path.src.html)
            .pipe(app.plugins.plumber(
              app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>",
              })
            ))
            .pipe(fileInclude())
            .pipe(
              versionNumber({
                'value': '%DT%',
                'append': {
                  'key': '-v',
                  'cover': 0,
                  'to': [
                    'css',
                    'js',
                  ]
                },
                'output': {
                  'file': `dist/files/version.json`,
                },
              }))
            .pipe(app.gulp.dest(app.path.build.html))
            .pipe(app.plugins.browsersync.stream());
}
