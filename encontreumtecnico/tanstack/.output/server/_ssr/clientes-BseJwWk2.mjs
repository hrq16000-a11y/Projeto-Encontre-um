import { __toESM } from "../_runtime.mjs";
import { Route$22 } from "./router-cwxiULZD.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/clientes-BseJwWk2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Clientes() {
	const items = Route$22.useLoaderData();
	const [query, setQuery] = (0, import_react.useState)("");
	const visible = items.filter((x) => [
		x.nome,
		x.setor,
		x.cidade
	].join(" ").toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Clientes cadastrados" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "subtle",
				children: "Perfis de clientes aprovados na nova plataforma. O histórico WordPress será incorporado após importação dos registros."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: ["Nome, setor ou cidade", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value)
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid",
				children: visible.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: x.nome }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "small",
							children: [
								x.setor,
								" · ",
								x.cidade,
								"/",
								x.uf
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: x.descricao || "Sem apresentação pública." })
					]
				}, x.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cliente",
					className: "btn",
					children: "Cadastrar cliente"
				})
			})
		]
	});
}
export { Clientes as component };
