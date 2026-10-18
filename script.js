(() => {
  const ME = "F. Z. Keshtkar";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- DATA (taken from the CV) ---------- */
  const pubs = [
    {
      title: "Pep-PU-GAN: Positive-Unlabeled Adversarial Learning for Peptide Function Prediction",
      authors: "F. Midjani, S. Hashemi, F. Z. Keshtkar, M. Malekpour, B. Saberzadeh Ardestani, B. Khosravi",
      venue: "bioRxiv, Sep 2026", doi: "10.64898/2026.09.13.751209", tags: ["Peptides"]
    },
    {
      title: "A Biologically Informed Heterogeneous Graph Neural Network for Multi-Task Prediction of ncRNA-Metastasis-Cancer Interactions",
      authors: "F. Midjani, M. Shaghouzi, A. Dehqan Banadaki, N. Rahimikashkooli, F. Z. Keshtkar, M. Malekpour, S. Hashemi, Y. G. Hernandez-Barco, S. Soleymanjahi",
      venue: "bioRxiv, Aug 2026", doi: "10.64898/2026.08.18.745571", tags: ["Graph learning", "ncRNA & cancer"]
    },
    {
      title: "RulePep: Interpretable ESM-Guided Neural-Symbolic Peptide Classification",
      authors: "F. Midjani, R. Ghelich, F. Z. Keshtkar, M. Malekpour, H. Lee",
      venue: "bioRxiv, Jul 2026", doi: "10.64898/2026.07.03.736448", tags: ["Peptides"]
    },
    {
      title: "A Deep Hypergraph Learning Model for Predicting Antimicrobial Combination Effects Across Bacterial Targets",
      authors: "F. Midjani, A. H. Rajabi, F. Z. Keshtkar, M. Malekpour, A. Jafarizadeh, R. Alizadehsani, P. Plawiak",
      venue: "bioRxiv, Jun 2026", doi: "10.64898/2026.06.09.731104", tags: ["Graph learning", "Antimicrobials"]
    }
  ];

  const talks = [
    {
      title: "A hypergraph neural-network framework for predicting synergistic and antagonistic antimicrobial combinations: a triplet-based approach integrating antimicrobial peptides, antibiotics, and bacterial taxonomy",
      venue: "ESCMID Global 2026 · oral presentation · abstract no. 07722",
      authors: "F. Midjani, M. Malekpour, A. Khavaran, A. H. Rajabi, F. Z. Keshtkar, F. Golabi, A. Abbasi, M. Farhadi, B. Khosravi, A. Amanati",
      note: "Related preprint: 10.64898/2026.06.09.731104", link: "https://doi.org/10.64898/2026.06.09.731104"
    },
    {
      title: "A Heterogeneous Graph Transformer Network for Predicting the Microbiome-Metabolite-Cancer Interactome",
      venue: "ESMO Congress 2026, Madrid · poster · FPN 148P",
      authors: "F. Midjani, M. Malekpour, F. Z. Keshtkar, F. Golabi, K. Shahrivar, S. Soleymanjahi"
    },
    {
      title: "A systems-level omics and hallmark-based analysis of pancreatic cancer for the identification of potential multi-target drugs",
      venue: "Journal of Clinical Oncology 44(16_suppl):e16441, 2026 · meeting abstract",
      authors: "M. Malekpour, F. Golabi, M. R. Daneshmandi, F. Midjani, F. Z. Keshtkar, R. Moshfeghinia, A. Khalafinezhad, S. Soleymanjahi",
      link: "https://doi.org/10.1200/jco.2026.44.16_suppl.e16441"
    }
  ];

  const areas = {
    peptide: { t: "Peptide function prediction", d: "Pep-PU-GAN (positive-unlabeled adversarial learning), RulePep (neural-symbolic classification), and the in-preparation ACP-GenVAE." },
    amr: { t: "Antimicrobial combinations", d: "Deep hypergraph learning for combination effects across bacterial targets, also presented orally at ESCMID Global 2026." },
    ncrna: { t: "ncRNA–cancer interactions", d: "A biologically informed heterogeneous GNN for multi-task prediction of ncRNA–metastasis–cancer interactions." },
    panc: { t: "Pancreatic cancer omics", d: "Systems-level omics and hallmark-based analysis aimed at identifying potential multi-target drugs (JCO meeting abstract)." },
    micro: { t: "Microbiome–metabolite–cancer", d: "A heterogeneous graph transformer for the microbiome–metabolite–cancer interactome, shown as a poster at ESMO Congress 2026." }
  };

  const learning = {
    "Biology": ["Independent study (2019 – present) of general biology, molecular cell biology, biochemistry, and zoology, based on Campbell, Alberts, Lehninger, and Hickman."],
    "Complex systems": [
      "Introduction to Complexity · Complexity Explorer, Santa Fe Institute (M. Mitchell)",
      "Introduction to Systems Biology · U. Alon, Weizmann Institute",
      "Origins of Life · Complexity Explorer, Santa Fe Institute (S. Maurer & C. Kempes)"
    ],
    "Computational biology": [
      "Computational Neuroscience · Neuromatch Academy (2025)",
      "Computational Biology · International Cancer Genomics Congress (2024)"
    ],
    "Quantitative methods": [
      "Linear Algebra for Machine Learning · Imperial College London",
      "Calculus · University of Sydney (2024 – 2025)",
      "Python & Intro to Machine Learning · Kaggle (2026)"
    ]
  };

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const bold = a => esc(a).split(esc(ME)).join(`<b>${esc(ME)}</b>`);

  /* ---------- theme ---------- */
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  $("#theme").onclick = () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  };

  /* ---------- typed line ---------- */
  const phrases = ["computational biology", "graph & hypergraph learning", "systems biology", "peptide modeling"];
  const typed = $("#typed");
  if (reduce) typed.textContent = phrases[0];
  else {
    let p = 0, i = 0, del = false;
    (function tick() {
      const w = phrases[p];
      typed.textContent = w.slice(0, i);
      if (!del && i === w.length) { del = true; return setTimeout(tick, 1600); }
      if (del && i === 0) { del = false; p = (p + 1) % phrases.length; }
      i += del ? -1 : 1;
      setTimeout(tick, del ? 28 : 65);
    })();
  }

  /* ---------- counters ---------- */
  document.querySelectorAll("[data-count]").forEach(n => {
    const target = +n.dataset.count;
    if (reduce) return (n.textContent = target);
    let v = 0;
    const t = setInterval(() => { v++; n.textContent = v; if (v >= target) clearInterval(t); }, 220);
  });

  /* ---------- research cards ---------- */
  const detail = $("#area-detail");
  document.querySelectorAll("#areas .card").forEach(c => {
    c.onclick = () => {
      document.querySelectorAll("#areas .card").forEach(x => x.classList.remove("on"));
      c.classList.add("on");
      const a = areas[c.dataset.k];
      detail.innerHTML = `<b>${a.t}.</b> ${a.d}`;
    };
  });

  /* ---------- publications + filters ---------- */
  const allTags = ["All", ...new Set(pubs.flatMap(p => p.tags))];
  const fbox = $("#filters"), plist = $("#pubs");
  allTags.forEach((t, i) => {
    const b = el("button", i ? "" : "on", t);
    b.onclick = () => {
      fbox.querySelectorAll("button").forEach(x => x.classList.remove("on"));
      b.classList.add("on");
      plist.querySelectorAll(".pub").forEach(li => li.classList.toggle("hide", t !== "All" && !li.dataset.tags.includes(t)));
    };
    fbox.appendChild(b);
  });
  pubs.forEach(p => {
    const li = el("li", "pub");
    li.dataset.tags = p.tags.join("|");
    li.innerHTML = `<h4>${esc(p.title)}</h4><p class="auth">${bold(p.authors)}</p>
      <div class="meta"><span>${esc(p.venue)}</span><a href="https://doi.org/${p.doi}" target="_blank" rel="noopener">DOI ${p.doi} ↗</a>
      ${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>`;
    plist.appendChild(li);
  });

  /* ---------- talks ---------- */
  talks.forEach(t => {
    const d = el("div", "tl");
    d.innerHTML = `<h4>${esc(t.title)}</h4><p>${esc(t.venue)}</p><p>${bold(t.authors)}</p>` +
      (t.note ? `<p>${esc(t.note)}</p>` : "") +
      (t.link ? `<p><a href="${t.link}" target="_blank" rel="noopener">View ↗</a></p>` : "");
    $("#talklist").appendChild(d);
  });

  /* ---------- learning tabs ---------- */
  const tabs = $("#tabs"), panel = $("#tabpanel");
  Object.keys(learning).forEach((k, i) => {
    const b = el("button", "", k);
    b.setAttribute("role", "tab");
    b.onclick = () => {
      tabs.querySelectorAll("button").forEach(x => x.setAttribute("aria-selected", "false"));
      b.setAttribute("aria-selected", "true");
      panel.innerHTML = "<ul>" + learning[k].map(x => `<li>${esc(x)}</li>`).join("") + "</ul>";
    };
    tabs.appendChild(b);
    if (!i) b.click();
  });

  /* ---------- contact ---------- */
  $("#copy").onclick = async e => {
    try { await navigator.clipboard.writeText("fz.keshtkar@gmail.com"); e.target.textContent = "Copied ✓"; }
    catch (_) { e.target.textContent = "fz.keshtkar@gmail.com"; }
    setTimeout(() => (e.target.textContent = "Copy email"), 1800);
  };
  $("#yr").textContent = new Date().getFullYear();

  /* ---------- reveal + active nav ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("in")), { threshold: .08 });
  document.querySelectorAll(".reveal").forEach(s => io.observe(s));
  const links = [...document.querySelectorAll("#menu a")];
  const io2 = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  links.forEach(a => { const s = $(a.getAttribute("href")); s && io2.observe(s); });

  /* ---------- background: drifting network (graph-learning nod) ---------- */
  const cv = $("#net"), ctx = cv.getContext("2d");
  let W, H, nodes = [], mouse = { x: -999, y: -999 };
  function size() {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    const n = Math.min(70, Math.floor(W * H / 22000));
    nodes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 }));
  }
  addEventListener("resize", size);
  addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const cs = getComputedStyle(root), col = cs.getPropertyValue("--a").trim();
    ctx.fillStyle = col; ctx.strokeStyle = col;
    for (const n of nodes) {
      if (!reduce) { n.x += n.vx; n.y += n.vy; }
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      ctx.globalAlpha = .45; ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, 7); ctx.fill();
    }
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) { ctx.globalAlpha = (1 - d / 130) * .18; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    for (const n of nodes) {
      const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (d < 160) { ctx.globalAlpha = (1 - d / 160) * .5; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
    }
    if (!reduce) requestAnimationFrame(draw);
  }
  size(); draw();
  if (reduce) addEventListener("resize", draw);
})();
