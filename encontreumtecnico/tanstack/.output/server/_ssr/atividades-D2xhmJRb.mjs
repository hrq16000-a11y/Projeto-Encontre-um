import { __toESM } from "../_runtime.mjs";
import { Route$25, ServiceIcon } from "./router-cwxiULZD.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/atividades-D2xhmJRb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Atividades() {
	const items = Route$25.useLoaderData(), [q, setQ] = (0, import_react.useState)(""), [city, setCity] = (0, import_react.useState)("");
	const visible = items.filter((x) => (!q || [
		x.titulo,
		x.especialidade,
		x.descricao
	].join(" ").toLocaleLowerCase("pt-BR").includes(q.toLocaleLowerCase("pt-BR"))) && (!city || x.cidade.toLocaleLowerCase("pt-BR").includes(city.toLocaleLowerCase("pt-BR"))));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "requests-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "requests-hero",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-eyebrow",
						children: "CLIENTES E OPORTUNIDADES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Solicitações de serviços" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Conheça os atendimentos que os clientes solicitaram e foram aprovados para publicação na plataforma." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cliente",
						className: "btn",
						children: ["Publicar uma solicitação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "arrow",
							size: 17
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "requests-toolbar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "search",
							size: 17
						}), " Buscar serviço"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "search",
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Ex.: instalação de rede, notebook"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "location",
							size: 17
						}), " Cidade"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "search",
							value: city,
							onChange: (e) => setCity(e.target.value),
							placeholder: "Ex.: Curitiba"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "requests-count",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [visible.length, " solicitação(ões)"] }), " publicadas com esses filtros"]
				}),
				visible.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "request-market-grid",
					children: visible.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "request-market-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "request-market-top",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "briefcase",
									size: 18
								}), " Solicitação publicada"] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: job.titulo }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-market-tags",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: job.especialidade }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "location",
										size: 14
									}),
									job.cidade,
									" / ",
									job.uf
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: job.descricao }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-market-footer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Cliente: ", job.clienteNome || "Cadastro aprovado"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small",
									children: "Contato privado — o cliente decide como responder à solicitação"
								})]
							})
						]
					}, job.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "requests-empty",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "requests-empty-art",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "briefcase",
								size: 55
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: q || city ? "Nenhuma solicitação corresponde à sua busca" : "As próximas oportunidades aparecerão aqui." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: q || city ? "Experimente outro termo ou cidade." : "Novos pedidos reais surgirão após o envio e a aprovação pela plataforma. Não exibimos solicitações fictícias." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cliente",
								className: "btn",
								children: ["Publicar solicitação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "arrow",
									size: 16
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/galeria",
								search: {
									q: "",
									city: ""
								},
								className: "btn secondary",
								children: "Explorar técnicos"
							})]
						})
					]
				})
			]
		})]
	});
}
export { Atividades as component };
