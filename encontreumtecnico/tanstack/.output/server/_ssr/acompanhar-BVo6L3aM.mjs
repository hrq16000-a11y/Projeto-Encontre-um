import { __toESM } from "../_runtime.mjs";
import { Notice, api, useFeedback } from "./common-B8oICLi2.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/acompanhar-BVo6L3aM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Acompanhar() {
	const [id, setId] = (0, import_react.useState)(""), [key, setKey] = (0, import_react.useState)(""), [waiting, setWaiting] = (0, import_react.useState)(false), feedback = useFeedback();
	async function submit(e) {
		e.preventDefault();
		setWaiting(true);
		try {
			const r = await api("/api/status", "POST", { id }, key);
			feedback.ok(r.estado === "aprovado" ? "Cadastro aprovado e disponível na galeria." : "Cadastro salvo e aguardando revisão.");
		} catch (err) {
			feedback.fail(err);
		} finally {
			setWaiting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Acompanhar cadastro técnico" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "subtle",
				children: "Consulte a situação usando o protocolo e a chave privada que recebeu."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "panel form",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: ["Protocolo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: id,
							onChange: (e) => setId(e.target.value),
							required: true,
							maxLength: 36
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: ["Chave privada", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: key,
							onChange: (e) => setKey(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						disabled: waiting,
						children: "Consultar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						message: feedback.message,
						error: feedback.error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/meu-perfil",
						children: "Gerenciar informações do perfil"
					})
				]
			})
		]
	});
}
export { Acompanhar as component };
