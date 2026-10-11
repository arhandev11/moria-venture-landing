import assert from "node:assert/strict";
import { test } from "node:test";
import { formatMoney, parseWholeAmount, toMoney } from "./money";

test("short form uses codes in English and symbols in Indonesian", () => {
  assert.equal(formatMoney({ amount: 15_000_000_000, currency: "IDR" }, "en"), "IDR 15B");
  assert.equal(formatMoney({ amount: 278_000, currency: "USD" }, "en"), "USD 278K");
  assert.equal(formatMoney({ amount: 2_500_000_000, currency: "IDR" }, "en"), "IDR 2.5B");
  assert.equal(formatMoney({ amount: 15_000_000_000, currency: "IDR" }, "id"), "Rp 15 M");
  assert.equal(formatMoney({ amount: 950_000_000, currency: "IDR" }, "id"), "Rp 950 jt");
  assert.equal(formatMoney({ amount: 200_000, currency: "USD" }, "id"), "US$200 rb");
});

test("full form keeps every digit", () => {
  assert.equal(formatMoney({ amount: 15_000_000_000, currency: "IDR" }, "en", "full"), "IDR 15,000,000,000");
  assert.equal(formatMoney({ amount: 15_000_000_000, currency: "IDR" }, "id", "full"), "Rp 15.000.000.000");
  assert.equal(formatMoney({ amount: 60_000, currency: "USD" }, "en", "full"), "USD 60,000");
});

test("parseWholeAmount reads grouped and plain digits only", () => {
  assert.equal(parseWholeAmount("15,000,000,000"), 15_000_000_000);
  assert.equal(parseWholeAmount("15.000.000.000"), 15_000_000_000);
  assert.equal(parseWholeAmount(" 200000 "), 200_000);
  assert.equal(parseWholeAmount("1 500"), 1500);
  for (const bad of ["", "0", "-5", "1.5", "12,34", "1,000.000", "1e6", "Rp 5", "1,0000", "2000000000000000"]) {
    assert.equal(parseWholeAmount(bad), null, bad);
  }
});

test("toMoney needs both parts and a known code", () => {
  assert.deepEqual(toMoney(5, "IDR"), { amount: 5, currency: "IDR" });
  assert.equal(toMoney(null, "IDR"), null);
  assert.equal(toMoney(5, null), null);
  assert.equal(toMoney(5, "XYZ"), null);
});
