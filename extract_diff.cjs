const fs = require('fs');
const lines = fs.readFileSync('diff_output.jsonl', 'utf16le').split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.tool_responses && obj.tool_responses.length > 0) {
      for (const res of obj.tool_responses) {
        if (res.name === 'run_command' && res.output && res.output.includes('diff --git')) {
          // Extract the diff string
          const output = res.output;
          const diffStart = output.indexOf('diff --git');
          if (diffStart !== -1) {
            const diff = output.substring(diffStart);
            fs.writeFileSync('restore.patch', diff);
            console.log('Diff extracted successfully');
            process.exit(0);
          }
        }
      }
    }
  } catch (e) {
    // ignore
  }
}
console.log('Diff not found');
