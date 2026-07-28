import "dotenv/config";
import {
  NoxAeApiClient,
  NoxAeApiUnauthorizedError,
  NoxAeApiForbiddenError,
  NoxAeApiNetworkError,
  NoxAeApiError,
} from "@wumx-labs/noxaeapi-sdk";

function section(title) {
  console.log(`\n=== ${title} ===`);
}

async function run() {
  const client = NoxAeApiClient.fromEnv();

  section("ping");
  try {
    const pong = await client.server.ping();
    console.log(pong);
  } catch (err) {
    logError(err);
  }

  section("server info");
  try {
    const info = await client.server.info();
    console.log({
      name: info.name,
      version: info.version,
      tps: info.tps,
      onlinePlayers: info.onlinePlayers,
      maxPlayers: info.maxPlayers,
    });
  } catch (err) {
    logError(err);
  }

  section("online players");
  try {
    const players = await client.players.list();
    console.log(`${players.length} player(s) online`);
    for (const p of players) {
      console.log(`- ${p.displayName} (${p.uuid}) @ ${p.gamemode}`);
    }
  } catch (err) {
    logError(err);
  }

  section("economy info");
  try {
    const eco = await client.economy.info();
    console.log(eco);
  } catch (err) {
    logError(err);
  }

  section("worlds");
  try {
    const worlds = await client.worlds.list();
    console.log(`${worlds.length} world(s)`);
    for (const w of worlds) {
      console.log(`- ${w.name} (${w.environment}) time=${w.time}`);
    }
  } catch (err) {
    logError(err);
  }

  section("done");
}

function logError(err) {
  if (err instanceof NoxAeApiUnauthorizedError) {
    console.error("✗ Unauthorized — check NOXAEAPI_KEY in .env:", err.message);
  } else if (err instanceof NoxAeApiForbiddenError) {
    console.error("✗ Forbidden — this key can't call that endpoint:", err.message);
  } else if (err instanceof NoxAeApiNetworkError) {
    console.error("✗ Network error — is the server running and NOXAEAPI_BASE_URL correct?", err.message);
  } else if (err instanceof NoxAeApiError) {
    console.error(`✗ API error (${err.status}) on ${err.method} ${err.path}:`, err.message);
  } else {
    console.error("✗ Unexpected error:", err);
  }
}

run();
