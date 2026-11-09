import { createServerRpc } from "./createServerRpc--Tf39wPN.mjs";
import { createServerFn } from "./ssr.mjs";
// node_modules/.nitro/vite/services/ssr/assets/galeria-DpFyDUZd.js
var getProfiles_createServerFn_handler = createServerRpc({
	id: "8ea2425755b513c9ccd3cf190e9f0fd5f02b9b1b0d9dfcb9956fe8692a998f26",
	name: "getProfiles",
	filename: "src/routes/galeria.tsx"
}, (opts) => getProfiles.__executeServer(opts));
var getProfiles = createServerFn({ method: "GET" }).handler(getProfiles_createServerFn_handler, async () => {
	const base = "https://encontreumtecnico-migracao-git-feat-encontreumtec-211d15-msolus.vercel.app";
	const [old, fresh] = await Promise.allSettled([fetch(base + "/api/profissionais", { signal: AbortSignal.timeout(1e4) }).then((r) => r.ok ? r.json() : Promise.reject()), fetch(base + "/api/tecnicos", { signal: AbortSignal.timeout(1e4) }).then((r) => r.ok ? r.json() : Promise.reject())]);
	const seen = /* @__PURE__ */ new Map();
	if (old.status === "fulfilled") {
		for (const p of old.value.profissionais || []) if (p?.id) seen.set(p.id, {
			...p,
			especialidade: p.especialidade || p.servico || ""
		});
	}
	if (fresh.status === "fulfilled") {
		for (const p of fresh.value.tecnicos || []) if (p?.id) seen.set(p.id, p);
	}
	return [...seen.values()];
});
export { getProfiles_createServerFn_handler };
