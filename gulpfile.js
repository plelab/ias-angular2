var fs = require("fs");
var path = require("path");
var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var gulpWatch = require("gulp-watch");
var pug = require("pug");
var less = require("less");
var through2 = require("through2");
var util = require("./modules/util");
var spawn = require("cross-spawn");

var srcPath = ["./src/**/*"];
var srcRoot = "src";
var dstPath = ".ias/src";
var copySrcRoot = ".ias/src/dist";
var copyDstPath = "www";
var staticPath = "assets";
var metaDir = path.join(__dirname, ".ias");
var metaFile = "pug-tree.json";

gulp.task("default", ["build", "watch"]);

gulp.task("clean", function () {
    util.recursiveRmdir(dstPath, [path.join(dstPath, "node_modules"), path.join(dstPath, "src/assets")], true);
    util.recursiveRmdir(copyDstPath, [path.join(copyDstPath, staticPath)], true);
});

gulp.task("clean-all", function () {
    util.recursiveRmdir(dstPath, [], true);
    util.recursiveRmdir(copyDstPath, [], true);
});

gulp.task("build", function () {
    util.createPugIncludeTree(srcRoot, metaDir, metaFile);

    return gulp.src(srcPath, {dot: true})
        .pipe(through2.obj(function (file, encoding, callback) {
            if ((/node_modules/gim).test(file.path))
                callback(null, file);
            else if ((/\.pug$/gim).test(file.path)) {
                try {
                    var filePath = file.path;
                    var newPath = gulpUtil.replaceExtension(file.path, ".html");

                    file.path = newPath;
                    file.contents = new Buffer(pug.compileFile(filePath)());

                    console.log("[build] %s -> %s", filePath.replace(__dirname, ""), newPath.replace(__dirname + "/" + srcRoot, "/" + dstPath));
                } catch (excep) {
                    file.contents = new Buffer(JSON.stringify(excep, null, 2));
                    console.log("[build_error] %s -> %s", filePath.replace(__dirname, ""), newPath.replace(__dirname + "/" + srcRoot, "/" + dstPath));
                }

                callback(null, file);
            }
            else if ((/\.less$/gim).test(file.path)) {
                var filePath = file.path;
                var newPath = gulpUtil.replaceExtension(file.path, ".css");

                file.path = newPath;
                less.render(String(file.contents), {compress: true})
                    .then(function (output) {
                        file.contents = new Buffer(output.css);
                        console.log("[build] %s -> %s", filePath.replace(__dirname, ""), newPath.replace(__dirname + "/" + srcRoot, "/" + dstPath));
                        callback(null, file);
                    }, function (err) {
                        file.contents = new Buffer(JSON.stringify(err, null, 2));
                        console.log("[build_error] %s -> %s", filePath.replace(__dirname, ""), newPath.replace(__dirname + "/" + srcRoot, "/" + dstPath));
                        callback(null, file);
                    });
            }
            else
                callback(null, file);
        }))
        .pipe(gulp.dest(dstPath));
});

gulp.task("watch", function () {
    var compile = function (event) {
        var pugTree = JSON.parse(fs.readFileSync(path.join(metaDir, metaFile), "utf8"));
        var filePath = event.history[0];
        var parsedPath = filePath.replace(__dirname + "/", "").replace(/.pug$/gim, "");

        util.compileFiles(event.event, filePath, event.base, srcRoot, dstPath);

        if (typeof pugTree[parsedPath] === "undefined")
            return;

        for (var i = 0; i < pugTree[parsedPath].length; i++)
            util.compileFiles(event.event, path.join(event.base, pugTree[parsedPath][i]), event.base, srcRoot, dstPath);
    };

    var remove = function (event) {
        var filePath = event.history[0];
        filePath = filePath.replace(path.join(event.base, srcRoot), path.join(event.base, dstPath));

        try {
            fs.unlinkSync(filePath);
        } catch (excep) {
            console.log("[unlink_err] " + filePath);
        }
    };

    return gulpWatch(srcRoot, function (event) {
        util.createPugIncludeTree(srcRoot, metaDir, metaFile);

        switch (event.event) {
            case "unlink":
                remove(event);
                break;
            default:
                compile(event);
        }
    });
});

gulp.task("dist", function () {
    util.copyFiles(copySrcRoot, copySrcRoot, copyDstPath);
});