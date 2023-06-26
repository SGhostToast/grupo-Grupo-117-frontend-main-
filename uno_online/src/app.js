import koa from "koa"
import KoaLogger from "koa-logger"
import {koaBody} from "koa-body"
import koaRouter from "koa-router"
import render from "koa-ejs"

import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new koa();
const router = new koaRouter();

render(app, {
    root: path.join(__dirname, 'views'),
    layout:'layout',
    viewExt:'html',
    cache:false,
    debug:false
})


app.use(router.routes()).use(router.allowedMethods())
// router.get('/test', async ctx => ctx.body = "This is coming from a test endpoint")


app.use(KoaLogger());
app.use(koaBody());

app.use(async (ctx, next) => {
    await ctx.render("/index")
})

let port = 3000;
app.listen(port, () => {
  console.log("Iniciando app en puerto " + String(port));
})
