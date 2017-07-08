//fis3 release -wL//文件监听，浏览器自动刷新
//fis3 server start//服务启动
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
/*********************获取页面目录****************************/
fis.match('*.html', {
    useMap: true
})
fis.match('view/*.html', {
    //发布到对应目录，用于做页面索引
    release : '$0'
});
/*********************获取页面目录****************************/

/*********************文件指纹****************************/
fis.match('*.{js,css,png}', {
    useHash: true // 开启 md5 戳
});

//fis.match('component/billDetail/statics/*', {
//	useHash: false // 指定文件关闭 文件指纹
//});
//fis.match('js/weiget/cn_auth.html', {
//  useHash: false // 指定文件关闭 文件指纹
//});
/*********************文件指纹****************************/

/*********************自动雪碧图****************************/
//启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
})

// 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});
/*********************自动雪碧图****************************/

/*********************文件压缩****************************/
fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

// 压缩 html 内联的 js
fis.match('*.html:js', {
  optimizer: fis.plugin('uglify-js')
});
// 压缩 html 内联的 css
fis.match('*.html:css', {
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});
/*********************文件压缩****************************/
/*********************文件合并****************************/
fis.match('::package', {
  postpackager: fis.plugin('loader')
});
fis.match('{common.css,resetnew-min.css}', {
  packTo: '/static/aio.css'
});

//fis.match('{zepto.min.js,fastclick.js,getJsonp.js,base.js}', {
//packTo: '/static/aio.js'
//});
