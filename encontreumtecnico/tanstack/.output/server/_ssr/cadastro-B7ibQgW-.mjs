import { __toESM } from "../_runtime.mjs";
import { ServiceIcon } from "./router-cwxiULZD.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/cadastro-B7ibQgW-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var states = "AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO".split(" ");
function Cadastro() {
	const [error, setError] = (0, import_react.useState)(""), [saving, setSaving] = (0, import_react.useState)(false), [copied, setCopied] = (0, import_react.useState)(false);
	const [created, setCreated] = (0, import_react.useState)(null);
	async function submit(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const data = Object.fromEntries(new FormData(form).entries());
		data.aceite = form.elements.namedItem("aceite").checked;
		data.autorizacaoPublica = form.elements.namedItem("autorizacaoPublica").checked;
		setSaving(true);
		setError("");
		try {
			const response = await fetch("/api/cadastro", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			const payload = await response.json();
			if (!response.ok) throw Error(payload.erro || "Não foi possível salvar o cadastro");
			if (!payload.id || !payload.chave) throw Error("Cadastro criado, mas o comprovante está indisponível. Entre em contato com a administração.");
			setCreated({
				id: payload.id,
				chave: payload.chave
			});
		} catch (e) {
			setError(e instanceof Error ? e.message : "Falha no cadastro");
		} finally {
			setSaving(false);
		}
	}
	async function copy() {
		if (!created) return;
		try {
			await navigator.clipboard.writeText("Encontre um Técnico\nProtocolo: " + created.id + "\nChave: " + created.chave);
			setCopied(true);
		} catch {
			setError("A cópia automática não foi autorizada. Selecione e guarde o protocolo e a chave exibidos abaixo.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "signup-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "breadcrumb",
					"aria-label": "Você está aqui",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Início"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "chevron",
							size: 14
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cadastro de técnico" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "signup-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "signup-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "briefcase",
							size: 28
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-eyebrow",
							children: "PARA PROFISSIONAIS INDEPENDENTES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Seu próximo cliente pode encontrar você aqui." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Crie um perfil gratuito, apresente seu trabalho e amplie sua visibilidade. Seu cadastro será publicado após a revisão da plataforma." })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "signup-layout",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "signup-form-area",
						children: created ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "signup-success",
							role: "status",
							"aria-live": "polite",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "success-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 32
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "section-eyebrow",
									children: "CADASTRO RECEBIDO"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Pronto! Seus dados foram salvos." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Seu cadastro está aguardando aprovação. Para acompanhar ou editar seu perfil, guarde estas informações em um lugar seguro." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "access-credentials",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Protocolo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "secret-value",
										children: created.id
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Chave pessoal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "secret-value",
										children: created.chave
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "btn",
									onClick: copy,
									children: [
										copied ? "Informações copiadas" : "Copiar protocolo e chave",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
											name: copied ? "check" : "arrow",
											size: 16
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "small",
									children: "Por segurança, esta chave não será enviada por e-mail nesta fase. Não compartilhe com outras pessoas."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/acompanhar",
										className: "btn secondary",
										children: "Acompanhar cadastro"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/meu-perfil",
										className: "btn secondary",
										children: "Meu perfil"
									})]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "signup-form",
							onSubmit: submit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-section-head",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "form-step",
										children: "1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Apresente seu trabalho" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "As informações profissionais aprovadas aparecerão no diretório." })] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "two",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["Nome profissional *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "nome",
											autoComplete: "name",
											required: true,
											minLength: 3,
											maxLength: 100,
											placeholder: "Como você deseja ser encontrado?"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["Especialidade principal *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "especialidade",
											required: true,
											minLength: 3,
											maxLength: 100,
											placeholder: "Ex.: informática e manutenção"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "two",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["Cidade de atendimento *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "cidade",
											autoComplete: "address-level2",
											required: true,
											minLength: 2,
											maxLength: 90,
											placeholder: "Sua cidade"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["UF *", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											name: "uf",
											required: true,
											defaultValue: "",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Selecione o estado"
											}), states.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: s,
												children: s
											}, s))]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: [
										"Quais serviços você oferece?",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											name: "descricao",
											maxLength: 900,
											placeholder: "Conte sobre os equipamentos e sistemas com que trabalha, sua experiência e formas de atendimento.",
											rows: 5
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "input-help",
											children: "Descrição opcional, até 900 caracteres. Não inclua dados pessoais sensíveis."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-section-head secondary-head",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "form-step",
										children: "2"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Como entrar em contato" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Seu e-mail e seu WhatsApp permanecem privados. Os contatos serão disponibilizados apenas no fluxo autenticado de solicitação." })] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "two",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["E-mail privado *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											autoComplete: "email",
											name: "email",
											required: true,
											maxLength: 180,
											placeholder: "seu@email.com"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["WhatsApp profissional", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "whatsapp",
											type: "tel",
											autoComplete: "tel",
											inputMode: "tel",
											maxLength: 19,
											placeholder: "DDD + número"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-section-head secondary-head",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "form-step",
										children: "3"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Confirme suas preferências" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Você decide quais informações profissionais podem aparecer publicamente." })] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "signup-consent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "check",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "aceite",
											type: "checkbox",
											required: true
										}), " Aceito o tratamento das informações necessárias ao cadastro e à operação da plataforma."]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "check",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "autorizacaoPublica",
											type: "checkbox",
											required: true
										}), " Autorizo publicar meu nome, especialidade, cidade, UF e descrição após aprovação. E-mail e WhatsApp não serão exibidos publicamente."]
									})]
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "notice error",
									role: "alert",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "btn signup-submit",
									disabled: saving,
									children: [
										saving ? "Salvando seu cadastro…" : "Enviar cadastro para aprovação",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
											name: "arrow",
											size: 18
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "signup-privacy",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "shield",
										size: 17
									}), " Cadastro gratuito. Publicação condicionada à aprovação. Nenhuma avaliação ou certificação é atribuída automaticamente."]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "signup-aside",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "aside-art",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "laptop",
									size: 85
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aside-floating",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "spark",
										size: 22
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Mostre ao cliente o que você sabe fazer." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Profissionais independentes merecem oportunidades de apresentar o próprio trabalho e negociar diretamente." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "aside-points",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 19
									}), " Perfil gratuito"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 19
									}), " Especialidade em destaque"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 19
									}), " Contato direto com o cliente"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 19
									}), " Controle das suas informações"] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "aside-notice",
								children: [
									"Já possui um cadastro antigo no WordPress? Os dados históricos ainda estão em migração. Continue usando o ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://encontreumtecnico.com/",
										target: "_blank",
										rel: "noopener noreferrer",
										children: "portal original"
									}),
									" até a conclusão."
								]
							})
						]
					})]
				})
			]
		})
	});
}
export { Cadastro as component };
