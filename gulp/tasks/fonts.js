import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  console.log("fonter");
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "Fonts",
          message: "Error: <%= error.message %>"
        })
      )
    )
    .pipe(
      fonter({
        formats: ["ttf"]
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "Fonts",
          message: "Error: <%= error.message %>"
        })
      )
    )
    .pipe(
      fonter({
        formats: ["woff"]
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontStyle = () => {
  console.log("font SCSS");
  let fontFile = `${app.path.srcFolder}/scss/fonts.scss`;
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            if (fontWeight.toLowercase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowercase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowercase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowercase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowercase() === "semibold") {
              fontWeight = 600;
            } else if (fontWeight.toLowercase() === "bold") {
              fontWeight = 700;
            } else if (
              fontWeight.toLowercase() === "extrabold" ||
              fontWeight.toLowercase() === "heavy"
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowercase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontFile,
              `@font-face {
                            font-family: ${fontName};
                            font-display: swap;
                            src: url("../fonts/${fontFileName}.woff2") format("woff2"),
                                 url("../fonts/${fontFileName}.woff") format(woff);
                            font-weight: ${fontWeight};
                            font-style: normal;
                          }\r\n`,
              cb
            );
          }
        }
      } else {
        console.log(
          "File scss/fonts.scss alredy exists. for update, you need remove it."
        );
      }
    }
  });
};
return app.gulp.src(`${app.path.srcFolder}`);
function cb() {}