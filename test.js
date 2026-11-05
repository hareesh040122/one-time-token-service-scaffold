import { issueToken, consumeToken } from "./token-service.js";

const id = await issueToken({ userId: 42 }, 60);
console.log("issued token:", id);

// fire 5 consumers at the same time
const results = await Promise.all([
  consumeToken(id),
  consumeToken(id),
  consumeToken(id),
  consumeToken(id),
  consumeToken(id),
]);

const winners = results.filter((r) => r.ok).length;
console.log("winners:", winners);

if (winners === 1) {
  console.log("PASS: token was single-use.");
  process.exit(0);
} else {
  console.error("FAIL: SINGLE-USE VIOLATED!");
  process.exit(1);
}