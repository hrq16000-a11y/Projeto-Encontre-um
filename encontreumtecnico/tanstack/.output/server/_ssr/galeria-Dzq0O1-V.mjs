import { __toESM } from "../_runtime.mjs";
import { Route$21, ServiceIcon } from "./router-cwxiULZD.mjs";
import { PublicAvatar, matchesService, profileRoute, regionStatus } from "./PublicAvatar-2cRssQlx.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[4...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/galeria-Dzq0O1-V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var specialties = [
	"Notebook",
	"Computador",
	"Redes",
	"Wi-Fi",
	"Impressora",
	"Suporte remoto",
	"Servidor",
	"Celular"
];
function Gallery() {
	const profiles = Route$21.useLoaderData(), search = Route$21.useSearch(), navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)(search.q), [city, setCity] = (0, import_react.useState)(search.city), [uf, setUf] = (0, import_react.useState)(""), [sort, setSort] = (0, import_react.useState)("name"), [limit, setLimit] = (0, import_react.useState)(24), [showUnlocated, setShowUnlocated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setQuery(search.q);
		setCity(search.city);
		setLimit(24);
		setShowUnlocated(false);
	}, [search.q, search.city]);
	const matching = (0, import_react.useMemo)(() => {
		const byService = profiles.filter((p) => matchesService(p, query));
		const verified = byService.filter((p) => regionStatus(p, city, uf) === "matched");
		const unknown = byService.filter((p) => regionStatus(p, city, uf) === "unknown");
		const order = (a, b) => sort === "complete" ? Number(Boolean(b.cidade && b.especialidade)) - Number(Boolean(a.cidade && a.especialidade)) || a.nome.localeCompare(b.nome, "pt-BR") : a.nome.localeCompare(b.nome, "pt-BR");
		return {
			verified: verified.sort(order),
			unknown: unknown.sort(order)
		};
	}, [
		profiles,
		query,
		city,
		uf,
		sort
	]);
	const hasRegion = Boolean(city.trim() || uf);
	const results = hasRegion && showUnlocated ? [...matching.verified, ...matching.unknown] : matching.verified;
	function submit(e) {
		e.preventDefault();
		setLimit(24);
		navigate({
			to: "/galeria",
			search: {
				q: query.trim(),
				city: city.trim()
			}
		});
	}
	function clear() {
		setQuery("");
		setCity("");
		setUf("");
		setLimit(24);
		setShowUnlocated(false);
		navigate({
			to: "/galeria",
			search: {
				q: "",
				city: ""
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "directory-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "directory-hero",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-eyebrow",
						children: "DIRETÓRIO DE PROFISSIONAIS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Encontre um técnico para você." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Explore perfis públicos, pesquise por especialidade e converse diretamente com profissionais independentes." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "directory-trust",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "user",
								size: 17
							}),
							profiles.length,
							" perfis públicos disponíveis"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "check",
							size: 17
						}), " Sem anúncios de profissionais fictícios"] })]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "directory-filters",
					role: "search",
					onSubmit: submit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "filter-input",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "search",
								size: 18
							}), " Nome ou especialidade"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => {
									setQuery(e.target.value);
									setLimit(24);
								},
								placeholder: "Ex.: notebook, redes"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "filter-input",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "location",
								size: 18
							}), " Cidade"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: city,
								onChange: (e) => {
									setCity(e.target.value);
									setLimit(24);
									setShowUnlocated(false);
								},
								placeholder: "Ex.: Curitiba"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "filter-input state-filter",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Estado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: uf,
								onChange: (e) => {
									setUf(e.target.value);
									setLimit(24);
									setShowUnlocated(false);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Todos os estados"
								}), "AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO".split(" ").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: s
								}, s))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "btn",
							children: ["Buscar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "arrow",
								size: 16
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "service-filter-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Especialidades:" }), specialties.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/galeria",
						search: {
							q: s,
							city
						},
						className: query.toLowerCase() === s.toLowerCase() ? "selected" : "",
						children: s
					}, s))]
				}),
				hasRegion && matching.unknown.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "directory-region-hint",
					role: "status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "location",
							size: 19
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [matching.verified.length, " perfil(is) com região correspondente."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Outros ",
							matching.unknown.length,
							" perfil(is) não informam a localidade no cadastro público. Isso ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "não significa" }),
							" que atendam sua cidade."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn secondary",
							"aria-pressed": showUnlocated,
							onClick: () => {
								setShowUnlocated((v) => !v);
								setLimit(24);
							},
							children: showUnlocated ? "Ocultar perfis sem região" : "Mostrar perfis sem região"
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "directory-results-bar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [results.length, " resultado(s)"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: query || city || uf ? " para os filtros informados" : " no diretório público" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "results-tools",
						children: [query || city || uf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "clear-filters",
							onClick: clear,
							children: "Limpar filtros"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Ordenar ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: sort,
							onChange: (e) => setSort(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "name",
								children: "Nome (A–Z)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "complete",
								children: "Dados mais completos"
							})]
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "directory-list",
					children: results.slice(0, limit).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "directory-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "directory-avatar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicAvatar, { profile: p })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "directory-details",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "directory-meta",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.url ? "Perfil público do WordPress" : "Novo cadastro aprovado" }), p.cidade ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
												name: "location",
												size: 13
											}),
											p.cidade,
											p.uf ? "/" + p.uf : ""
										] }) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: p.nome }),
									p.nomeInferido ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "directory-warning",
										children: "Nome derivado do endereço original; confirme os dados no perfil."
									}) : null,
									hasRegion && regionStatus(p, city, uf) === "unknown" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "directory-warning",
										children: "Localidade não informada — atendimento na região não confirmado"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "directory-specialty",
										children: p.especialidade || p.servico || "Especialidade no cadastro original"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "directory-description",
										children: p.descricao || "Consulte o perfil para conhecer detalhes e formas de contato."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "directory-action",
								children: profileRoute(p) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "directory-contact-buttons",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/tecnico/$slug",
										params: { slug: profileRoute(p) },
										className: "btn secondary",
										children: "Ver perfil"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/solicitar/$slug",
										params: { slug: profileRoute(p) },
										className: "btn",
										children: ["Solicitar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
											name: "arrow",
											size: 16
										})]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small",
									children: "Confira as informações públicas na plataforma"
								})
							})
						]
					}, p.id))
				}),
				!results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "info-empty directory-empty",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "search",
							size: 34
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Nenhum perfil encontrado com esses filtros" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Alguns perfis da origem ainda não têm cidade ou especialidade estruturadas na nova plataforma. Remova os filtros ou publique uma solicitação de serviço." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn",
								onClick: clear,
								children: "Ver todos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cliente",
								className: "btn secondary",
								children: "Publicar solicitação"
							})]
						})
					]
				}) : null,
				limit < results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "directory-more",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Mostrando ",
						Math.min(limit, results.length),
						" de ",
						results.length
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn",
						onClick: () => setLimit((n) => n + 24),
						children: ["Carregar mais técnicos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "chevron",
							size: 15
						})]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "directory-info",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
						name: "shield",
						size: 22
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Diretório com informações transparentes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Os perfis históricos do WordPress ainda estão em migração. Só exibimos os dados públicos disponíveis, sem inventar avaliações, cidades, preços ou certificações." })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "directory-join",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-eyebrow",
							children: "SOU TÉCNICO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Seu trabalho merece visibilidade." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cadastre seu perfil gratuitamente e faça parte do diretório." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "btn",
						to: "/cadastro",
						children: ["Quero me cadastrar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "arrow",
							size: 16
						})]
					})]
				})
			]
		})]
	});
}
export { Gallery as component };
