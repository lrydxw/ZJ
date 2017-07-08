fis.set('project.ignore', [
    'dist/**',
    'node_modules/**',
    '.git/**',
    '.svn/**',
    'fis-conf.js'
]);
/*********************不使用绝对路径****************************/
fis.hook('relative');
fis.match('**', { relative: true })
/*********************不使用绝对路径****************************/

/*********************文件指纹****************************/
//fis.match('component/*/*.{js,css}', {
//  useHash: true // 开启 md5 戳
//});
/*********************文件指纹****************************/

/*********************文件压缩****************************/
fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

/*********************文件压缩****************************/

