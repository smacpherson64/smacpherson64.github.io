export function info(...args: unknown[]) {
  return console.log("⚡️: ", ...args);
}

export function warn(...args: unknown[]) {
  return console.log("🔥: ", ...args);
}
