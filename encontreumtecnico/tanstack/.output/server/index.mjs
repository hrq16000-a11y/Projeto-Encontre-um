globalThis.__nitro_main__ = import.meta.url;
import { H3Core, HTTPError, NodeResponse, composeMiddleware, createMatcherFromFind, defineHandler, defineLazyEventHandler, headers, memoizeRouteRulesMatcher, serve, toEventHandler } from "./_libs/h3+rou3+srvx.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/runtime/internal/polyfills/fast-response.mjs
if (globalThis.Response !== NodeResponse) globalThis.Response = NodeResponse;
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/runtime/_libs/hookable.mjs
function e$1(t, n, r, i) {
	for (let a = r; a < t.length; a += 1) try {
		let r = i ? i.run(() => t[a](...n)) : t[a](...n);
		if (r && typeof r.then == `function`) return Promise.resolve(r).then(() => e$1(t, n, a + 1, i));
	} catch (e) {
		return Promise.reject(e);
	}
}
var t$1 = class {
	_hooks;
	constructor() {
		this._hooks = {};
	}
	hook(e, t) {
		return !e || typeof t != `function` ? () => {} : (this._hooks[e] = this._hooks[e] || [], this._hooks[e].push(t), () => {
			t &&= (this.removeHook(e, t), void 0);
		});
	}
	removeHook(e, t) {
		let n = this._hooks[e];
		if (n) {
			let r = n.indexOf(t);
			r !== -1 && n.splice(r, 1), n.length === 0 && (this._hooks[e] = void 0);
		}
	}
	callHook(t, ...n) {
		let r = this._hooks[t];
		if (r && r.length !== 0) return e$1(r.slice(), n, 0);
	}
};
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/runtime/_libs/ufo.mjs
String.fromCharCode;
var e = /%2f/gi;
function t(e = ``) {
	try {
		return decodeURIComponent(`` + e);
	} catch {
		return `` + e;
	}
}
function n(n) {
	return t(n.replace(e, `%252F`));
}
var r = /\/$|\/\?|\/#/;
var i = /^\.?\//;
function a(e = ``, t) {
	return t ? r.test(e) : e.endsWith(`/`);
}
function o(e = ``, t) {
	if (!t) return (a(e) ? e.slice(0, -1) : e) || `/`;
	if (!a(e, !0)) return e || `/`;
	let n = e, r = ``, i = e.indexOf(`#`);
	i !== -1 && (n = e.slice(0, i), r = e.slice(i));
	let [o, ...s] = n.split(`?`);
	return ((o.endsWith(`/`) ? o.slice(0, -1) : o) || `/`) + (s.length > 0 ? `?${s.join(`?`)}` : ``) + r;
}
function s(e = ``, t) {
	if (!t) return e.endsWith(`/`) ? e : e + `/`;
	if (a(e, !0)) return e || `/`;
	let n = e, r = ``, i = e.indexOf(`#`);
	if (i !== -1 && (n = e.slice(0, i), r = e.slice(i), !n)) return r;
	let [o, ...s] = n.split(`?`);
	return o + `/` + (s.length > 0 ? `?${s.join(`?`)}` : ``) + r;
}
function c(e = ``) {
	return e.startsWith(`/`);
}
function l(e = ``) {
	return c(e) ? e : `/` + e;
}
function u(e) {
	return e && e !== `/`;
}
function d(e, ...t) {
	let n = e || ``;
	for (let e of t.filter((e) => u(e))) if (n) {
		let t = e.replace(i, ``);
		n = s(n) + t;
	} else n = e;
	return n;
}
// #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/PublicAvatar-2UtZdjJM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b4-UI2EMWfcRYQI2sS828wPqIArEIA\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 1460,
		"path": "../public/assets/PublicAvatar-2UtZdjJM.js"
	},
	"/assets/acompanhar-LEjEGcRi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"530-hKEM45Dz1Q+kWgWRUt1TxhQL4iQ\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 1328,
		"path": "../public/assets/acompanhar-LEjEGcRi.js"
	},
	"/assets/admin-CWiY-R0J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab2-IE9gGbhOpDUTZwjZcdth1bsUUho\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 2738,
		"path": "../public/assets/admin-CWiY-R0J.js"
	},
	"/assets/atividades-DyhTv1HK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d56-bltXgwdW9MS73Rtn+bJHs4hxYFo\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 3414,
		"path": "../public/assets/atividades-DyhTv1HK.js"
	},
	"/assets/cadastro-cGo6KCLO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21d3-5EK24oHvfzJtGw59Uk/c2vZ6xW8\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 8659,
		"path": "../public/assets/cadastro-cGo6KCLO.js"
	},
	"/assets/cliente-CX-S_Xj_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d66-BlDLLpsy60uRZXI2144QXUaVUbY\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 7526,
		"path": "../public/assets/cliente-CX-S_Xj_.js"
	},
	"/assets/clientes-BekYidlr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cd-Kxj6UWS8Z96IQeITJuldiBeEzBw\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 1229,
		"path": "../public/assets/clientes-BekYidlr.js"
	},
	"/assets/common-BePezxTY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"499-wEMUiq4StKYxoJlwwVpBjy4EyEE\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 1177,
		"path": "../public/assets/common-BePezxTY.js"
	},
	"/assets/galeria-BvzTjokb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f38-m4x0PJ+wdNgjMelt5ch0RTPGniQ\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 7992,
		"path": "../public/assets/galeria-BvzTjokb.js"
	},
	"/assets/index-Cs0WQTBQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"b8b9-9j8XMgzNbs4OW0vc2mnbI0ZFzGI\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 47289,
		"path": "../public/assets/index-Cs0WQTBQ.css"
	},
	"/assets/index-D6h-LqCt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"43df4-U4MdSj/NuFfvy+oMH8KODnprtX0\"",
		"mtime": "2026-11-09T07:39:43.113Z",
		"size": 278004,
		"path": "../public/assets/index-D6h-LqCt.js"
	},
	"/assets/jsx-runtime-DyZJNswf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2250-Y4A5niW9ypnmvcoz7Q0Moy6R+dY\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 8784,
		"path": "../public/assets/jsx-runtime-DyZJNswf.js"
	},
	"/assets/link-CmEYBlPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7e1-Oy6mDXbe4JpSeqrLrsXcgTwq4P4\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 63457,
		"path": "../public/assets/link-CmEYBlPw.js"
	},
	"/assets/meu-perfil-DMzPOzAZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c36-WWUZv3MJec59MWc2HrqOMNAbet0\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 3126,
		"path": "../public/assets/meu-perfil-DMzPOzAZ.js"
	},
	"/assets/preload-helper-Dbl4Mr0N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc8-hzg7XstkSgPxJ5GUpWjNUTdUN7Y\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 7368,
		"path": "../public/assets/preload-helper-Dbl4Mr0N.js"
	},
	"/assets/routes-2x9bDPrG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4185-S2Y+OX54v6JDWThcmOAJgWaUJAs\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 16773,
		"path": "../public/assets/routes-2x9bDPrG.js"
	},
	"/assets/solicitar._slug-CYozQDey.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3155-NODtvJThh72dGHXV4cWk+ZgOORI\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 12629,
		"path": "../public/assets/solicitar._slug-CYozQDey.js"
	},
	"/assets/tecnico._slug-CBWsgwRO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112c-OKLR3UQQmi/CmJHB5eQPEcCaSVU\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 4396,
		"path": "../public/assets/tecnico._slug-CBWsgwRO.js"
	},
	"/assets/useNavigate-DAdu-vc9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da-P6AG4+kOfTVozeqrkmzL6FazqIs\"",
		"mtime": "2026-11-09T07:39:43.117Z",
		"size": 218,
		"path": "../public/assets/useNavigate-DAdu-vc9.js"
	},
	"/favicon-original.webp": {
		"type": "image/webp",
		"etag": "\"438-MB3NcZxv9mXb+u6u2NgGVmwQoao\"",
		"mtime": "2026-11-09T07:39:44.491Z",
		"size": 1080,
		"path": "../public/favicon-original.webp"
	},
	"/illustrations/hero-tech.svg": {
		"type": "image/svg+xml",
		"etag": "\"ff1-OpgcO6KgHA2qVCMRKKS0InB3Ef0\"",
		"mtime": "2026-11-09T07:39:44.490Z",
		"size": 4081,
		"path": "../public/illustrations/hero-tech.svg"
	},
	"/logo-original.webp": {
		"type": "image/webp",
		"etag": "\"bd6-K418S6v1Hxapsci2cwxEOrfN4jE\"",
		"mtime": "2026-11-09T07:39:44.491Z",
		"size": 3030,
		"path": "../public/logo-original.webp"
	}
};
// #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path)).catch((error) => {
		if (error?.code !== "ENOENT") throw error;
	});
}
// #nitro/virtual/public-assets
var publicAssetBases = { "/assets/": { "maxAge": 31536e3 } };
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
function hasAsset(id = "") {
	return !!(public_assets_data_default[id] || public_assets_data_default[id + ".gz"] || public_assets_data_default[id + ".br"] || public_assets_data_default[id + ".zst"]);
}
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var noCacheHeaders = { "cache-control": "no-store" };
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	const path = l(o(event.url.pathname));
	let id = path.includes("%") ? n(path) : path;
	if (!hasAsset(id) && !hasAsset(d(id, "index.html")) && !isPublicAssetURL(id)) return;
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((entry) => {
		const [name, ...parameters] = entry.split(";");
		const quality = parameters.map((parameter) => parameter.trim().split("=")).find(([key]) => key.toLowerCase() === "q")?.[1];
		const weight = quality === void 0 ? 1 : Number.parseFloat(quality);
		return {
			ext: EncodingMap[name.trim().toLowerCase()],
			weight: Number.isNaN(weight) ? 1 : weight
		};
	}).filter((entry) => entry.ext && entry.weight > 0).sort((a, b) => b.weight - a.weight || (a.ext < b.ext ? -1 : a.ext > b.ext ? 1 : 0)).map((entry) => entry.ext), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, d(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) throw new HTTPError({
			status: 404,
			headers: noCacheHeaders
		});
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	const data = readAsset(id);
	return typeof data?.then === "function" ? data.then((resolved) => assertAssetData(resolved)) : assertAssetData(data);
});
function assertAssetData(data) {
	if (data === null || data === void 0) throw new HTTPError({
		status: 404,
		headers: noCacheHeaders
	});
	return data;
}
// #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = {
		route: "/assets/**",
		rank: 0,
		rules: [{
			name: "headers",
			route: "/assets/**",
			handler: headers,
			options: { "cache-control": "public, max-age=31536000, immutable" }
		}]
	};
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		let s = p.split("/");
		let l = s.length;
		let _w;
		if (l > 1) {
			if (s[1] === "assets") r.push(l > 2 ? {
				data: $0,
				params: {
					"0": _w = p.slice(8),
					_: _w
				}
			} : {
				data: $0,
				params: {}
			});
		}
		return r.reverse();
	};
})();
var _lazy_cc7cb5d3f295396c = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_cc7cb5d3f295396c
	};
	return ((_m, p) => {
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		const w = p.slice(1);
		return {
			data,
			params: w ? {
				"0": w,
				_: w
			} : {}
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/runtime/internal/error/utils.mjs
function createErrorHeaders(error, event, unhandled) {
	const headers = new Headers(unhandled ? {} : error.headers);
	const errHeaders = event.res?.errHeaders;
	if (errHeaders) for (const [name, value] of errHeaders) if (name === "set-cookie") headers.append(name, value);
	else headers.set(name, value);
	return headers;
}
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = createErrorHeaders(error, event, unhandled);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
// #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
// #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => {
		event.context.routeRules = getRouteRules(event.req.method, event.url.pathname).routeRules;
		if (event.req.method === "HEAD") {
			const route = findRoute("HEAD", event.url.pathname);
			return route?.data.method ? route : findRoute("GET", event.url.pathname);
		}
		return findRoute(event.req.method, event.url.pathname);
	};
	h3App["~middleware"].push(createRouteRulesMiddleware());
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~middleware"].push(createCacheRuleMiddleware());
	return h3App;
}
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new t$1();
}
function getRouteRules(method, pathname) {
	return matchRouteRules(method, pathname);
}
function createRouteRulesMiddleware() {
	const middleware = (event, next) => {
		const { rules, cache } = resolveRouteRuleChains(event.req.method, event.url.pathname);
		if (cache) event[kCacheRule] = cache;
		return rules ? rules(event, next) : next();
	};
	return markUntraced(middleware);
}
function createCacheRuleMiddleware() {
	const middleware = (event, next) => {
		const cache = event[kCacheRule];
		return cache ? cache(event, next) : next();
	};
	return markUntraced(middleware);
}
var _matchRouteRules;
function matchRouteRules(method, pathname) {
	return (_matchRouteRules ??= memoizeRouteRulesMatcher(createMatcherFromFind(findRouteRules)))(method, pathname);
}
var kCacheRule = /* @__PURE__ */ Symbol("nitro.cacheRule");
var _routeRuleChains = /* @__PURE__ */ new WeakMap();
function resolveRouteRuleChains(method, pathname) {
	const { matchedRules, routeRuleMiddleware } = matchRouteRules(method, pathname);
	if (routeRuleMiddleware.length === 0) return {};
	let chains = _routeRuleChains.get(routeRuleMiddleware);
	if (!chains) {
		const hasCache = !!matchedRules.cache?.handler;
		const rules = hasCache ? routeRuleMiddleware.slice(0, -1) : routeRuleMiddleware;
		chains = {
			rules: rules.length > 0 ? composeMiddleware(rules) : void 0,
			cache: hasCache ? routeRuleMiddleware.at(-1) : void 0
		};
		_routeRuleChains.set(routeRuleMiddleware, chains);
	}
	return chains;
}
function markUntraced(middleware) {
	middleware.__traced__ = true;
	return middleware;
}
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
// #nitro/virtual/server-entry
var serverEntryOptions = {};
// #nitro/virtual/tracing
var tracingSrvxPlugins = [];
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/runtime/internal/serve.mjs
function resolveServeOptions(opts) {
	const { port, hostname, tls, ...entryOptions } = serverEntryOptions;
	const env = globalThis.process?.env || {};
	const _parsedPort = Number.parseInt(env.NITRO_PORT ?? env.PORT ?? "");
	const cert = env.NITRO_SSL_CERT;
	const key = env.NITRO_SSL_KEY;
	const socketPath = env.NITRO_UNIX_SOCKET;
	const resolved = {
		...entryOptions,
		port: Number.isNaN(_parsedPort) ? port ?? 3e3 : _parsedPort,
		hostname: env.NITRO_HOST || env.HOST || hostname,
		tls: cert && key ? {
			cert,
			key
		} : tls,
		...opts,
		plugins: [...tracingSrvxPlugins, ...opts.plugins || []]
	};
	for (const runtime of [
		"node",
		"bun",
		"deno"
	]) if (entryOptions[runtime] && opts[runtime]) resolved[runtime] = {
		...entryOptions[runtime],
		...opts[runtime]
	};
	if (socketPath) {
		resolved.node = {
			...resolved.node,
			path: socketPath
		};
		resolved.bun = {
			...resolved.bun,
			unix: socketPath
		};
		resolved.deno = {
			...resolved.deno,
			path: socketPath
		};
	}
	return resolved;
}
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/runtime/internal/shutdown.mjs
function setupCloseHooks(server) {
	const closeServer = server.close.bind(server);
	let closeHooks;
	server.close = (closeActiveConnections) => closeServer(closeActiveConnections).finally(() => closeHooks ??= callCloseHooks());
}
async function callCloseHooks() {
	try {
		await useNitroHooks().callHook("close");
	} catch (error) {
		console.error("[nitro] Error while calling `close` hooks:", error);
	}
}
// node_modules/.pnpm/nitro@3.0.261103-rc/node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var nitroApp = useNitroApp();
var server = serve(resolveServeOptions({ fetch: nitroApp.fetch }));
server.ready().catch((error) => {
	console.error("[nitro] Failed to start server:", error);
	process.exit(1);
});
setupCloseHooks(server);
trapUnhandledErrors();
var node_server_default = {};
export { node_server_default as default };
