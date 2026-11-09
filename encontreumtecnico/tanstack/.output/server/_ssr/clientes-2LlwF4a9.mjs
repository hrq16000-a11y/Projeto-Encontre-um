import { createServerRpc } from "./createServerRpc--Tf39wPN.mjs";
import { createServerFn } from "./ssr.mjs";
// node_modules/.nitro/vite/services/ssr/assets/clientes-2LlwF4a9.js
var getClients_createServerFn_handler = createServerRpc({
	id: "219252b26b65dfe1c9c4db689f3fb26d36f322e717a0212907be87a7d71e1820",
	name: "getClients",
	filename: "src/routes/clientes.tsx"
}, (opts) => getClients.__executeServer(opts));
var getClients = createServerFn({ method: "GET" }).handler(getClients_createServerFn_handler, async () => {
	try {
		return (await (await fetch("https://encontreumtecnico-migracao-git-feat-encontreumtec-211d15-msolus.vercel.app/api/clientes", { signal: AbortSignal.timeout(8e3) })).json()).clientes || [];
	} catch {
		return [];
	}
});
export { getClients_createServerFn_handler };
