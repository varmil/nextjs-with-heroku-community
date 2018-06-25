const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())

// routes.add('blog', '/blog/:slug')
// routes.add('/view/about', '/about-us/:foo(bar|baz)')

// box page
routes.add('/home/:slug', 'home')
