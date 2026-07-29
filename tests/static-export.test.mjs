import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("exports Collin's generalized workplace portfolio", async () => {
  const html = await readFile(
    new URL("../out/index.html", import.meta.url),
    "utf8",
  );

  assert.match(
    html,
    /Collin Brown — Workplace operations &amp; employee experience/,
  );
  assert.match(html, /Reliable workplaces live in the/);
  assert.match(html, /San Francisco headquarters workplace program/);
  assert.match(html, /Keeping a Workplace Move Bid on Track/);
  assert.match(
    html,
    /Coordinated a vendor walkthrough and proposal process for a workplace move, flagged a scheduling risk, and cleared a compliance issue that could have limited vendor options\./,
  );
  assert.match(html, /Coordinating a Time-Sensitive Workplace Visit/);
  assert.match(
    html,
    /When an external photography visit conflicted with a business-critical session, I adjusted the timing, met and escorted the visitors, and kept both activities running smoothly\./,
  );
  assert.match(html, /One approved data file keeps the portfolio current/);
  assert.match(html, /Office Manager/);
  assert.match(html, /Employee Experience Manager/);
  assert.doesNotMatch(html, /http:\/\/localhost:3000/i);
  const prohibitedOrganizations = new RegExp(
    [
      "Cush" + "man\\s*&\\s*Wake" + "field",
      "C&amp;" + "W",
      "C" + "&W",
      "Van" + "ta",
      "CLIENT" + " HQ",
    ].join("|"),
    "i",
  );
  assert.doesNotMatch(html, prohibitedOrganizations);
  assert.doesNotMatch(html, /codex-preview|Building your site/i);
});

test("keeps approved portfolio content in the single JSON data source", async () => {
  const data = JSON.parse(
    await readFile(new URL("../projects.json", import.meta.url), "utf8"),
  );

  assert.equal(data.profile.name, "Collin Brown");
  assert.equal(
    data.projects[0].project_name,
    "San Francisco headquarters workplace program",
  );
  assert.equal(data.projects[0].slug, "sf-hq-workplace-operations");
  assert.equal(data.projects[0].stats[0].value, "Global CRE");
  assert.deepEqual(
    data.preview_items.map((item) => item.id),
    ["workplace-move-bid", "time-sensitive-workplace-visit"],
  );
  assert.equal(data.profile.target_roles.length, 5);
  assert.equal(data.pipeline.length, 4);
  await access(new URL("../out/og.png", import.meta.url));
});
