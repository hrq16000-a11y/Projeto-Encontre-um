import { __toESM } from "../_runtime.mjs";
import { Notice, api, useFeedback } from "./common-B8oICLi2.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/admin-CwD_LJz7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Admin() {
	const [input, setInput] = (0, import_react.useState)(""), [secret, setSecret] = (0, import_react.useState)(""), [mode, setMode] = (0, import_react.useState)("tecnicos"), [records, setRecords] = (0, import_react.useState)([]), [busy, setBusy] = (0, import_react.useState)(false), feedback = useFeedback();
	async function load(key, next) {
		const url = next === "tecnicos" ? "/api/admin" : "/api/admin-portal?tipo=" + next;
		const result = await api(url, "GET", void 0, key);
		setRecords(result.pendentes || []);
		setMode(next);
		feedback.ok((result.pendentes || []).length + " registro(s) neste lote aguardando aprovação.");
	}
	async function login(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await load(input, "tecnicos");
			setSecret(input);
			setInput("");
		} catch (err) {
			feedback.fail(err);
		} finally {
			setBusy(false);
		}
	}
	async function review(id, acao) {
		if (!confirm("Confirmar " + acao + " deste registro?")) return;
		setBusy(true);
		try {
			await api(mode === "tecnicos" ? "/api/admin" : "/api/admin-portal", "POST", mode === "tecnicos" ? {
				id,
				acao
			} : {
				id,
				acao,
				tipo: mode
			}, secret);
			await load(secret, mode);
		} catch (err) {
			feedback.fail(err);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Administração e moderação" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "subtle",
				children: "Acesso restrito à chave administrativa da Vercel. Esta autenticação será substituída por contas Google e papéis aprovados antes da migração definitiva."
			}),
			!secret ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "panel form",
				onSubmit: login,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: ["Chave administrativa", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "password",
						minLength: 24,
						value: input,
						onChange: (e) => setInput(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn",
					disabled: busy,
					children: "Acessar"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Revisão de registros" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "actions",
					children: [[
						"tecnicos",
						"cliente",
						"solicitacao"
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn" + (m === mode ? "" : " secondary"),
						onClick: () => load(secret, m).catch(feedback.fail),
						children: m === "tecnicos" ? "Técnicos" : m === "cliente" ? "Clientes" : "Solicitações"
					}, m)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn secondary",
						onClick: () => {
							setSecret("");
							setRecords([]);
						},
						children: "Encerrar acesso"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				message: feedback.message,
				error: feedback.error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid",
				children: records.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: p.nome || p.titulo }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small",
							children: [
								p.especialidade || p.setor,
								p.cidade,
								p.uf,
								p.clienteNome
							].filter(Boolean).join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.descricao || "Sem descrição" }),
						p.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "small",
							children: ["Contato administrativo: ", p.email]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn",
								disabled: busy,
								onClick: () => review(p.id, "aprovar"),
								children: "Aprovar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn secondary",
								disabled: busy,
								onClick: () => review(p.id, "rejeitar"),
								children: "Rejeitar"
							})]
						})
					]
				}, p.id))
			})
		]
	});
}
export { Admin as component };
