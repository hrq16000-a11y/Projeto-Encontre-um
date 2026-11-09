import { __toESM } from "../_runtime.mjs";
import { TSS_SERVER_FUNCTION, createServerFn, getServerFnById } from "./ssr.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
import { HeadContent, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "../_libs/@tanstack/react-router+[4...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
import { Outlet } from "../_libs/@tanstack/react-router+[2...].mjs";
import { redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { Analytics } from "../_libs/vercel__analytics.mjs";
import { get, list, put } from "../_libs/@vercel/blob+[...].mjs";
import { SignJWT, createRemoteJWKSet, jwtVerify } from "../_libs/jose.mjs";
import { createHash, randomUUID } from "node:crypto";
// node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-CsxL3qfE.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
// node_modules/.nitro/vite/services/ssr/assets/router-cwxiULZD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function ServiceIcon({ name, size = 24, className = "" }) {
	const common = {
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.8,
		strokeLinecap: "round",
		strokeLinejoin: "round"
	};
	const paths = {
		laptop: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "4",
			y: "4",
			width: "16",
			height: "12",
			rx: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 20h20l-2-4H4l-2 4Z M9 19h6" })] }),
		desktop: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "13",
			rx: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 16v5 M7 21h10 M7 8h10" })] }),
		wifi: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 9a16 16 0 0 1 20 0 M5 12a11 11 0 0 1 14 0 M8 15a6 6 0 0 1 8 0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "19",
			r: "1",
			fill: "currentColor",
			stroke: "none"
		})] }),
		printer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 9V3h12v6 M6 18H4a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2h-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 15h12v6H6z M17 12h1" })] }),
		shield: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2 4 5v6c0 6 4 9 8 11 4-2 8-5 8-11V5l-8-3Z M9 12l2 2 4-4" }) }),
		server: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "4",
				y: "3",
				width: "16",
				height: "7",
				rx: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "4",
				y: "14",
				width: "16",
				height: "7",
				rx: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 6.5h.01 M8 17.5h.01 M12 6.5h5 M12 17.5h5" })
		] }),
		smartphone: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "7",
			y: "2",
			width: "10",
			height: "20",
			rx: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11 18h2 M10 5h4" })] }),
		support: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 14v-3a8 8 0 0 1 16 0v3 M4 13h2v6H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z M18 13h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2v-6Z M19 19c0 2-3 3-7 3" }) }),
		search: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "10.5",
			cy: "10.5",
			r: "7.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m16 16 5 5" })] }),
		location: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "10",
			r: "2.5"
		})] }),
		arrow: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 12h16 M14 6l6 6-6 6" }) }),
		check: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m5 12 5 5L20 7" }) }),
		menu: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 6h16 M4 12h16 M4 18h16" }) }),
		chevron: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" }) }),
		user: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "8",
			r: "4"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 21c0-4 3.6-7 8-7s8 3 8 7" })] }),
		briefcase: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "3",
			y: "7",
			width: "18",
			height: "14",
			rx: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M3 13h18 M10 13v2h4v-2" })] }),
		spark: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z M20 17l.8 2.2L23 20l-2.2.8L20 23l-.8-2.2L18 20l2.2-.8L20 17Z" }) })
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		className,
		"aria-hidden": "true",
		...common,
		children: paths[name]
	});
}
var logo = "/logo-original.webp";
var Route$30 = createRootRoute({
	head: () => ({ meta: [
		{ charSet: "utf-8" },
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		},
		{
			name: "description",
			content: "Encontre um Técnico: pesquise profissionais independentes de informática e tecnologia, conheça perfis e negocie o atendimento diretamente."
		},
		{ title: "Encontre um Técnico | Profissionais de informática e tecnologia" }
	] }),
	component: Root
});
function Root() {
	const [menu, setMenu] = (0, import_react.useState)(false);
	const close = () => setMenu(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Document, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: "#main-content",
		className: "skip-to-content",
		children: "Pular para o conteúdo"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "site-topbar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container topbar-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
						name: "spark",
						size: 15
					}), " Plataforma de conexão entre clientes e técnicos independentes"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://encontreumtecnico.com/",
						target: "_blank",
						rel: "noopener noreferrer",
						children: ["Portal original ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "arrow",
							size: 14
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "container nav",
					"aria-label": "Navegação principal",
					onKeyDown: (event) => {
						if (event.key === "Escape") setMenu(false);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							"aria-label": "Encontre um Técnico - início",
							className: "logo",
							onClick: close,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: logo,
								alt: "Encontre um Técnico",
								width: 260,
								height: 39
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mobile-menu-button",
							"aria-label": menu ? "Fechar menu" : "Abrir menu",
							"aria-expanded": menu,
							"aria-controls": "main-navigation",
							onClick: () => setMenu((m) => !m),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "menu",
								size: 25
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "main-navigation",
							className: "nav-links" + (menu ? " expanded" : ""),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									activeOptions: { exact: true },
									onClick: close,
									children: "Início"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/galeria",
									search: {
										q: "",
										city: ""
									},
									onClick: close,
									children: "Encontrar técnico"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/atividades",
									onClick: close,
									children: "Solicitações"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/cliente",
									onClick: close,
									children: "Para clientes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/cadastro",
									className: "nav-button",
									onClick: close,
									children: ["Sou técnico ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "arrow",
										size: 16
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "main-content",
				tabIndex: -1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container footer-main",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							"aria-label": "Encontre um Técnico",
							className: "footer-logo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								width: 220,
								height: 33,
								src: logo,
								alt: "Encontre um Técnico"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Conectamos pessoas e técnicos independentes de informática e tecnologia, com liberdade para negociar diretamente." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Encontre" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/galeria",
								search: {
									q: "",
									city: ""
								},
								children: "Buscar profissionais"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/atividades",
								children: "Solicitações"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cliente",
								children: "Área do cliente"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Sou técnico" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cadastro",
								children: "Cadastrar gratuitamente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/acompanhar",
								children: "Acompanhar cadastro"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/meu-perfil",
								children: "Gerenciar perfil"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Portal" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								children: "Administração"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://encontreumtecnico.com/",
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Versão original WordPress"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contas antigas ainda em migração" })
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container footer-bottom",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Encontre um Técnico. Plataforma de conexão entre profissionais e clientes."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Versão de homologação — funcionalidades históricas em migração" })]
				})]
			})
		]
	})] });
}
function Document({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
			rel: "icon",
			type: "image/webp",
			href: "/favicon-original.webp"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Analytics, {})
		] })]
	});
}
var $$splitComponentImporter$10 = () => import("./routes-CbhG_EbE.mjs");
var Route$29 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./acompanhar-BVo6L3aM.mjs");
var Route$28 = createFileRoute("/acompanhar")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin-CwD_LJz7.mjs");
var Route$27 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var Route$26 = createFileRoute("/admin-portal")({ beforeLoad: () => {
	throw redirect({ to: "/admin" });
} });
var $$splitComponentImporter$7 = () => import("./atividades-D2xhmJRb.mjs");
var loadJobs = createServerFn({ method: "GET" }).handler(createSsrRpc("5716267659b7c63a950032b91c0fd44d353595e0c37d6ad84a440aecebd505d8"));
var Route$25 = createFileRoute("/atividades")({
	loader: () => loadJobs(),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./cadastro-B7ibQgW-.mjs");
var Route$24 = createFileRoute("/cadastro")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./cliente-B8USyv5X.mjs");
var Route$23 = createFileRoute("/cliente")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./clientes-BseJwWk2.mjs");
var getClients = createServerFn({ method: "GET" }).handler(createSsrRpc("219252b26b65dfe1c9c4db689f3fb26d36f322e717a0212907be87a7d71e1820"));
var Route$22 = createFileRoute("/clientes")({
	loader: () => getClients(),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./galeria-Dzq0O1-V.mjs");
var getProfiles = createServerFn({ method: "GET" }).handler(createSsrRpc("8ea2425755b513c9ccd3cf190e9f0fd5f02b9b1b0d9dfcb9956fe8692a998f26"));
var Route$21 = createFileRoute("/galeria")({
	validateSearch: (search) => ({
		q: typeof search.q === "string" ? search.q.slice(0, 90) : "",
		city: typeof search.city === "string" ? search.city.slice(0, 90) : ""
	}),
	loader: () => getProfiles(),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./meu-perfil-2oA_kYs7.mjs");
var Route$20 = createFileRoute("/meu-perfil")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var ORIGIN$1 = "https://encontreumtecnico-migracao-git-feat-encontreumtec-211d15-msolus.vercel.app";
var VALID = /* @__PURE__ */ new Set([
	"cadastro",
	"tecnicos",
	"profissionais",
	"perfil",
	"status",
	"cliente",
	"clientes",
	"solicitacoes",
	"minhas-solicitacoes",
	"admin",
	"admin-portal",
	"health"
]);
async function forward(request, endpoint) {
	if (!VALID.has(endpoint)) return new Response(JSON.stringify({ erro: "Rota inválida" }), { status: 404 });
	const target = new URL("/api/" + endpoint, ORIGIN$1);
	target.search = new URL(request.url).search;
	const headers = new Headers({ Accept: "application/json" });
	const ct = request.headers.get("content-type");
	if (ct) headers.set("Content-Type", ct);
	const auth = request.headers.get("authorization");
	if (auth?.startsWith("Bearer ") && auth.length < 1e3) headers.set("Authorization", auth);
	try {
		const res = await fetch(target, {
			method: request.method,
			headers,
			body: ["GET", "HEAD"].includes(request.method) ? void 0 : await request.text(),
			cache: "no-store",
			signal: AbortSignal.timeout(12e3)
		});
		const body = await res.text();
		return new Response(body, {
			status: res.status,
			headers: {
				"Content-Type": res.headers.get("content-type") || "application/json",
				"Cache-Control": "no-store",
				"X-Robots-Tag": "noindex,nofollow"
			}
		});
	} catch {
		return new Response(JSON.stringify({ erro: "Serviço temporariamente indisponível" }), {
			status: 503,
			headers: { "Content-Type": "application/json" }
		});
	}
}
var Route$19 = createFileRoute("/api/admin")({ server: { handlers: {
	GET: ({ request }) => forward(request, "admin"),
	POST: ({ request }) => forward(request, "admin"),
	PUT: ({ request }) => forward(request, "admin"),
	DELETE: ({ request }) => forward(request, "admin")
} } });
var Route$18 = createFileRoute("/api/admin-portal")({ server: { handlers: {
	GET: ({ request }) => forward(request, "admin-portal"),
	POST: ({ request }) => forward(request, "admin-portal"),
	PUT: ({ request }) => forward(request, "admin-portal"),
	DELETE: ({ request }) => forward(request, "admin-portal")
} } });
var Route$17 = createFileRoute("/api/cadastro")({ server: { handlers: {
	GET: ({ request }) => forward(request, "cadastro"),
	POST: ({ request }) => forward(request, "cadastro"),
	PUT: ({ request }) => forward(request, "cadastro"),
	DELETE: ({ request }) => forward(request, "cadastro")
} } });
var Route$16 = createFileRoute("/api/cliente")({ server: { handlers: {
	GET: ({ request }) => forward(request, "cliente"),
	POST: ({ request }) => forward(request, "cliente"),
	PUT: ({ request }) => forward(request, "cliente"),
	DELETE: ({ request }) => forward(request, "cliente")
} } });
var Route$15 = createFileRoute("/api/clientes")({ server: { handlers: {
	GET: ({ request }) => forward(request, "clientes"),
	POST: ({ request }) => forward(request, "clientes"),
	PUT: ({ request }) => forward(request, "clientes"),
	DELETE: ({ request }) => forward(request, "clientes")
} } });
var Route$14 = createFileRoute("/api/health")({ server: { handlers: {
	GET: ({ request }) => forward(request, "health"),
	POST: ({ request }) => forward(request, "health"),
	PUT: ({ request }) => forward(request, "health"),
	DELETE: ({ request }) => forward(request, "health")
} } });
var Route$13 = createFileRoute("/api/minhas-solicitacoes")({ server: { handlers: {
	GET: ({ request }) => forward(request, "minhas-solicitacoes"),
	POST: ({ request }) => forward(request, "minhas-solicitacoes"),
	PUT: ({ request }) => forward(request, "minhas-solicitacoes"),
	DELETE: ({ request }) => forward(request, "minhas-solicitacoes")
} } });
var Route$12 = createFileRoute("/api/perfil")({ server: { handlers: {
	GET: ({ request }) => forward(request, "perfil"),
	POST: ({ request }) => forward(request, "perfil"),
	PUT: ({ request }) => forward(request, "perfil"),
	DELETE: ({ request }) => forward(request, "perfil")
} } });
var Route$11 = createFileRoute("/api/profissionais")({ server: { handlers: {
	GET: ({ request }) => forward(request, "profissionais"),
	POST: ({ request }) => forward(request, "profissionais"),
	PUT: ({ request }) => forward(request, "profissionais"),
	DELETE: ({ request }) => forward(request, "profissionais")
} } });
var Route$10 = createFileRoute("/api/solicitacoes")({ server: { handlers: {
	GET: ({ request }) => forward(request, "solicitacoes"),
	POST: ({ request }) => forward(request, "solicitacoes"),
	PUT: ({ request }) => forward(request, "solicitacoes"),
	DELETE: ({ request }) => forward(request, "solicitacoes")
} } });
var Route$9 = createFileRoute("/api/status")({ server: { handlers: {
	GET: ({ request }) => forward(request, "status"),
	POST: ({ request }) => forward(request, "status"),
	PUT: ({ request }) => forward(request, "status"),
	DELETE: ({ request }) => forward(request, "status")
} } });
var Route$8 = createFileRoute("/api/tecnicos")({ server: { handlers: {
	GET: ({ request }) => forward(request, "tecnicos"),
	POST: ({ request }) => forward(request, "tecnicos"),
	PUT: ({ request }) => forward(request, "tecnicos"),
	DELETE: ({ request }) => forward(request, "tecnicos")
} } });
var COOKIE = "__Host-eut-session";
var ISSUER = "encontreumtecnico-tanstack";
var GOOGLE_ISSUERS = ["https://accounts.google.com", "accounts.google.com"];
var KEYSET = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));
var secret = () => process.env.AUTH_SESSION_SECRET || "";
var key = () => new TextEncoder().encode(secret());
function googleConfigured() {
	return Boolean(process.env.GOOGLE_CLIENT_ID && secret().length >= 32);
}
function publicGoogleConfig() {
	return {
		enabled: googleConfigured(),
		clientId: googleConfigured() ? process.env.GOOGLE_CLIENT_ID : ""
	};
}
async function verifyCredential(credential) {
	if (!googleConfigured()) throw Error("Google não configurado no ambiente");
	const claim = (await jwtVerify(credential, KEYSET, {
		audience: process.env.GOOGLE_CLIENT_ID,
		issuer: GOOGLE_ISSUERS,
		algorithms: ["RS256"],
		clockTolerance: 30
	})).payload;
	if (claim.email_verified !== true || typeof claim.email !== "string" || !claim.email.trim() || typeof claim.sub !== "string" || !claim.sub) throw Error("Conta Google não verificada");
	return {
		sub: claim.sub,
		email: claim.email.toLowerCase(),
		name: typeof claim.name === "string" ? claim.name.slice(0, 100) : "Cliente",
		role: "cliente"
	};
}
async function makeCookie(session) {
	const token = await new SignJWT({ ...session }).setProtectedHeader({
		alg: "HS256",
		typ: "JWT"
	}).setIssuer(ISSUER).setAudience(ISSUER).setIssuedAt().setExpirationTime("8h").sign(key());
	return COOKIE + "=" + token + "; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=28800";
}
var clearCookie = () => COOKIE + "=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0";
async function readGoogleSession(request) {
	if (!googleConfigured()) return null;
	const found = request.headers.get("cookie")?.split(";").map((s) => s.trim()).find((s) => s.startsWith(COOKIE + "="));
	if (!found) return null;
	const token = found.slice(19);
	if (token.length > 4e3) return null;
	try {
		const { payload } = await jwtVerify(token, key(), {
			issuer: ISSUER,
			audience: ISSUER,
			algorithms: ["HS256"]
		});
		if (typeof payload.sub !== "string" || typeof payload.email !== "string" || payload.role !== "cliente") return null;
		return {
			sub: payload.sub,
			email: payload.email,
			name: String(payload.name || "Cliente"),
			role: "cliente"
		};
	} catch {
		return null;
	}
}
function requireSameOrigin(request) {
	const origin = request.headers.get("origin");
	return !origin || origin === new URL(request.url).origin;
}
function noStoreJSON(data, status = 200, extra = {}) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "no-store",
			"X-Robots-Tag": "noindex,nofollow",
			...extra
		}
	});
}
var states = new Set("AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO".split(" "));
function clip(input, max = 100) {
	return typeof input === "string" ? input.trim().replace(/\s+/g, " ").slice(0, max) : "";
}
function validateTriage(raw) {
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { error: "Formulário inválido." };
	const x = raw;
	const tecnico = clip(x.tecnico, 160), categoria = clip(x.categoria, 90), equipamento = clip(x.equipamento, 100), fabricante = clip(x.fabricante, 80);
	const problema = clip(x.problema, 1200), cidade = clip(x.cidade, 90), uf = clip(x.uf, 2).toUpperCase();
	const bairro = clip(x.bairro, 90), cep = clip(x.cep, 10).replace(/\D/g, ""), endereco = clip(x.endereco, 180);
	const modalidade = [
		"presencial",
		"remoto",
		"a-combinar"
	].includes(String(x.modalidade)) ? x.modalidade : "a-combinar";
	if (!/^[a-z0-9._%-]{2,160}$/i.test(tecnico)) return { error: "Técnico inválido." };
	if (categoria.length < 3 || problema.length < 20 || cidade.length < 2 || !states.has(uf)) return { error: "Informe serviço, detalhes do problema, cidade e UF." };
	if (x.aceite !== true || x.confirmouLocalizacao !== true) return { error: "Confirme os dados e autorize a triagem privada." };
	const compartilharEndereco = x.compartilharEndereco === true;
	if (!compartilharEndereco && endereco) return { error: "Endereço preenchido exige autorização para compartilhar." };
	const compartilharGps = x.compartilharGps === true;
	const latitude = typeof x.latitude === "number" ? x.latitude : void 0;
	const longitude = typeof x.longitude === "number" ? x.longitude : void 0;
	if ((latitude !== void 0 || longitude !== void 0) && !compartilharGps) return { error: "Coordenadas exigem autorização explícita." };
	if (compartilharGps && latitude !== void 0 && longitude !== void 0 && (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180)) return { error: "Coordenadas inválidas." };
	return { value: {
		tecnico,
		categoria,
		equipamento,
		fabricante,
		problema,
		cidade,
		uf,
		bairro,
		cep,
		endereco: compartilharEndereco ? endereco : "",
		modalidade,
		compartilharEndereco,
		compartilharGps,
		latitude: compartilharGps ? latitude : void 0,
		longitude: compartilharGps ? longitude : void 0,
		aceite: true,
		confirmouLocalizacao: true
	} };
}
function triageText(v) {
	return [
		"Olá! Encontrei seu perfil no Encontre um Técnico e gostaria de solicitar um atendimento.",
		"",
		"Serviço: " + v.categoria,
		v.equipamento ? "Equipamento: " + v.equipamento : "",
		v.fabricante ? "Modelo/fabricante: " + v.fabricante : "",
		"Problema: " + v.problema,
		"Modalidade: " + (v.modalidade === "a-combinar" ? "A combinar" : v.modalidade),
		"Localidade: " + [
			v.bairro,
			v.cidade,
			v.uf
		].filter(Boolean).join(" / "),
		v.cep ? "CEP: " + v.cep : "",
		v.compartilharEndereco && v.endereco ? "Endereço informado pelo cliente: " + v.endereco : "",
		"Podemos conversar sobre disponibilidade, valores e condições?"
	].filter((line, i) => Boolean(line) || i === 1).join("\n").slice(0, 2800);
}
function whatsAppLink(phone, text) {
	const normalized = String(phone || "").replace(/\D/g, "");
	if (!/^(?:55)?[1-9]\d9\d{8}$/.test(normalized)) return null;
	return "https://wa.me/" + (normalized.length === 13 && normalized.startsWith("55") ? normalized : "55" + normalized) + "?text=" + encodeURIComponent(text);
}
async function approvedTarget(slug) {
	if (/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(slug)) {
		const blob = await get("encontreumtecnico/v1/approved/" + slug + ".json", {
			access: "private",
			useCache: false
		});
		if (!blob?.stream) return null;
		const record = JSON.parse(await new Response(blob.stream).text());
		return record.status === "approved" && record.id === slug ? {
			id: slug,
			nome: record.nome,
			whatsapp: record.whatsapp || ""
		} : null;
	}
	const res = await fetch("https://encontreumtecnico-migracao-git-feat-encontreumtec-211d15-msolus.vercel.app/api/profissionais", { signal: AbortSignal.timeout(9e3) });
	if (!res.ok) return null;
	const target = ((await res.json()).profissionais || []).find((p) => p.url === "https://encontreumtecnico.com/tecnico/" + slug + "/");
	return target ? {
		id: slug,
		nome: target.nome || slug
	} : null;
}
var Route$7 = createFileRoute("/api/triagem")({ server: { handlers: { POST: async ({ request }) => {
	if (!requireSameOrigin(request)) return noStoreJSON({ erro: "Origem inválida." }, 403);
	if (!googleConfigured()) return noStoreJSON({ erro: "Login Google ainda precisa ser configurado." }, 503);
	const account = await readGoogleSession(request);
	if (!account) return noStoreJSON({ erro: "Entre com sua conta Google para solicitar contato." }, 401);
	if (!process.env.BLOB_READ_WRITE_TOKEN) return noStoreJSON({ erro: "Armazenamento privado ainda não configurado." }, 503);
	let raw;
	try {
		const text = await request.text();
		if (text.length > 13e3) return noStoreJSON({ erro: "Descrição extensa demais." }, 413);
		raw = JSON.parse(text);
	} catch {
		return noStoreJSON({ erro: "Formulário inválido." }, 400);
	}
	const validated = validateTriage(raw);
	if (!validated.value) return noStoreJSON({ erro: validated.error || "Triagem inválida" }, 400);
	const v = validated.value;
	try {
		const target = await approvedTarget(v.tecnico);
		if (!target) return noStoreJSON({ erro: "Técnico não encontrado entre os perfis aprovados." }, 404);
		const clientHash = createHash("sha256").update(account.sub).digest("hex").slice(0, 32);
		const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const prefix = "encontreumtecnico/v2/triage/by-client/" + clientHash + "/" + today + "/";
		if ((await list({
			prefix,
			limit: 10
		})).blobs.length >= 8) return noStoreJSON({ erro: "Limite diário de solicitações atingido. Tente outro dia." }, 429);
		const id = randomUUID();
		const record = {
			id,
			portal: "encontreumtecnico",
			status: "pendente",
			tecnicoId: target.id,
			tecnicoNome: target.nome,
			clienteGoogleSub: account.sub,
			clienteNome: account.name,
			clienteEmail: account.email,
			tipo: "contato-direto-triado",
			triagem: v,
			criadoEm: (/* @__PURE__ */ new Date()).toISOString()
		};
		await put(prefix + id + ".json", JSON.stringify(record), {
			access: "private",
			contentType: "application/json",
			addRandomSuffix: false
		});
		const link = target.whatsapp ? whatsAppLink(target.whatsapp, triageText(v)) : null;
		return noStoreJSON({
			sucesso: true,
			protocolo: id,
			contatoDisponivel: Boolean(link),
			linkWhatsapp: link,
			mensagem: link ? "Solicitação salva. Abra o WhatsApp com a mensagem já preenchida." : "Solicitação salva. O perfil histórico ainda não possui contato privado importado."
		}, 201);
	} catch {
		return noStoreJSON({ erro: "Não foi possível registrar a solicitação. Tente novamente." }, 503);
	}
} } } });
var $$splitComponentImporter$1 = () => import("./solicitar._slug-BSofCPdQ.mjs");
var Route$6 = createFileRoute("/solicitar/$slug")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./tecnico._slug-CYJDpM-3.mjs");
var getProfile = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("8a972738fc4c1680a65442a65c4b1656c589ab0bb03bdb09c9d72d58a1acf31f"));
var Route$5 = createFileRoute("/tecnico/$slug")({
	loader: ({ params }) => getProfile({ data: params.slug }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$4 = createFileRoute("/api/auth/config")({ server: { handlers: { GET: () => noStoreJSON(publicGoogleConfig()) } } });
var Route$3 = createFileRoute("/api/auth/google")({ server: { handlers: { POST: async ({ request }) => {
	if (!requireSameOrigin(request)) return noStoreJSON({ erro: "Origem inválida" }, 403);
	if (!googleConfigured()) return noStoreJSON({ erro: "Login Google aguardando configuração segura no domínio Vercel" }, 503);
	let credential = "";
	try {
		const raw = await request.text();
		if (raw.length > 12e3) return noStoreJSON({ erro: "Credencial extensa demais" }, 413);
		const data = JSON.parse(raw);
		credential = typeof data.credential === "string" ? data.credential : "";
	} catch {
		return noStoreJSON({ erro: "Credencial inválida" }, 400);
	}
	if (!credential || credential.length > 8e3) return noStoreJSON({ erro: "Credencial inválida" }, 400);
	try {
		const user = await verifyCredential(credential);
		return noStoreJSON({
			autenticado: true,
			usuario: {
				nome: user.name,
				email: user.email
			}
		}, 200, { "Set-Cookie": await makeCookie(user) });
	} catch {
		return noStoreJSON({ erro: "Não foi possível validar sua conta Google" }, 401);
	}
} } } });
var Route$2 = createFileRoute("/api/auth/logout")({ server: { handlers: { POST: ({ request }) => !requireSameOrigin(request) ? noStoreJSON({ erro: "Origem inválida" }, 403) : noStoreJSON({ autenticado: false }, 200, { "Set-Cookie": clearCookie() }) } } });
var Route$1 = createFileRoute("/api/auth/session")({ server: { handlers: { GET: async ({ request }) => {
	const user = await readGoogleSession(request);
	return noStoreJSON({
		autenticado: Boolean(user),
		usuario: user ? {
			nome: user.name,
			email: user.email
		} : null
	});
} } } });
var ORIGIN = "https://encontreumtecnico.com";
var validSlug = (value) => /^[a-z0-9._-]{2,160}$/i.test(value);
function decode(value) {
	return value.replace(/&amp;/gi, "&").replace(/&quot;/gi, "\"").replace(/&#39;/gi, "'");
}
function safeAvatarURL(src) {
	try {
		const url = new URL(decode(src), ORIGIN);
		if (url.protocol !== "https:") return null;
		if (![
			"encontreumtecnico.com",
			"www.encontreumtecnico.com",
			"secure.gravatar.com"
		].includes(url.hostname)) return null;
		if (/(?:logo|favicon|placeholder|default-avatar|banner|site-icon)/i.test(url.pathname)) return null;
		if (url.hostname !== "secure.gravatar.com" && !/\/wp-content\/uploads\/|\/avatar|\/profile|\/candidate/i.test(url.pathname)) return null;
		if (url.href.length > 550) return null;
		return url.href;
	} catch {
		return null;
	}
}
function attr(tag, key) {
	return new RegExp("(?:^|\\s)" + key + "\\s*=\\s*[\"\\x27]([^\"\\x27]{1,600})[\"\\x27]", "i").exec(tag)?.[1] || "";
}
function extractPublicAvatar(html) {
	if (typeof html !== "string" || html.length > 16e5) return null;
	for (const match of html.matchAll(/<img\b[^>]{0,2200}>/gi)) {
		const tag = match[0];
		const mark = [
			attr(tag, "class"),
			attr(tag, "id"),
			attr(tag, "alt")
		].join(" ");
		if (!/(candidate|avatar|profile-photo|user-photo|author-photo|user[_ -]?image|profile-img)/i.test(mark)) continue;
		if (/(logo|banner|footer|header|advertising)/i.test(mark)) continue;
		const found = safeAvatarURL(attr(tag, "data-src") || attr(tag, "src") || attr(tag, "data-lazy-src") || attr(tag, "srcset").split(/[,\s]/)[0]);
		if (found) return found;
	}
	for (const match of html.matchAll(/<meta\b[^>]{0,2000}>/gi)) {
		const tag = match[0];
		const marker = attr(tag, "property") || attr(tag, "name");
		if (!["og:image", "twitter:image"].includes(marker)) continue;
		const src = attr(tag, "content");
		if (!/(candidate|avatar|user|profile)/i.test(src)) continue;
		const found = safeAvatarURL(src);
		if (found) return found;
	}
	return null;
}
async function publicAvatarResponse(slug) {
	const headers = {
		"Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
		"X-Robots-Tag": "noindex,nofollow"
	};
	if (!validSlug(slug)) return new Response(null, {
		status: 404,
		headers
	});
	try {
		const response = await fetch(ORIGIN + "/tecnico/" + slug + "/", {
			method: "GET",
			headers: {
				Accept: "text/html",
				"User-Agent": "EncontreUmTecnico-Avatar/1.0"
			},
			signal: AbortSignal.timeout(4500),
			redirect: "manual"
		});
		if (!response.ok || !(response.headers.get("content-type") || "").includes("text/html")) return new Response(null, {
			status: 204,
			headers
		});
		const avatar = extractPublicAvatar((await response.text()).slice(0, 1600001));
		return avatar ? new Response(null, {
			status: 302,
			headers: {
				...headers,
				Location: avatar
			}
		}) : new Response(null, {
			status: 204,
			headers
		});
	} catch {
		return new Response(null, {
			status: 204,
			headers
		});
	}
}
var Route = createFileRoute("/api/avatar/$slug")({ server: { handlers: { GET: ({ params }) => publicAvatarResponse(params.slug) } } });
var rootRouteChildren = {
	IndexRoute: Route$29.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$30
	}),
	AcompanharRoute: Route$28.update({
		id: "/acompanhar",
		path: "/acompanhar",
		getParentRoute: () => Route$30
	}),
	AdminRoute: Route$27.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$30
	}),
	AdminPortalRoute: Route$26.update({
		id: "/admin-portal",
		path: "/admin-portal",
		getParentRoute: () => Route$30
	}),
	AtividadesRoute: Route$25.update({
		id: "/atividades",
		path: "/atividades",
		getParentRoute: () => Route$30
	}),
	CadastroRoute: Route$24.update({
		id: "/cadastro",
		path: "/cadastro",
		getParentRoute: () => Route$30
	}),
	ClienteRoute: Route$23.update({
		id: "/cliente",
		path: "/cliente",
		getParentRoute: () => Route$30
	}),
	ClientesRoute: Route$22.update({
		id: "/clientes",
		path: "/clientes",
		getParentRoute: () => Route$30
	}),
	GaleriaRoute: Route$21.update({
		id: "/galeria",
		path: "/galeria",
		getParentRoute: () => Route$30
	}),
	MeuPerfilRoute: Route$20.update({
		id: "/meu-perfil",
		path: "/meu-perfil",
		getParentRoute: () => Route$30
	}),
	ApiAdminRoute: Route$19.update({
		id: "/api/admin",
		path: "/api/admin",
		getParentRoute: () => Route$30
	}),
	ApiAdminPortalRoute: Route$18.update({
		id: "/api/admin-portal",
		path: "/api/admin-portal",
		getParentRoute: () => Route$30
	}),
	ApiCadastroRoute: Route$17.update({
		id: "/api/cadastro",
		path: "/api/cadastro",
		getParentRoute: () => Route$30
	}),
	ApiClienteRoute: Route$16.update({
		id: "/api/cliente",
		path: "/api/cliente",
		getParentRoute: () => Route$30
	}),
	ApiClientesRoute: Route$15.update({
		id: "/api/clientes",
		path: "/api/clientes",
		getParentRoute: () => Route$30
	}),
	ApiHealthRoute: Route$14.update({
		id: "/api/health",
		path: "/api/health",
		getParentRoute: () => Route$30
	}),
	ApiMinhasSolicitacoesRoute: Route$13.update({
		id: "/api/minhas-solicitacoes",
		path: "/api/minhas-solicitacoes",
		getParentRoute: () => Route$30
	}),
	ApiPerfilRoute: Route$12.update({
		id: "/api/perfil",
		path: "/api/perfil",
		getParentRoute: () => Route$30
	}),
	ApiProfissionaisRoute: Route$11.update({
		id: "/api/profissionais",
		path: "/api/profissionais",
		getParentRoute: () => Route$30
	}),
	ApiSolicitacoesRoute: Route$10.update({
		id: "/api/solicitacoes",
		path: "/api/solicitacoes",
		getParentRoute: () => Route$30
	}),
	ApiStatusRoute: Route$9.update({
		id: "/api/status",
		path: "/api/status",
		getParentRoute: () => Route$30
	}),
	ApiTecnicosRoute: Route$8.update({
		id: "/api/tecnicos",
		path: "/api/tecnicos",
		getParentRoute: () => Route$30
	}),
	ApiTriagemRoute: Route$7.update({
		id: "/api/triagem",
		path: "/api/triagem",
		getParentRoute: () => Route$30
	}),
	SolicitarSlugRoute: Route$6.update({
		id: "/solicitar/$slug",
		path: "/solicitar/$slug",
		getParentRoute: () => Route$30
	}),
	TecnicoSlugRoute: Route$5.update({
		id: "/tecnico/$slug",
		path: "/tecnico/$slug",
		getParentRoute: () => Route$30
	}),
	ApiAuthConfigRoute: Route$4.update({
		id: "/api/auth/config",
		path: "/api/auth/config",
		getParentRoute: () => Route$30
	}),
	ApiAuthGoogleRoute: Route$3.update({
		id: "/api/auth/google",
		path: "/api/auth/google",
		getParentRoute: () => Route$30
	}),
	ApiAuthLogoutRoute: Route$2.update({
		id: "/api/auth/logout",
		path: "/api/auth/logout",
		getParentRoute: () => Route$30
	}),
	ApiAuthSessionRoute: Route$1.update({
		id: "/api/auth/session",
		path: "/api/auth/session",
		getParentRoute: () => Route$30
	}),
	ApiAvatarSlugRoute: Route.update({
		id: "/api/avatar/$slug",
		path: "/api/avatar/$slug",
		getParentRoute: () => Route$30
	})
};
var routeTree = Route$30._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent"
	});
}
export { Route$21, Route$22, Route$25, Route$5, Route$6, ServiceIcon, router_exports };
