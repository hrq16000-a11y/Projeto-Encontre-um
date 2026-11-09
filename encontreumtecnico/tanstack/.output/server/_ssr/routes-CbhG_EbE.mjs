import { __toESM } from "../_runtime.mjs";
import { ServiceIcon } from "./router-cwxiULZD.mjs";
import { PublicAvatar, profileRoute } from "./PublicAvatar-2cRssQlx.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[4...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-CbhG_EbE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categories = [
	{
		name: "Notebook e laptop",
		hint: "Diagnóstico e manutenção",
		icon: "laptop",
		className: "sky",
		search: "notebook"
	},
	{
		name: "Computador e PC",
		hint: "Hardware e software",
		icon: "desktop",
		className: "indigo",
		search: "computador"
	},
	{
		name: "Redes e Wi-Fi",
		hint: "Configuração e conexão",
		icon: "wifi",
		className: "mint",
		search: "redes"
	},
	{
		name: "Impressoras",
		hint: "Instalação e suporte",
		icon: "printer",
		className: "amber",
		search: "impressora"
	},
	{
		name: "Segurança digital",
		hint: "Proteção de sistemas",
		icon: "shield",
		className: "purple",
		search: "segurança"
	},
	{
		name: "Servidores",
		hint: "Infraestrutura e TI",
		icon: "server",
		className: "sky",
		search: "servidor"
	},
	{
		name: "Celulares e tablets",
		hint: "Suporte especializado",
		icon: "smartphone",
		className: "pink",
		search: "celular"
	},
	{
		name: "Suporte remoto",
		hint: "Atendimento a distância",
		icon: "support",
		className: "mint",
		search: "suporte remoto"
	}
];
function Home() {
	const navigate = useNavigate();
	const [service, setService] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [profiles, setProfiles] = (0, import_react.useState)([]);
	const [requests, setRequests] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const search = (event) => {
		event.preventDefault();
		navigate({
			to: "/galeria",
			search: {
				q: service.trim(),
				city: city.trim()
			}
		});
	};
	(0, import_react.useEffect)(() => {
		let active = true;
		const load = async () => {
			const results = await Promise.allSettled([
				fetch("/api/profissionais", { signal: AbortSignal.timeout(8500) }).then((r) => r.ok ? r.json() : Promise.reject()),
				fetch("/api/tecnicos", { signal: AbortSignal.timeout(8500) }).then((r) => r.ok ? r.json() : Promise.reject()),
				fetch("/api/solicitacoes", { signal: AbortSignal.timeout(8500) }).then((r) => r.ok ? r.json() : Promise.reject())
			]);
			if (!active) return;
			const seen = /* @__PURE__ */ new Map();
			if (results[0].status === "fulfilled") {
				for (const item of results[0].value.profissionais || []) if (item?.id && item?.url) seen.set(item.id, {
					...item,
					especialidade: item.servico
				});
			}
			if (results[1].status === "fulfilled") {
				for (const item of results[1].value.tecnicos || []) if (item?.id) seen.set(item.id, item);
			}
			const all = [...seen.values()];
			setProfiles([...all.filter((p) => !p.nomeInferido), ...all.filter((p) => p.nomeInferido)].slice(0, 4));
			if (results[2].status === "fulfilled") setRequests((results[2].value.solicitacoes || []).slice(0, 3));
			setLoading(false);
		};
		load();
		return () => {
			active = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "market-hero",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "market-hero-grid container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "market-hero-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-kicker",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tiny-star",
								children: "✦"
							}), " CONECTANDO PESSOAS E TÉCNICOS EM TODO O BRASIL"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Precisa de um técnico? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Encontre o profissional certo." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pesquise por especialidade e região, conheça profissionais independentes e combine o atendimento diretamente com quem realiza o serviço." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "hero-search",
							onSubmit: search,
							role: "search",
							"aria-label": "Buscar técnicos",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "search-entry",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "search",
										size: 23
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Qual serviço você precisa?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "q",
										value: service,
										onChange: (e) => setService(e.target.value),
										placeholder: "Notebook, redes, impressora...",
										autoComplete: "off"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "search-entry city-entry",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "location",
										size: 22
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Onde será o atendimento?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "city",
										value: city,
										onChange: (e) => setCity(e.target.value),
										placeholder: "Cidade (opcional)",
										autoComplete: "address-level2"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "hero-search-button",
									type: "submit",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "search",
										size: 19
									}), " Buscar técnicos"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-popular",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Buscas populares:" }), categories.slice(0, 4).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/galeria",
								search: {
									q: c.search,
									city: ""
								},
								children: c.name
							}, c.name))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-footnotes",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "check",
								size: 15
							}), " Cadastro gratuito para técnicos"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "check",
								size: 15
							}), " Negociação direta"] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-visual",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-visual-ring" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/illustrations/hero-tech.svg",
							alt: "Ilustração de notebook e ferramentas para conexão com técnicos",
							width: "960",
							height: "760",
							fetchPriority: "high"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "visual-callout one",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "callout-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "wifi",
									size: 20
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Encontre por especialidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Busca simples e direta" })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "visual-callout two",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "callout-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "check",
									size: 20
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Escolha o profissional" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Veja os perfis disponíveis" })] })]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "value-strip",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container value-strip-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
						name: "search",
						size: 19
					}), " Busque técnicos em um só lugar"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
						name: "user",
						size: 19
					}), " Profissionais independentes"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
						name: "briefcase",
						size: 19
					}), " Negociação direta com o cliente"] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "market-home",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "section container",
					id: "especialidades",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-eyebrow",
								children: "ESCOLHA POR ESPECIALIDADE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Como podemos ajudar você?" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Comece pelo tipo de atendimento. Você pode refinar sua busca por nome e cidade depois." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/galeria",
							search: {
								q: "",
								city: ""
							},
							className: "text-link",
							children: ["Explorar o diretório ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "arrow",
								size: 17
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "category-grid",
						children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							className: "category-card " + cat.className,
							to: "/galeria",
							search: {
								q: cat.search,
								city: ""
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "category-illustration",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: cat.icon,
										size: 36
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: cat.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: cat.hint })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "category-arrow",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "arrow",
										size: 18
									})
								})
							]
						}, cat.name))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "section how-section",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "container",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-header centered",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "section-eyebrow",
									children: "É SIMPLES ASSIM"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Seu próximo atendimento começa aqui" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sem complicações: encontre, conheça e converse com o profissional de sua escolha." })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "steps-grid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "step-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "step-illustration step-first",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
												name: "search",
												size: 42
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "step-counter",
											children: "PASSO 01"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Conte o que você precisa" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pesquise por serviço, cidade ou profissional no diretório de técnicos." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "step-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "step-illustration step-second",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
												name: "user",
												size: 42
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "step-counter",
											children: "PASSO 02"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Conheça os perfis" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confira informações públicas e consulte o perfil completo antes de escolher." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "step-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "step-illustration step-third",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
												name: "support",
												size: 42
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "step-counter",
											children: "PASSO 03"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Converse diretamente" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Combine disponibilidade, condições e atendimento com o técnico escolhido." })
									]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "section container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-eyebrow",
								children: "DIRETÓRIO DE PROFISSIONAIS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Técnicos no Encontre um Técnico" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Conheça uma amostra de perfis públicos reais. Dados incompletos do WordPress serão atualizados após a migração." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/galeria",
							search: {
								q: "",
								city: ""
							},
							className: "text-link",
							children: ["Ver todos os perfis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "arrow",
								size: 17
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "showcase-grid",
						children: loading ? [
							1,
							2,
							3,
							4
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "market-card loading-card",
							"aria-label": "Carregando perfis"
						}, i)) : profiles.length ? profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "market-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "profile-top",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "profile-avatar",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicAvatar, { profile: p })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "profile-type",
										children: "Perfil público"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: p.nome }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "profile-sub",
									children: [
										p.especialidade || p.servico,
										p.cidade,
										p.uf
									].filter(Boolean).join(" • ") || "Detalhes disponíveis no perfil original"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "profile-description",
									children: p.descricao || "Veja o cadastro original para conhecer os serviços e formas de contato."
								}),
								profileRoute(p) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/tecnico/$slug",
									params: { slug: profileRoute(p) },
									className: "profile-action",
									children: ["Ver perfil ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "arrow",
										size: 16
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/galeria",
									search: {
										q: p.nome,
										city: ""
									},
									className: "profile-action",
									children: ["Encontrar no diretório ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "arrow",
										size: 16
									})]
								})
							]
						}, p.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "info-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "user",
									size: 31
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Diretório em atualização" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Os perfis públicos estão sendo sincronizados. A busca completa permanece disponível." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/galeria",
									search: {
										q: "",
										city: ""
									},
									className: "btn",
									children: "Abrir galeria"
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "section requests-section",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "container",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "section-eyebrow",
									children: "OPORTUNIDADES DE ATENDIMENTO"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Solicitações de serviço" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pedidos publicados por clientes cadastrados e aprovados na plataforma." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/atividades",
								className: "text-link",
								children: ["Ver solicitações ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "arrow",
									size: 17
								})]
							})]
						}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "info-empty",
							children: "Verificando solicitações publicadas…"
						}) : requests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "request-grid",
							children: requests.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "request-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "request-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
											name: "briefcase",
											size: 21
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "request-category",
										children: r.especialidade
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: r.titulo }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "request-location",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
												name: "location",
												size: 15
											}),
											r.cidade,
											" / ",
											r.uf
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: r.descricao }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/atividades",
										className: "text-link",
										children: ["Ver solicitações ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
											name: "arrow",
											size: 16
										})]
									})
								]
							}, r.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "request-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "request-empty-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "briefcase",
										size: 33
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Faça sua primeira solicitação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Quando um cliente publicar um pedido aprovado, ele aparecerá aqui. Seu pedido pode ser o próximo." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/cliente",
									className: "btn",
									children: "Publicar solicitação"
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "section container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "split-benefits",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "benefit-visual",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "benefit-emblem",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "support",
									size: 66
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "benefit-stamp",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "check",
									size: 17
								}), " Pessoas conectadas diretamente"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "benefit-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "section-eyebrow",
									children: "MAIS LIBERDADE PARA ESCOLHER"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Uma plataforma feita para aproximar quem precisa de quem sabe resolver." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nosso papel é facilitar o encontro entre clientes e técnicos independentes. A escolha do profissional e a negociação das condições acontecem entre vocês." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "benefit-list",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
											name: "check",
											size: 18
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Contato sem intermediários no atendimento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Converse com o profissional e alinhe diretamente o serviço." })] })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
											name: "check",
											size: 18
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Mais visibilidade para técnicos independentes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Apresente sua especialidade e receba consultas de potenciais clientes." })] })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
											name: "check",
											size: 18
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Informações sem promessas artificiais" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Mostramos os dados realmente disponíveis, sem inventar avaliações ou certificações." })] })] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/galeria",
									search: {
										q: "",
										city: ""
									},
									className: "btn",
									children: ["Conhecer profissionais ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "arrow",
										size: 17
									})]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "section container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "join-banner",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-eyebrow",
								children: "PARA QUEM É PROFISSIONAL DE VERDADE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Seu trabalho merece ser encontrado." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cadastre seu perfil gratuitamente, mostre sua especialidade e amplie suas oportunidades de negociação com clientes finais." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cadastro",
								className: "btn join-cta",
								children: ["Quero me cadastrar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "arrow",
									size: 17
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "join-art",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "laptop",
								size: 106
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "join-art-mini",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "spark",
									size: 27
								})
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "section faq-section",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "container faq-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-eyebrow",
								children: "DÚVIDAS FREQUENTES"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Tudo o que você precisa saber" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Respostas claras para começar a utilizar o Encontre um Técnico." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cliente",
								className: "text-link",
								children: ["Acessar área do cliente ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
									name: "arrow",
									size: 16
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "faq-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Como encontro um técnico na minha cidade?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Digite o serviço e a cidade na busca. Observe que alguns perfis antigos ainda não possuem localização estruturada na nova versão; é possível consultá-los pelo perfil original." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "O cadastro de técnico é gratuito?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sim. Você pode criar seu cadastro sem mensalidade nesta plataforma. A publicação do perfil depende de aprovação administrativa." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Quem define o preço e as condições do serviço?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Os profissionais são independentes. Cliente e técnico conversam diretamente para definir disponibilidade, valores e condições do atendimento." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Posso publicar uma solicitação de serviço?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sim. Cadastre-se na área do cliente, envie os detalhes do atendimento e acompanhe a revisão da sua solicitação." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Meu cadastro antigo do WordPress já funciona aqui?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A migração das contas antigas ainda está em andamento. Enquanto isso, utilize o portal original para acessar seus dados históricos." })] })
							]
						})]
					})
				})
			]
		})
	] });
}
export { Home as component };
