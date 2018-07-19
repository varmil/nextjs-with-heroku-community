const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())

// routes.add('/view/about', '/about-us/:foo(bar|baz)')

// signup (with invitation)
routes.add('/view/signup/:code', '/view/signup')

// box page
routes.add('/admin/site/edit/home/:slug', '/admin/site/edit/home')
routes.add('/view/home/:slug', '/view/home')

// 投稿詳細
routes.add('/view/post/:boxType/:postId', '/view/post')
routes.add('/view/post/:id/voice/option', '/view/post/voice/option')
routes.add('/view/post/:id/voice/result', '/view/post/voice/result')

// （admin）記事一覧
routes.add('/admin/post/list/:pageNum', '/admin/post/list')
// （admin）投稿編集
// postIdがある == 下書き or 記事Update
routes.add('/admin/post/add/:boxType', '/admin/post/add')
routes.add('/admin/post/add/:boxType/:postId', '/admin/post/add')

// （admin）ファン一覧
routes.add('/admin/fan/list/:pageNum', '/admin/fan/list')
