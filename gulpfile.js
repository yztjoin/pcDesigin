const gulp = require('gulp');
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const config = require('./scripts/config');
const dayjs = require('dayjs');
const clipboardy = require('clipboardy');
const { execSync } = require('child_process');

const userName = execSync('git config user.name').toString().replace(/\n/g, '');

const zipNote = process.argv.slice(4) || ''; //修改备注
if (zipNote && zipNote[0]) {
  clipboardy.writeSync(zipNote[0]);
}
let zipName = ''; //生成的文件夹名称

//清除zip文件夹
function cleanZip() {
  return gulp.src([`./zip/*.zip`,'./dist'],{allowEmpty:true}).pipe(clean());
}
//生成文件夹
function createZip() {
  let time = dayjs().format('YYYYMMDDHHmmss');
  zipName = `${config.webSite}-${zipNote}-${userName}-${time}.zip`;

  return gulp.src(`./dist/**`).pipe(zip(zipName)).pipe(gulp.dest(`./zip`));
}
gulp.task('clean', cleanZip);
gulp.task('zip', createZip);
gulp.task('default', gulp.series(['zip']));
