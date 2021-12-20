export function assertNever(unexpected: never): never {
  throw new Error(
    '[assertNever] Unexpected value: ' + JSON.stringify(unexpected)
  )
}
