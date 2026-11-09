import { __toESM } from "../_runtime.mjs";
import { Notice, api, ufs, useFeedback } from "./common-B8oICLi2.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/meu-perfil-2oA_kYs7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MeuPerfil() {
	const [id, setId] = (0, import_react.useState)(""), [key, setKey] = (0, import_react.useState)(""), [profile, setProfile] = (0, import_react.useState)(null), [busy, setBusy] = (0, import_react.useState)(false), feedback = useFeedback();
	async function login(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const r = await api("/api/perfil", "POST", { id }, key);
			setProfile(r.perfil);
			feedback.ok("Perfil carregado: " + r.estado);
		} catch (err) {
			feedback.fail(err);
		} finally {
			setBusy(false);
		}
	}
	async function save(e) {
		e.preventDefault();
		setBusy(true);
		const form = e.currentTarget;
		const data = Object.fromEntries(new FormData(form).entries());
		data.id = id;
		data.aceite = form.elements.namedItem("aceite").checked;
		data.autorizacaoPublica = form.elements.namedItem("autorizacaoPublica").checked;
		try {
			await api("/api/perfil", "PUT", data, key);
			feedback.ok("Alterações enviadas para revisão; o perfil público anterior permanece até a nova aprovação.");
		} catch (err) {
			feedback.fail(err);
		} finally {
			setBusy(false);
		}
	}
	async function remove() {
		if (!confirm("Excluir este cadastro? Esta ação é irreversível.")) return;
		setBusy(true);
		try {
			await api("/api/perfil", "DELETE", { id }, key);
			setProfile(null);
			feedback.ok("Cadastro excluído.");
			setKey("");
			setId("");
		} catch (err) {
			feedback.fail(err);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Meu perfil profissional" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "subtle",
				children: "Na fase de migração, o acesso usa protocolo e chave pessoal; Google será integrado após a reconciliação das contas originais."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				message: feedback.message,
				error: feedback.error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "panel form",
				onSubmit: login,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: ["Protocolo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: id,
							onChange: (e) => setId(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: ["Chave privada", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "password",
							value: key,
							onChange: (e) => setKey(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						disabled: busy,
						children: "Acessar"
					})
				]
			}),
			profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "panel form",
				onSubmit: save,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Atualizar informações" }),
					[
						"nome",
						"especialidade",
						"cidade",
						"email",
						"whatsapp"
					].map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name,
							defaultValue: profile[name],
							required: name !== "whatsapp",
							type: name === "email" ? "email" : "text"
						}, profile[name] + name)]
					}, name)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: ["UF", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							name: "uf",
							defaultValue: profile.uf,
							children: ufs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: ["Descrição", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							name: "descricao",
							defaultValue: profile.descricao
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "check",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "checkbox",
							name: "aceite"
						}), "Mantenho meu aceite das condições da plataforma."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "check",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "checkbox",
							name: "autorizacaoPublica"
						}), "Autorizo publicar informações profissionais e WhatsApp informado."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn",
							disabled: busy,
							children: "Salvar e enviar para revisão"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn secondary",
							onClick: remove,
							disabled: busy,
							children: "Excluir cadastro"
						})]
					})
				]
			}) : null
		]
	});
}
export { MeuPerfil as component };
