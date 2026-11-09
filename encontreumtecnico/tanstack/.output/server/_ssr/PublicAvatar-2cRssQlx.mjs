import { __toESM } from "../_runtime.mjs";
import { ServiceIcon } from "./router-cwxiULZD.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/PublicAvatar-2cRssQlx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var clean = (s) => String(s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").replace(/\s+/g, " ").trim();
function matchesService(profile, query) {
	const terms = clean(query).split(" ").filter(Boolean);
	const haystack = clean([
		profile.nome,
		profile.especialidade,
		profile.servico,
		profile.descricao
	].filter(Boolean).join(" "));
	return terms.every((t) => haystack.includes(t));
}
function regionStatus(profile, city, uf) {
	const wantedCity = clean(city), wantedUf = clean(uf);
	const knownCity = clean(profile.cidade), knownUf = clean(profile.uf);
	if (wantedCity && knownCity && !knownCity.includes(wantedCity)) return "different";
	if (wantedUf && knownUf && knownUf !== wantedUf) return "different";
	if (wantedCity && !knownCity || wantedUf && !knownUf) return "unknown";
	return "matched";
}
function profileRoute(profile) {
	if (profile.url) try {
		const source = new URL(profile.url);
		if (source.protocol === "https:" && source.hostname === "encontreumtecnico.com") {
			const found = /^\/tecnico\/([a-z0-9._%-]{2,160})\/?$/i.exec(source.pathname);
			if (found) return found[1];
		}
	} catch {
		return null;
	}
	if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(profile.id)) return profile.id;
	return null;
}
function safeImage(value) {
	if (!value) return "";
	try {
		const url = new URL(value);
		if (url.protocol !== "https:" || ![
			"encontreumtecnico.com",
			"www.encontreumtecnico.com",
			"secure.gravatar.com"
		].includes(url.hostname)) return "";
		return url.href;
	} catch {
		return "";
	}
}
function PublicAvatar({ profile, large = false }) {
	const [broken, setBroken] = (0, import_react.useState)(false);
	const slug = profileRoute(profile);
	const image = safeImage(profile.imagem) || (profile.url && slug ? "/api/avatar/" + encodeURIComponent(slug) : "");
	if (!image || broken) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "public-avatar-fallback",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
			name: "user",
			size: large ? 47 : 31
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		loading: "lazy",
		decoding: "async",
		src: image,
		alt: "Foto pública de " + profile.nome,
		onError: () => setBroken(true)
	});
}
export { PublicAvatar, matchesService, profileRoute, regionStatus };
