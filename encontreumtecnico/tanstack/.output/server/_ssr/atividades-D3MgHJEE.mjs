import { createServerRpc } from "./createServerRpc--Tf39wPN.mjs";
import { createServerFn } from "./ssr.mjs";
// node_modules/.nitro/vite/services/ssr/assets/atividades-D3MgHJEE.js
var loadJobs_createServerFn_handler = createServerRpc({
	id: "5716267659b7c63a950032b91c0fd44d353595e0c37d6ad84a440aecebd505d8",
	name: "loadJobs",
	filename: "src/routes/atividades.tsx"
}, (opts) => loadJobs.__executeServer(opts));
var loadJobs = createServerFn({ method: "GET" }).handler(loadJobs_createServerFn_handler, async () => {
	try {
		return (await (await fetch("https://encontreumtecnico-migracao-git-feat-encontreumtec-211d15-msolus.vercel.app/api/solicitacoes", { signal: AbortSignal.timeout(8e3) })).json()).solicitacoes || [];
	} catch {
		return [];
	}
});
export { loadJobs_createServerFn_handler };
