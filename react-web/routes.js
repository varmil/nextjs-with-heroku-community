const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())

// routes.add('blog', '/blog/:slug')
// routes.add('/view/about', '/about-us/:foo(bar|baz)')

// box page
routes.add('/admin/site/edit/home/:slug', '/admin/site/edit/home')
routes.add('/view/home/:slug', '/view/home')

// 投稿詳細
routes.add('/view/post/:boxType/:postId', '/view/post')

// （admin）投稿編集
// routes.add('/admin/post/list/:slug', '/admin/post/list')
routes.add('/admin/post/add/:boxType', '/admin/post/add')
