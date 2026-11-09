import { __toESM } from "../_runtime.mjs";
import { Route$6, ServiceIcon } from "./router-cwxiULZD.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/solicitar._slug-BSofCPdQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoogleClientAccess({ onStatus }) {
	const holder = (0, import_react.useRef)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [clientId, setClientId] = (0, import_react.useState)("");
	const [ready, setReady] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const sync = (0, import_react.useCallback)(async () => {
		try {
			const payload = await (await fetch("/api/auth/session", {
				credentials: "same-origin",
				cache: "no-store"
			})).json();
			setUser(payload.autenticado ? payload.usuario : null);
			onStatus?.(Boolean(payload.autenticado));
		} catch {
			setUser(null);
			onStatus?.(false);
		}
	}, [onStatus]);
	(0, import_react.useEffect)(() => {
		let active = true;
		const load = async () => {
			try {
				const config = await (await fetch("/api/auth/config", { cache: "no-store" })).json();
				if (!active) return;
				setClientId(config.enabled ? config.clientId : "");
				setReady(true);
				await sync();
			} catch {
				if (active) {
					setReady(true);
					setError("Autenticação temporariamente indisponível");
				}
			}
		};
		load();
		return () => {
			active = false;
		};
	}, [sync]);
	(0, import_react.useEffect)(() => {
		if (!clientId || !holder.current || user) return;
		let done = false;
		const callback = async ({ credential }) => {
			if (!credential) return;
			setBusy(true);
			setError("");
			try {
				const r = await fetch("/api/auth/google", {
					method: "POST",
					credentials: "same-origin",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ credential })
				});
				const d = await r.json();
				if (!r.ok) throw Error(d.erro || "Falha de autenticação");
				await sync();
			} catch (e) {
				setError(e instanceof Error ? e.message : "Falha no login");
			} finally {
				setBusy(false);
			}
		};
		const render = () => {
			if (done || !holder.current || !window.google) return;
			done = true;
			window.google.accounts.id.initialize({
				client_id: clientId,
				callback
			});
			holder.current.replaceChildren();
			window.google.accounts.id.renderButton(holder.current, {
				theme: "outline",
				size: "large",
				text: "signin_with",
				shape: "rectangular",
				width: 300
			});
		};
		if (window.google) {
			render();
			return;
		}
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;
		script.onload = render;
		script.onerror = () => setError("Não foi possível carregar o Google");
		document.head.appendChild(script);
		return () => {
			script.onload = null;
			script.onerror = null;
		};
	}, [
		clientId,
		user,
		sync
	]);
	async function logout() {
		await fetch("/api/auth/logout", {
			method: "POST",
			credentials: "same-origin"
		});
		await sync();
	}
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "google-gate google-signed-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			"Conta Google conectada: ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: user.nome }),
			" (",
			user.email,
			")"
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "btn secondary",
			onClick: () => void logout(),
			children: "Sair"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "google-gate",
		"aria-label": "Identificação do cliente",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Entre com sua conta Google" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "O cliente precisa se identificar antes de solicitar contato. O telefone do técnico não será exibido anonimamente." }),
			!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				children: "Verificando acesso Google…"
			}) : clientId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: holder }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "notice",
				children: "Login Google preparado, mas ainda depende das credenciais OAuth e da origem autorizada no Google Cloud. Nenhum número será liberado enquanto estiver indisponível."
			}),
			busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				children: "Validando conta Google…"
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "notice error",
				role: "alert",
				children: error
			}) : null
		]
	});
}
var UF = "AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO".split(" ");
var categories = [
	"Formatação de computador",
	"Conserto de notebook",
	"Instalação de software",
	"Configuração de rede e Wi-Fi",
	"Impressoras e periféricos",
	"Manutenção de servidores",
	"Suporte remoto",
	"Outro serviço de tecnologia"
];
function Solicitar() {
	const { slug } = Route$6.useParams();
	const [authenticated, setAuthenticated] = (0, import_react.useState)(false);
	const onStatus = (0, import_react.useCallback)((v) => setAuthenticated(v), []);
	const [coords, setCoords] = (0, import_react.useState)(null);
	const [geoError, setGeoError] = (0, import_react.useState)("");
	const [geoBusy, setGeoBusy] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	function getGPS() {
		setGeoError("");
		if (!navigator.geolocation) {
			setGeoError("Localização indisponível neste aparelho. Informe cidade e bairro manualmente.");
			return;
		}
		setGeoBusy(true);
		navigator.geolocation.getCurrentPosition((position) => {
			setCoords({
				latitude: Number(position.coords.latitude.toFixed(5)),
				longitude: Number(position.coords.longitude.toFixed(5))
			});
			setGeoBusy(false);
		}, () => {
			setCoords(null);
			setGeoError("Localização não autorizada ou indisponível. Você pode informar os dados manualmente.");
			setGeoBusy(false);
		}, {
			enableHighAccuracy: false,
			timeout: 9e3,
			maximumAge: 3e5
		});
	}
	async function submit(e) {
		e.preventDefault();
		if (!authenticated) {
			setError("Entre com Google antes de enviar a solicitação.");
			return;
		}
		const form = e.currentTarget;
		const fields = Object.fromEntries(new FormData(form).entries());
		fields.tecnico = slug;
		fields.aceite = form.elements.namedItem("aceite").checked;
		fields.confirmouLocalizacao = form.elements.namedItem("confirmouLocalizacao").checked;
		fields.compartilharEndereco = form.elements.namedItem("compartilharEndereco").checked;
		fields.compartilharGps = Boolean(coords) && form.elements.namedItem("compartilharGps").checked;
		if (fields.compartilharGps && coords) {
			fields.latitude = coords.latitude;
			fields.longitude = coords.longitude;
		}
		setError("");
		setBusy(true);
		try {
			const response = await fetch("/api/triagem", {
				method: "POST",
				credentials: "same-origin",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(fields)
			});
			const data = await response.json();
			if (!response.ok) throw Error(data.erro || "Não foi possível enviar a solicitação");
			setResult(data);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Erro ao enviar solicitação");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "request-triage-page",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Solicitar atendimento" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "triage-hero",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "triage-hero-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
							name: "support",
							size: 32
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-eyebrow",
							children: "ATENDIMENTO DIRETO • COM TRIAGEM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Descreva seu problema para o técnico." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Prepare uma mensagem completa antes de conversar. Seu endereço exato e seu contato não serão publicados no diretório." })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "triage-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "triage-main",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "triage-step",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Identificação do cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "O contato exige uma conta Google verificada. Não liberamos números para visitantes anônimos." })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleClientAccess, { onStatus }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "triage-step",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Detalhes do atendimento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Informe o equipamento, o serviço e as condições para evitar mensagens incompletas." })] })]
							}),
							result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "triage-success",
								role: "status",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 40
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Solicitação registrada" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: result.mensagem }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "secret",
										children: ["Protocolo: ", result.protocolo]
									}),
									result.linkWhatsapp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										className: "btn",
										href: result.linkWhatsapp,
										target: "_blank",
										rel: "noopener noreferrer",
										children: ["Abrir mensagem triada no WhatsApp ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
											name: "arrow",
											size: 17
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "notice",
										children: "O número deste técnico não foi disponibilizado. O contato só será possível quando houver cadastro aprovado e autorização para acesso."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/galeria",
										search: {
											q: "",
											city: ""
										},
										className: "btn secondary",
										children: "Voltar à galeria"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "triage-form",
								onSubmit: submit,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: [
											"Serviço desejado *",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												list: "triage-categories",
												name: "categoria",
												minLength: 3,
												required: true,
												placeholder: "Ex.: formatação de computador"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
												id: "triage-categories",
												children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: c }, c))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "two",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "field",
											children: ["Equipamento", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												name: "equipamento",
												placeholder: "Notebook, computador, roteador…"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "field",
											children: ["Modelo ou fabricante", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												name: "fabricante",
												placeholder: "Ex.: Dell Inspiron, Windows 11"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["O que está acontecendo? *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											name: "problema",
											required: true,
											minLength: 20,
											maxLength: 1200,
											placeholder: "Explique o problema, quando começou e o resultado que espera.",
											rows: 5
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["Tipo de atendimento", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											name: "modalidade",
											defaultValue: "a-combinar",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "a-combinar",
													children: "A combinar"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "presencial",
													children: "Presencial"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "remoto",
													children: "Remoto"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "triage-step mini",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Localidade confirmada pelo cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "GPS é opcional. Localização por IP nunca substitui seu endereço informado." })] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "two",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "field",
											children: ["Cidade *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												name: "cidade",
												autoComplete: "address-level2",
												minLength: 2,
												required: true,
												placeholder: "Sua cidade"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "field",
											children: ["Estado *", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												name: "uf",
												defaultValue: "",
												required: true,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "Selecione"
												}), UF.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: s,
													children: s
												}, s))]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "two",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "field",
											children: ["Bairro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												name: "bairro",
												autoComplete: "address-level3",
												placeholder: "Seu bairro"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "field",
											children: ["CEP", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												name: "cep",
												inputMode: "numeric",
												autoComplete: "postal-code",
												placeholder: "00000-000",
												maxLength: 10
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "check",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "compartilharEndereco",
											type: "checkbox"
										}), " Autorizo enviar o endereço exato ao técnico escolhido na mensagem privada."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "field",
										children: ["Endereço exato (somente se autorizado)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "endereco",
											autoComplete: "street-address",
											placeholder: "Rua, número e complemento",
											maxLength: 180
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "triage-geolocation",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: getGPS,
												disabled: geoBusy,
												className: "btn secondary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
													name: "location",
													size: 17
												}), geoBusy ? "Buscando GPS…" : "Usar GPS com minha permissão"]
											}),
											coords ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "small",
												children: "GPS disponível. A coordenada só será armazenada se você marcar a autorização abaixo."
											}) : null,
											geoError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "small",
												role: "status",
												children: geoError
											}) : null
										]
									}),
									coords ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "check",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "compartilharGps",
											type: "checkbox"
										}), " Autorizo incluir a posição aproximada obtida por GPS apenas na solicitação privada."]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "check",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "confirmouLocalizacao",
											type: "checkbox",
											required: true
										}), " Confirmei que a cidade, UF e demais informações estão corretas."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "check",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "aceite",
											type: "checkbox",
											required: true
										}), " Autorizo armazenar esta solicitação privada e gerar uma mensagem para o profissional escolhido."]
									}),
									error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "notice error",
										role: "alert",
										children: error
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "btn triage-send",
										disabled: !authenticated || busy,
										children: [
											busy ? "Registrando solicitação…" : authenticated ? "Registrar e preparar contato" : "Entre com Google para continuar",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
												name: "arrow",
												size: 17
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "small",
										children: "A plataforma conecta clientes e técnicos independentes. Não garante preço, disponibilidade ou execução do atendimento."
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "triage-aside",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
								name: "shield",
								size: 47
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Seu atendimento começa com informações claras." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "O profissional recebe uma descrição estruturada do serviço que você deseja contratar. Você continua livre para negociar valores, agenda e condições." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "triage-aside-points",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 18
									}), " Login Google obrigatório"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 18
									}), " Telefones fora da vitrine pública"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 18
									}), " Cidade informada e confirmada"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 18
									}), " GPS somente com permissão"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
										name: "check",
										size: 18
									}), " Mensagem preenchida com a triagem"] })
								]
							})
						]
					})]
				})
			]
		})
	});
}
export { Solicitar as component };
