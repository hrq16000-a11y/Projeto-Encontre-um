import { createServerRpc } from "./createServerRpc--Tf39wPN.mjs";
import { createServerFn } from "./ssr.mjs";
// node_modules/.nitro/vite/services/ssr/assets/tecnico._slug-DIUq-O4v.js
var BACKEND = "https://encontreumtecnico-migracao-git-feat-encontreumtec-211d15-msolus.vercel.app";
function unpack(s) {
	return s.replace(/&amp;/gi, "&").replace(/&quot;/gi, "\"").replace(/&#39;|&apos;/gi, "'").replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
}
function meta(content, field) {
	for (const m of content.matchAll(/<meta\b[^>]*>/gi)) {
		const tag = m[0];
		if (!tag.includes(field)) continue;
		if (/(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1] !== field) continue;
		const value = /content\s*=\s*["']([^"']{0,2000})["']/i.exec(tag)?.[1];
		if (value) return unpack(value).replace(/<[^>]*>/g, "").trim();
	}
	return "";
}
var getProfile_createServerFn_handler = createServerRpc({
	id: "8a972738fc4c1680a65442a65c4b1656c589ab0bb03bdb09c9d72d58a1acf31f",
	name: "getProfile",
	filename: "src/routes/tecnico.$slug.tsx"
}, (opts) => getProfile.__executeServer(opts));
var getProfile = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getProfile_createServerFn_handler, async ({ data: slug }) => {
	if (!/^[a-z0-9._%-]{2,160}$/i.test(slug)) return null;
	if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
		try {
			let cursor = void 0;
			for (let page = 0; page < 8; page++) {
				const url = new URL(BACKEND + "/api/tecnicos");
				if (cursor) url.searchParams.set("cursor", cursor);
				const response = await fetch(url, {
					signal: AbortSignal.timeout(8e3),
					cache: "no-store"
				});
				if (!response.ok) return null;
				const payload = await response.json();
				const found = (payload.tecnicos || []).find((record) => record.id === slug);
				if (found) return {
					id: found.id,
					nome: found.nome,
					descricao: found.descricao || "",
					especialidade: found.especialidade || "",
					cidade: found.cidade || "",
					uf: found.uf || "",
					imagem: "",
					url: "",
					nomeInferido: false,
					origem: "novo"
				};
				if (!payload.cursor || payload.cursor === cursor) break;
				cursor = payload.cursor;
			}
		} catch {}
		return null;
	}
	try {
		const r = await fetch(BACKEND + "/api/profissionais", { signal: AbortSignal.timeout(9e3) });
		if (!r.ok) return null;
		const profile = ((await r.json()).profissionais || []).find((p) => p.url === "https://encontreumtecnico.com/tecnico/" + slug + "/");
		if (!profile) return null;
		const base = {
			...profile,
			especialidade: profile.especialidade || "",
			cidade: profile.cidade || "",
			uf: profile.uf || "",
			descricao: profile.descricao || "",
			imagem: profile.imagem || "",
			nomeInferido: Boolean(profile.nomeInferido),
			origem: "wordpress"
		};
		try {
			const page = await fetch(base.url, {
				headers: {
					Accept: "text/html",
					"User-Agent": "EncontreUmTecnico-Migracao/1.0"
				},
				signal: AbortSignal.timeout(4500)
			});
			if (page.ok && (page.headers.get("content-type") || "").includes("text/html")) {
				const html = await page.text();
				const name = meta(html, "og:title");
				const description = meta(html, "og:description");
				const image = meta(html, "og:image");
				if (name) {
					base.nome = name.split(/\s[|–—]\s/)[0].slice(0, 115);
					base.nomeInferido = false;
				}
				if (description) base.descricao = description.slice(0, 850);
				if (image) try {
					const u = new URL(image);
					if (["encontreumtecnico.com", "www.encontreumtecnico.com"].includes(u.hostname) && u.protocol === "https:") base.imagem = u.href;
				} catch {}
			}
		} catch {}
		return base;
	} catch {
		return null;
	}
});
export { getProfile_createServerFn_handler };
