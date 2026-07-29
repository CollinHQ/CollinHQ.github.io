import portfolio from "../projects.json";

const serviceLayers = [
  "Office management",
  "Workplace coordination",
  "Employee experience",
];

export default function Home() {
  const { profile, pipeline } = portfolio;
  const project = portfolio.projects[0];
  const selectedWorkItems = portfolio.preview_items.filter(
    (item) => item.placement === "selected-work",
  );
  const programImpactItems = portfolio.preview_items.filter(
    (item) => item.placement === "program-impact",
  );

  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="Collin Brown workplace operations portfolio, home"
        >
          <span className="personal-mark">CB</span>
          <span className="brand-divider">/</span>
          <span className="brand-owner">Collin Brown</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#approach">Operating model</a>
          <a className="nav-cta" href="#contact">
            Connect <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            Workplace operations · Employee experience · San Francisco
          </p>
          <h1 id="hero-title">
            Reliable workplaces live in the <em>details.</em>
          </h1>
          <p className="hero-intro">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              View the program <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#roles">
              View target roles <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div
          className="project-board"
          aria-label="Headquarters workplace service delivery snapshot"
        >
          <div className="board-topline">
            <span>Headquarters program</span>
            <span className="status">
              <i /> {project.status}
            </span>
          </div>
          <div className="board-title">
            <p>WORKPLACE OPERATIONS / COMMERCIAL REAL ESTATE</p>
            <strong>
              One workplace experience.
              <br />
              Clear ownership.
            </strong>
          </div>
          <div className="floor-stack" aria-hidden="true">
            {serviceLayers.map((layer, index) => (
              <div className="floor" key={layer}>
                <span>0{index + 1}</span>
                <div className="floor-line">
                  <b>{layer}</b>
                </div>
                <small>ACTIVE</small>
              </div>
            ))}
          </div>
          <div className="board-footer">
            <span>Service delivery</span>
            <span>Site readiness</span>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Program overview">
        {project.stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section
        className="case-study section"
        id="work"
        aria-labelledby="case-title"
      >
        <aside className="section-rail">
          <p className="section-kicker">Selected work · 01</p>
          <div className="rail-meta">
            <div>
              <span>Environment</span>
              <strong>{project.location}</strong>
            </div>
            <div>
              <span>Scope</span>
              <strong>{project.project_type}</strong>
            </div>
            <div>
              <span>Focus</span>
              <strong>Experience, facilities, and service delivery</strong>
            </div>
          </div>
        </aside>

        <div className="case-content">
          <div className="case-heading">
            <p>{project.tags.join(" · ")}</p>
            <h2 id="case-title">{project.project_name}</h2>
            <p className="case-summary">{project.summary}</p>
          </div>

          <div
            className="case-visual"
            role="img"
            aria-label="Workplace operations program visual"
          >
            <div className="visual-grid" aria-hidden="true">
              <span>SF</span>
              <span>WORKPLACE</span>
              <span>OPERATIONS</span>
            </div>
            <div className="visual-note">
              <span>Program focus</span>
              <p>A workplace experience people can rely on.</p>
            </div>
          </div>

          <div className="narrative-grid">
            <article>
              <span>01 / Challenge</span>
              <h3>Connect the work people notice with the work they don’t.</h3>
              <p>{project.narrative.challenge}</p>
            </article>
            <article>
              <span>02 / Response</span>
              <h3>Make ownership and next steps clear.</h3>
              <p>{project.narrative.solution}</p>
            </article>
            <article>
              <span>03 / Result</span>
              <h3>Create a workplace people can rely on.</h3>
              <p>{project.narrative.outcome}</p>
            </article>
          </div>

          {selectedWorkItems.map((item, index) => (
            <div className="wins-block" id={item.id} key={item.id}>
              <div>
                <p className="section-kicker">{item.tags.join(" · ")}</p>
                <h3>{item.title}</h3>
              </div>
              <ol>
                <li>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item.wording}</p>
                </li>
              </ol>
            </div>
          ))}

          <div className="wins-block">
            <div>
              <p className="section-kicker">Program impact</p>
              <h3>What coordinated workplace service makes possible.</h3>
            </div>
            <ol>
              {project.wins.map((win, index) => (
                <li key={win}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{win}</p>
                </li>
              ))}
              {programImpactItems.map((item, index) => (
                <li id={item.id} key={item.id}>
                  <span>
                    {String(project.wins.length + index + 1).padStart(2, "0")}
                  </span>
                  <p>
                    <strong>{item.title}</strong>
                    <br />
                    {item.wording}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        className="approach section"
        id="approach"
        aria-labelledby="approach-title"
      >
        <div className="approach-heading">
          <p className="section-kicker">Workplace operating model</p>
          <h2 id="approach-title">
            Every request needs context, an owner, and a clear outcome.
          </h2>
          <p>
            A weekly rhythm connects technology-client priorities with
            commercial real estate service delivery. Teams know what needs
            attention and what changed.
          </p>
        </div>

        <ol className="pipeline">
          {pipeline.map((phase) => (
            <li key={phase.phase}>
              <div className="phase-number">{phase.phase}</div>
              <div className="phase-copy">
                <span>{phase.location}</span>
                <h3>{phase.name}</h3>
                <p>{phase.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="data-layer">
          <div className="data-copy">
            <p className="section-kicker">A record that stays useful</p>
            <h3>One approved data file keeps the portfolio current.</h3>
            <p>
              Approved program wins, service outcomes, focus areas, and image
              paths live in <code>projects.json</code>. New information updates
              the portfolio without changing the layout.
            </p>
          </div>
          <pre aria-label="Example program data">
            <code>{`{
  "project_name": "SF headquarters workplace program",
  "employer": "Global commercial real estate firm",
  "focus": ["Experience", "Operations"],
  "status": "Active"
}`}</code>
          </pre>
        </div>
      </section>

      <section
        className="role-fit section"
        id="roles"
        aria-labelledby="roles-title"
      >
        <div>
          <p className="section-kicker">Role alignment</p>
          <h2 id="roles-title">
            Workplace leadership, from daily service to complex change.
          </h2>
        </div>
        <ul>
          {profile.target_roles.map((role) => (
            <li key={role}>
              <span aria-hidden="true">↗</span> {role}
            </li>
          ))}
        </ul>
      </section>

      <footer id="contact">
        <div className="footer-main">
          <p>Workplace operations work best when ownership stays clear.</p>
          <h2>I connect client priorities with dependable service delivery.</h2>
        </div>
        <div className="footer-meta">
          <span>{profile.name}</span>
          <span>{profile.role}</span>
          <span>{profile.location}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
