import mysql from "mysql2/promise";

/**
 * A pool that reads and writes every timestamp as UTC. The session zone is
 * pinned too: the server's own zone (WIB on a Jakarta box) would otherwise
 * shift what `now()` defaults and our UTC-formatted dates mean.
 */
export function createPool(url: string) {
  const pool = mysql.createPool({
    uri: url,
    connectionLimit: 10,
    timezone: "Z",
    connectTimeout: 5000,
  });
  pool.pool.on("connection", (conn) => {
    conn.query("SET time_zone = '+00:00'");
  });
  return pool;
}
