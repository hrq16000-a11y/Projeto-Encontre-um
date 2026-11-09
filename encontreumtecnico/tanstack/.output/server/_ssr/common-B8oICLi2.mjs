import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/common-B8oICLi2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ufs = "AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO".split(" ");
function Uf() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "field",
		children: ["UF *", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			name: "uf",
			defaultValue: "",
			required: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "Selecione"
			}), ufs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: s,
				children: s
			}, s))]
		})]
	});
}
function Notice({ message, error = false }) {
	return message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "status",
		className: "notice" + (error ? " error" : ""),
		children: message
	}) : null;
}
async function api(url, method = "GET", data, key) {
	const res = await fetch(url, {
		method,
		headers: {
			Accept: "application/json",
			...data !== void 0 ? { "Content-Type": "application/json" } : {},
			...key ? { Authorization: "Bearer " + key } : {}
		},
		...data !== void 0 ? { body: JSON.stringify(data) } : {}
	});
	let json;
	try {
		json = await res.json();
	} catch {
		throw Error("Resposta inválida do servidor");
	}
	if (!res.ok) throw Error(json.erro || "Operação indisponível");
	return json;
}
function useFeedback() {
	const [message, setMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(false);
	return {
		message,
		error,
		ok: (s) => {
			setMessage(s);
			setError(false);
		},
		fail: (e) => {
			setMessage(e instanceof Error ? e.message : "Erro desconhecido");
			setError(true);
		},
		clear: () => {
			setMessage("");
			setError(false);
		}
	};
}
export { Notice, Uf, api, ufs, useFeedback };
