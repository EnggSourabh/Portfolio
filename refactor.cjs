const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Replace imports
content = content.replace(
  /import \{ Atom, .* Code \} from "lucide-react";/,
  `import { SERVICES, PROJECTS, SOCIAL_LINKS, TECH_ICONS } from "./data";`
);

// 2. Remove SERVICES array
content = content.replace(/\/\/ ─── SERVICES \/ SKILLS SECTION ───+[\s\S]*?(?=function ServiceItem)/, '// ─── SERVICES / SKILLS SECTION ───────────────────────────────────────────────\n\n');

// 3. Remove Graphic components and PROJECTS array
content = content.replace(/\/\/ ─── PROJECTS SECTION ───+[\s\S]*?(?=\/\/ ─── TECH ICON)/, '// ─── PROJECTS SECTION ────────────────────────────────────────────────────────\n\n');

// 4. Replace TECH_ICONS inside ProjectCard
content = content.replace(/const TECH_ICONS = \{[\s\S]*?\};\s*return \(\s*<TechIcon key=\{t\} label=\{t\} icon=\{TECH_ICONS\[t\]\} \/>\s*\);/g, `return (\n              <TechIcon key={t} label={t} icon={TECH_ICONS[t]} />\n            );`);

// 5. Replace inline SOCIAL_LINKS in footer
content = content.replace(/\[\s*\{\s*label:\s*"Email"[\s\S]*?\}\s*\]\.map/g, `SOCIAL_LINKS.map`);

fs.writeFileSync('src/App.jsx', content);
console.log("Refactoring complete");
