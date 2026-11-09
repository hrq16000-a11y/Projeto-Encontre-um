import { Route$5, ServiceIcon } from "./router-cwxiULZD.mjs";
import { PublicAvatar } from "./PublicAvatar-2cRssQlx.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/tecnico._slug-CYJDpM-3.js
var import_jsx_runtime = require_jsx_runtime();
function TechnicianProfile() {
	const p = Route$5.useLoaderData();
	const { slug } = Route$5.useParams();
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "info-empty",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Perfil em atualização" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Não foi possível localizar este perfil na prévia. Consulte os profissionais disponíveis na galeria." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/galeria",
					search: {
						q: "",
						city: ""
					},
					className: "btn",
					children: "Voltar à galeria"
				})
			]
		})
	});
	const details = [
		p.especialidade,
		p.cidade,
		p.uf
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "professional-profile",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/galeria",
							search: {
								q: "",
								city: ""
							},
							children: "Técnicos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "chevron",
							size: 14
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.nome })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "professional-profile-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "professional-cover",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cover-orbit first" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cover-orbit second" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "cover-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "laptop",
									size: 65
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "professional-profile-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "professional-avatar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicAvatar, {
									profile: p,
									large: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "professional-label",
								children: p.origem === "novo" ? "CADASTRO APROVADO NO NOVO PORTAL" : "PERFIL PÚBLICO DA ORIGEM WORDPRESS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: p.nome }),
							details.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "professional-location",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "location",
									size: 18
								}), details.join(" • ")]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "professional-location",
								children: "Informações de localização ainda não estruturadas"
							}),
							p.nomeInferido ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "directory-warning",
								children: "Nome baseado no endereço do perfil. Confirme as informações na origem."
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "professional-description",
								children: p.descricao || "Este profissional possui um perfil público. Você pode solicitar atendimento com triagem, mantendo dados privados protegidos."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "professional-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/solicitar/$slug",
									params: { slug },
									className: "btn",
									children: ["Solicitar atendimento ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "arrow",
										size: 17
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/galeria",
									search: {
										q: "",
										city: ""
									},
									className: "btn secondary",
									children: "Ver outros técnicos"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "professional-detail-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "professional-detail-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "briefcase",
								size: 23
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Especialidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.especialidade || "Consulte o perfil original" })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "professional-detail-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "location",
								size: 23
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Região de atendimento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.cidade ? [p.cidade, p.uf].filter(Boolean).join(" / ") : "Não informada na base pública importada" })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "professional-detail-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "shield",
								size: 23
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Informações verificáveis" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.origem === "wordpress" ? "Confira dados completos no portal WordPress original." : "Dados aprovados para publicação nesta plataforma, sem validação documental." })] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "professional-note",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
						name: "shield",
						size: 22
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.origem === "novo" ? "Este é um cadastro aprovado na nova plataforma. A aprovação é administrativa e não representa certificação, comprovação de documentos ou garantia do serviço." : "Este perfil foi reconstruído exclusivamente a partir de informações públicas do WordPress. A exibição não representa verificação de documentos ou certificações, nem implica avaliação ou garantia de atendimento pela plataforma." })]
				})
			]
		})
	});
}
export { TechnicianProfile as component };
