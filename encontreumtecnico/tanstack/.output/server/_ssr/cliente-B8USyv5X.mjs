import { __toESM } from "../_runtime.mjs";
import { Notice, Uf, api, useFeedback } from "./common-B8oICLi2.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/cliente-B8USyv5X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Cliente() {
	const [created, setCreated] = (0, import_react.useState)(null);
	const [id, setId] = (0, import_react.useState)("");
	const [key, setKey] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [uf, setUf] = (0, import_react.useState)("");
	const [items, setItems] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const feedback = useFeedback();
	async function register(e) {
		e.preventDefault();
		setBusy(true);
		feedback.clear();
		const form = e.currentTarget;
		const body = Object.fromEntries(new FormData(form).entries());
		body.acao = "cadastro";
		body.aceite = Boolean(form.elements.namedItem("aceite").checked);
		body.autorizacaoPublica = Boolean(form.elements.namedItem("autorizacaoPublica").checked);
		try {
			const r = await api("/api/cliente", "POST", body);
			setCreated({
				id: r.id,
				chave: r.chave
			});
			setId(r.id);
			setKey(r.chave);
			feedback.ok("Cadastro salvo. Guarde seu protocolo e chave.");
		} catch (err) {
			feedback.fail(err);
		} finally {
			setBusy(false);
		}
	}
	async function list(myId, myKey) {
		const r = await api("/api/minhas-solicitacoes", "POST", { clienteId: myId }, myKey);
		setItems(r.solicitacoes || []);
	}
	async function login(e) {
		e.preventDefault();
		feedback.clear();
		setBusy(true);
		try {
			const r = await api("/api/cliente", "POST", { id }, key);
			setName(r.cliente.nome);
			setCity(r.cliente.cidade);
			setUf(r.cliente.uf);
			await list(id, key);
			feedback.ok("Cadastro: " + r.estado);
		} catch (err) {
			feedback.fail(err);
		} finally {
			setBusy(false);
		}
	}
	async function request(e) {
		e.preventDefault();
		setBusy(true);
		const form = e.currentTarget;
		const body = Object.fromEntries(new FormData(form).entries());
		body.clienteId = id;
		body.aceite = form.elements.namedItem("aceite").checked;
		body.exibirContato = form.elements.namedItem("exibirContato").checked;
		try {
			const r = await api("/api/solicitacoes", "POST", body, key);
			feedback.ok("Solicitação salva para revisão. Protocolo: " + r.id);
			form.reset();
			await list(id, key);
		} catch (err) {
			feedback.fail(err);
		} finally {
			setBusy(false);
		}
	}
	async function remove(reqId) {
		if (!confirm("Excluir esta solicitação?")) return;
		setBusy(true);
		try {
			await api("/api/minhas-solicitacoes", "DELETE", {
				clienteId: id,
				id: reqId
			}, key);
			await list(id, key);
			feedback.ok("Solicitação excluída");
		} catch (err) {
			feedback.fail(err);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "client-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "client-page-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "client-page-icon",
						children: "◈"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-eyebrow",
							children: "ÁREA EXCLUSIVA PARA CLIENTES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Contrate com mais liberdade." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "subtle",
							children: "Cadastre-se gratuitamente, publique solicitações de serviços e negocie diretamente com o técnico. Suas informações precisam ser aprovadas antes de aparecerem publicamente."
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					message: feedback.message,
					error: feedback.error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "client-entry-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "client-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "client-card-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Novo cadastro de cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cadastre sua empresa ou seu perfil para solicitar serviços." })] })]
						}), created ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "subtle",
							children: "Anote seu protocolo e chave privada; nesta etapa não são recuperáveis por e-mail."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "secret",
							children: [
								"Protocolo: ",
								created.id,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Chave: ",
								created.chave
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "form",
							onSubmit: register,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: ["Nome ou empresa *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "nome",
										required: true,
										minLength: 3
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: ["Setor de atividade *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "setor",
										required: true,
										minLength: 3
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "two",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["Cidade *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "cidade",
											required: true,
											minLength: 2
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Uf, {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: ["E-mail privado *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										name: "email",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: ["WhatsApp profissional", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "whatsapp",
										inputMode: "tel"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: ["Apresentação", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										name: "descricao",
										maxLength: 800
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "check",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										name: "aceite",
										required: true
									}), " Aceito o tratamento dos dados para operar a plataforma."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "check",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										name: "autorizacaoPublica",
										required: true
									}), " Autorizo mostrar os dados profissionais aprovados (exceto e-mail e WhatsApp)."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: busy,
									className: "btn",
									children: "Registrar cliente"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "client-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "client-card-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Acessar meu cadastro" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Volte para acompanhar e gerenciar seus pedidos." })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: "Use o protocolo e a chave recebidos. O login Google será ativado após a integração das contas."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "form",
								onSubmit: login,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["Protocolo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: id,
											onChange: (e) => setId(e.target.value),
											required: true
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
										disabled: busy,
										className: "btn",
										children: "Entrar"
									})
								]
							})
						]
					})]
				}),
				name ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "client-dashboard",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Bem-vindo, ", name] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "subtle",
							children: "Publique uma solicitação real para revisão administrativa."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "form",
							onSubmit: request,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: ["Título *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "titulo",
										required: true,
										minLength: 8
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: ["Especialidade *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "especialidade",
										required: true,
										minLength: 3
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "two",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["Cidade *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "cidade",
											required: true,
											minLength: 2,
											defaultValue: city
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["UF *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "uf",
											required: true,
											maxLength: 2,
											defaultValue: uf
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: ["Descrição do serviço *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										name: "descricao",
										required: true,
										minLength: 20
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "check",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										name: "exibirContato"
									}), " Quero receber contato dos técnicos pelas informações privadas do meu cadastro, sem divulgar meu número publicamente"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "check",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										name: "aceite",
										required: true
									}), " Autorizo publicar esta solicitação."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn",
									disabled: busy,
									children: "Enviar solicitação"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: { marginTop: 35 },
							children: "Minhas solicitações"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid",
							children: items.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: x.titulo }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "small",
										children: x.estado
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: x.descricao }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn secondary",
										onClick: () => remove(x.id),
										children: "Excluir solicitação"
									})
								]
							}, x.id))
						}),
						items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small",
							children: "Nenhuma solicitação neste cadastro."
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "actions",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/atividades",
								className: "btn secondary",
								children: "Ver solicitações públicas"
							})
						})
					]
				}) : null
			]
		})
	});
}
export { Cliente as component };
